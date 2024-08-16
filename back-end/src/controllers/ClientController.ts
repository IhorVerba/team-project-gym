import { Request, Response } from 'express';
import Roles from '../types/Roles';
import {
  activateUserWithRole,
  addClientToTrainer,
  createUserWithRole,
  deleteUserWithRole,
  disableUserWithRole,
  updateUserWithRole,
} from '../services/userService';
import User from '../types/UserInterface';
const userService = require('../services/userService');

/**
 * @function getAllClients
 * @description Gets all clients
 * @param {Request} req - The request object from the client
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (clients)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getAllClients} for more information about that service
 */
exports.getAllClients = async (_: Request, res: Response) => {
  try {
    const clients: User[] = await userService.getAllClients();
    res.status(200).send(clients);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function getClient
 * @description Gets a client by id
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (client)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getClient} for more information about that service
 */
export const createClient = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.body.user.id;
    req.body.trainerIds = [currentUserId];

    const user = await createUserWithRole(req.body, Roles.CLIENT);
    await addClientToTrainer(user._id, currentUserId);
    res.status(200).send(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function updateClient
 * @description Updates an existing client user by id with new data
 * @param {Request} req - The request object from the client (user id and new data)
 * @param {Response} res - The response object sent to the client
 * @method PUT
 * @returns {Promise<void>} The response object sent to the client (updated user)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link updateUserWithRole} for more information about that service
 */
export const updateClient = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUserWithRole(req.body, Roles.CLIENT);
    res.status(200).send(updatedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function deleteClient
 * @description Deletes a client by id
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method DELETE
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link deleteUserWithRole} for more information about that service
 */
export const deleteClient = async (req: Request, res: Response) => {
  try {
    await deleteUserWithRole(req.body, Roles.CLIENT);
    res.status(200).send(`${Roles.CLIENT} deleted`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function disableClient
 * @description Disables a client by id
 * @param {Request} req - The request object from the client (user id and role)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link disableUserWithRole} for more information about that service
 */
export const disableClient = async (req: Request, res: Response) => {
  try {
    await disableUserWithRole(req.body.data, Roles.CLIENT);
    res.status(200).send(`${Roles.CLIENT} disabled`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
  }
};

export const activateClient = async (req: Request, res: Response) => {
  try {
    await activateUserWithRole(req.body.data, Roles.CLIENT);
    res.status(200).send(`${Roles.CLIENT} activated`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  }
};
