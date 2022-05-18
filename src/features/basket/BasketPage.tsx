import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/utils/currencyFormat';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';
import BasketSummary from './BasketSummary';

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket)
    return <Typography variant='h3'>Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Subtotal</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align='center'>
                  <LoadingButton
                    loading={
                      status ===
                      'pendingRemoveItem' + item.productId + '_reduce'
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: '_reduce',
                        })
                      )
                    }
                    color='error'
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === 'pendingAddItem' + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                    color='secondary'
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(item.quantity * item.price)}
                </TableCell>
                <TableCell align='right'>
                  <LoadingButton
                    loading={
                      status ===
                      'pendingDeleteItem' + item.productId + '_delete'
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: '_delete',
                        })
                      )
                    }
                    color='error'
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button href='/checkout' variant='contained' size='large' fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
