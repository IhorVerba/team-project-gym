import { Request, Response } from 'express';
import Roles from '../types/Roles';
import {
  activateUserWithRole,
  createUserWithRole,
  deleteUserWithRole,
  disableUserWithRole,
  updateUserWithRole,
} from '../services/userService';

/**
 * @function createAdmin
 * @description Creates a new admin user
 * @param {Request} req - The request object from the client (user and role to check permissions)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (user)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link createUserWithRole} for more information about that service
 * @private - only admin users can create admin users
 */
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const user = await createUserWithRole(req.body, Roles.ADMIN);
    res.status(200).send(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function updateAdmin
 * @description Updates an existing admin user
 * @param {Request} req - The request object from the client (user and role to check permissions)
 * @param {Response} res - The response object sent to the client
 * @method PUT
 * @returns {Promise<void>} The response object sent to the client (updated user)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link updateUserWithRole} for more information about that service
 * @private - only admin users can update admin users
 */
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUserWithRole(req.body, Roles.ADMIN);
    res.status(200).send(updatedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function disableAdmin
 * @description Disables an existing admin user
 * @param {Request} req - user id whom to disable and role of user who logged in to check permissions
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (disabled user)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link disableUserWithRole} for more information about that service
 * @private - only admin users can disable admin users
 */
export const disableAdmin = async (req: Request, res: Response) => {
  try {
    const disabledUser = await disableUserWithRole(req.body.data, Roles.ADMIN);
    res.status(200).send(disabledUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
  }
};

export const activateAdmin = async (req: Request, res: Response) => {
  try {
    await activateUserWithRole(req.body.data, Roles.ADMIN);
    res.status(200).send(`${Roles.ADMIN} activated`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
  }
};

/**
 * @function deleteAdmin
 * @description Deletes an existing admin user
 * @param {Request} req - user id whom to delete and role of user who logged in to check permissions
 * @param {Response} res - The response object sent to the client
 * @method DELETE
 * @returns {Promise<void>} The response object sent to the client (that admin)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link deleteUserWithRole} for more information about that service
 * @private - only admin users can delete admin users
 */
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    await deleteUserWithRole(req.body, Roles.ADMIN);
    res.status(200).send(`${Roles.ADMIN} deleted`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};
