import {
  ShoppingCart,
  WbIncandescent,
  WbIncandescentOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  width: 'max-content',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: 'text.secondary' },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item xs={3}>
            <Typography
              variant='h6'
              component={NavLink}
              to='/'
              exact
              sx={navStyles}
            >
              SKI-STORE
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <List sx={{ display: 'flex', justifyContent: 'center' }}>
              {midLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={3}>
            <Box display='flex' alignItems='center' justifyContent='end'>
              <IconButton
                size='large'
                sx={{ color: 'inherit' }}
                onClick={handleThemeChange}
              >
                {darkMode ? <WbIncandescentOutlined /> : <WbIncandescent />}
              </IconButton>
              <IconButton
                component={Link}
                to='/basket'
                size='large'
                sx={{ color: 'inherit' }}
              >
                <Badge badgeContent={itemCount} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <List sx={{ display: 'flex' }}>
                {rightLinks.map(({ title, path }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
