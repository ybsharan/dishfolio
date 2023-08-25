import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
// import Body from './components/Body';
import Footer from './components/Footer';
import Error from './components/Error';
import Help from './components/Help';
import Restaurant from './components/Restaurant';
import RestaurantMenu from './components/RestaurantMenu';
import Login from './components/Login';
import Signup from './components/Signup';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/restaurant',
        element: <Restaurant />,
      },
      {
        path: '/restaurant/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/help',
        element: <Help />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
