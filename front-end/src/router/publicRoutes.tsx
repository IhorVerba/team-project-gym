import { Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { VerificationPasswordPage } from '../pages/VerificationPasswordPage';
import { MonthReportPage } from '../pages/MonthReportPage';

/**
 * @constant
 * @description This constant is used to generate public routes.
 * @see {@link LoginPage} component
 * @see {@link ForgotPasswordPage} component
 * @see {@link ResetPasswordPage} component
 * @see {@link ErrorPage} component
 * @see {@link VerificationPasswordPage} component
 * @see {@link MonthReportPage} component
 * @returns publicRoutes
 */
export const publicRoutes = [
  { index: true, element: <Navigate to="/login" /> },
  { path: 'user-report', element: <MonthReportPage /> },
  { path: '/auth', element: <VerificationPasswordPage /> },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'reset-password/:token',
    element: <ResetPasswordPage />,
  },
  { path: '*', element: <ErrorPage /> },
];
