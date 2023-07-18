import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import { User } from '../../app/models/user';
import { setBasket } from '../basket/basketSlice';
import { router } from '../../app/router/Routes';

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

function decodeUserRolesFromJwt(token: string) {
  let claims = JSON.parse(atob(token.split('.')[1]));
  let roles =
    claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return typeof roles === 'string' ? [roles] : roles;
}

export const signInUser = createAsyncThunk<User, FieldValues>(
  'account/signInUser',
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      let roles = decodeUserRolesFromJwt(user.token);
      const newUser = { ...user, roles };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      let roles = decodeUserRolesFromJwt(user.token);
      const newUser = { ...user, roles };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      router.navigate('/');
    },
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Session expired - please login again');
      router.navigate('/');
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = { ...action.payload };
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      throw action.payload;
    });
  },
});

export const { signOut, setUser } = accountSlice.actions;
