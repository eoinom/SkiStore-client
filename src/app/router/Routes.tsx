import { Navigate, createBrowserRouter } from 'react-router-dom';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import App from '../layout/App';
import Register from '../../features/account/Register';
import BasketPage from '../../features/basket/BasketPage';
import CheckoutWrapper from '../../features/checkout/CheckoutWrapper';
import Orders from '../../features/orders/Orders';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import RequireAuth from './RequireAuth';
import Login from '../../features/account/Login';
import Inventory from '../../features/admin/Inventory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // authenticated routes
      {
        element: <RequireAuth />,
        children: [
          { path: 'checkout', element: <CheckoutWrapper /> },
          { path: 'orders', element: <Orders /> },
        ],
      },
      // admin routes
      {
        element: <RequireAuth roles={['Admin']} />,
        children: [{ path: 'inventory', element: <Inventory /> }],
      },
      { path: 'catalog', element: <Catalog /> },
      { path: 'catalog/:id', element: <ProductDetails /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'basket', element: <BasketPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='not-found' /> },
    ],
  },
]);
