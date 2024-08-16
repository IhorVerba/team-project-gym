import { Request, Response } from 'express';
import {
  getAllUsers,
  getDisabledUsers as getDisabled,
  getAllClientsMainInfo,
  getUserById,
  getDisabledClients,
} from '../services/userService';
import User from '../types/UserInterface';

/**
 * @function getAllUsers
 * @description Gets all users
 * @param {Request} req - The request object from the client
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (users)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getAllUsers} for more information about that service
 */
exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.body.user.id;
    const allUsers = await getAllUsers();
    const activeUsersWithoutCurrent = allUsers.filter(
      (user: User) => user._id?.toString() !== currentUserId,
    );
    res.status(200).send(activeUsersWithoutCurrent);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function getDisabledUsers
 * @description Gets all disabled users
 * @param {Request} req - The request object from the client
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (disabled users)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getDisabledUsers} for more information about that service
 */
export const getDisabledUsers = async (_: Request, res: Response) => {
  try {
    const disabledUsers = await getDisabled();
    res.status(200).send(disabledUsers);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const getDisabledClientsInfo = async (_: Request, res: Response) => {
  try {
    const disabledUsers = await getDisabledClients();
    res.status(200).send(disabledUsers);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function getClientsMainInfo
 * @description Gets all clients main info
 * @param {Request} req - The request object from the client
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (clients)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getClientsMainInfo} for more information about that service
 */
export const getClientsMainInfo = async (_: Request, res: Response) => {
  try {
    const users = await getAllClientsMainInfo();
    res.status(200).send(users);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function getUserById
 * @description Gets a user by id
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (user)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getUserById} for more information about that service
 */
exports.getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).send(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
