import { Navigate } from 'react-router-dom';
import UserDetailPage from '../pages/UserDetailPage';
import TrainerPage from '../pages/TrainerPage/TrainerPage';
import ProfilePage from '../pages/ProfilePage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ExercisePage from '../pages/ExercisePage';
import { TrainingPage } from '../pages/TrainingPage';
import { ExerciseDetailsPage } from '../pages/ExerciseDetailsPage/ExerciseDetailsPage';
import { generateChildrenRoutes } from '../utils/generateChildrenRoutes';
import { TrainingCreationPage } from '../pages/TrainingCreationPage/TrainingCreationPage';
import { TrainingDetailsPage } from '../pages/TrainingDetailsPage';
import { FilterProvider } from '../context/FilterContext';
import UserReportPage from '../pages/ReportConfigurationPage/ReportConfigurationPage';

/**
 * @constant
 * @description This constant is used to generate trainer routes.
 * @see {@link UserDetailPage} component
 * @see {@link TrainerPage} component
 * @see {@link ProfilePage} component
 * @see {@link ErrorPage} component
 * @see {@link ExercisePage} component
 * @see {@link TrainingPage} component
 * @see {@link ExerciseDetailsPage} component
 * @see {@link TrainingCreationPage} component
 * @see {@link generateChildrenRoutes} function
 * @see {@link FilterProvider} component
 * @returns trainerRoutes
 */
export const trainerRoutes = [
  { index: true, element: <Navigate to="/trainings" /> },
  { path: 'me', element: <ProfilePage /> },
  {
    path: 'clients',
    children: generateChildrenRoutes([
      {
        index: true,
        element: (
          <FilterProvider>
            <TrainerPage />
          </FilterProvider>
        ),
      },
      { path: ':userId', element: <UserDetailPage /> },
    ]),
  },
  {
    path: 'trainings',
    children: generateChildrenRoutes([
      {
        index: true,
        element: (
          <FilterProvider>
            <TrainingPage />
          </FilterProvider>
        ),
      },
      { path: ':trainingId', element: <TrainingDetailsPage /> },
    ]),
  },
  { path: '*', element: <ErrorPage /> },
  {
    path: 'exercises',
    children: generateChildrenRoutes([
      { index: true, element: <ExercisePage /> },
      { path: ':id', element: <ExerciseDetailsPage /> },
    ]),
  },
  { path: '/training-creation/:trainingId', element: <TrainingCreationPage /> },
  { path: 'user-report', element: <UserReportPage /> },
];
