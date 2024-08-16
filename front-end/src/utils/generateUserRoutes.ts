import { User } from '../types/User';
import UserRole from '../types/UserRole';
import { adminRoutes } from '../router/adminRoutes';
import { publicRoutes } from '../router/publicRoutes';
import { trainerRoutes } from '../router/trainerRoutes';

/**
 * @function generateUserRoutes - Generate routes based on the user's role
 * @param {User} user - User object containing the user's role
 * @returns {Array<object>} Array of routes
 */
export const generateUserRoutes = (user: User | null) => {
  switch (user?.role) {
    case UserRole.Admin:
      return adminRoutes;

    case UserRole.Trainer:
      return trainerRoutes;

    default:
      return publicRoutes;
  }
};
