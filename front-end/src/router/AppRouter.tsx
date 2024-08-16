import { useAuthContext } from '../context/AuthContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Center } from '@mantine/core';
import Loader from '../components/ui/Loader/Loader';
import { generateUserRoutes } from '../utils/generateUserRoutes';
import Layout from '../components/Layout/Layout';
import LoginPage from '../pages/LoginPage';
import { publicRoutes } from './publicRoutes';

/**
 * @description This component is used to generate routes for application.
 * @see {@link Loader} component
 * @see {@link generateUserRoutes} function
 * @see {@link Layout} component
 * @see {@link LoginPage} component
 * @see {@link publicRoutes} constant
 * @returns AppRouter component
 */
const AppRouter = () => {
  const { user, isUserLoading } = useAuthContext();
  const userRoutes = generateUserRoutes(user);

  return isUserLoading ? (
    <Center h="80vh">
      <Loader />
    </Center>
  ) : (
    <Routes>
      <Route path="/">
        {publicRoutes.map((route, index) =>
          user ? (
            <Route
              key={index}
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
          ) : (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
      <>
        <Route path="/" element={<Layout />}>
          {userRoutes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Route>
      </>
    </Routes>
  );
};

export default AppRouter;
