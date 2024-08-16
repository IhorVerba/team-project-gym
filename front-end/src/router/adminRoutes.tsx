import { Navigate } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import { generateChildrenRoutes } from '../utils/generateChildrenRoutes';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProfilePage from '../pages/ProfilePage';
import CompanyPage from '../pages/CompanyPage/CompanyPage';
import MailConstructorPage from '../pages/MailConstructorPage';
import UserDetailPage from '../pages/UserDetailPage';
import { FilterProvider } from '../context/FilterContext';

/**
 * @constant
 * @description This file is used to generate admin routes.
 * @see {@link AdminPage} component
 * @see {@link ErrorPage} component
 * @see {@link ProfilePage} component
 * @see {@link CompanyPage} component
 * @see {@link MailConstructorPage} component
 * @see {@link UserReportPage} component
 * @see {@link UserDetailPage} component
 * @see {@link FilterProvider} component
 * @returns adminRoutes
 */
export const adminRoutes = [
  { index: true, element: <Navigate to="admin" /> },
  {
    path: 'admin',
    children: generateChildrenRoutes([
      { index: true, element: <Navigate to="/admin/users" /> },
      { path: 'me', element: <ProfilePage /> },
      {
        path: 'users',
        children: generateChildrenRoutes([
          {
            index: true,
            element: (
              <FilterProvider>
                <AdminPage />
              </FilterProvider>
            ),
          },
          { path: ':userId', element: <UserDetailPage /> },
        ]),
      },
      { path: 'company', element: <CompanyPage /> },
      { path: 'mail-constructor', element: <MailConstructorPage /> },
    ]),
  },
  { path: '*', element: <ErrorPage /> },
];
