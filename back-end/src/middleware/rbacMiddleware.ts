import { Request, Response, NextFunction } from 'express';
import { UserPermissions } from '../utils/permissions';
import Permissions from '../types/Permissions';

/**
 * @function checkPermission
 * @description Middleware that checks if the user has the required permissions
 * @param {Permissions[]} requiredPermission - The required permissions to access the route
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @param {NextFunction} next - The next function to be called
 * @returns {void} The next function to be called
 * @throws {Error} - returns 403 status code with error message if error occurs
 * @next calls the next function after checking the permissions
 * @see {@link UserPermissions} for more information about that service
 */
export const checkPermission = (requiredPermission: Permissions[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = await new UserPermissions().getPermissionsByUserId(
      req.body.user.id,
    );

    if (
      requiredPermission.some((permission) =>
        userPermissions.permissions.includes(permission),
      )
    ) {
      return next();
    } else if (
      req.body &&
      req.body.updatedUserId !== undefined &&
      req.body.user.id === req.body.updatedUserId
    ) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };
};
