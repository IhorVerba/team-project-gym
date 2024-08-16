import { Request, Response } from 'express';
import Roles from '../types/Roles';
import {
  activateUserWithRole,
  addClientToTrainer,
  createUserWithRole,
  deleteUserWithRole,
  disableUserWithRole,
  removeClientFromTrainer,
  updateUserWithRole,
} from '../services/userService';
import { sendReportToAllUsers } from '../services/Mail/userReportService';

/**
 * @function createTrainer
 * @description Creates a new trainer user
 * @param {Request} req - The request object from the client (user and role to check permissions)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (user)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link createUserWithRole} for more information about that service
 * @private - only admin users can create trainer users
 */
export const createTrainer = async (req: Request, res: Response) => {
  try {
    const user = await createUserWithRole(req.body, Roles.TRAINER);
    res.status(200).send(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function updateTrainer
 * @description Updates an existing trainer user
 * @param {Request} req - The request object from the client (user and role to check permissions)
 * @param {Response} res - The response object sent to the client
 * @method PUT
 * @returns {Promise<void>} The response object sent to the client (updated user)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link updateUserWithRole} for more information about that service
 * @private - only admin users can update trainer users
 */
export const updateTrainer = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUserWithRole(req.body, Roles.TRAINER);
    res.status(200).send(updatedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function deleteTrainer
 * @description Deletes a trainer by id
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method DELETE
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link deleteUserWithRole} for more information about that service
 * @private - only admin users can delete trainer users
 */
export const deleteTrainer = async (req: Request, res: Response) => {
  try {
    await deleteUserWithRole(req.body, Roles.TRAINER);
    res.status(200).send(`${Roles.TRAINER} deleted`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function disableTrainer
 * @description Disables an existing trainer user
 * @param {Request} req - user id whom to disable and role of user who logged in to check permissions
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (disabled user)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link disableUserWithRole} for more information about that service
 * @private - only admin users can disable trainer users
 */
export const disableTrainer = async (req: Request, res: Response) => {
  try {
    await disableUserWithRole(req.body.data, Roles.TRAINER);
    res.status(200).send(`${Roles.TRAINER} disabled`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  }
};

export const activateTrainer = async (req: Request, res: Response) => {
  try {
    await activateUserWithRole(req.body.data, Roles.TRAINER);
    res.status(200).send(`${Roles.TRAINER} activated`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
  }
};

// Post /users/trainer/add-client
export const addClient = async (req: Request, res: Response) => {
  try {
    const trainerId = req.body.user.id;
    const clientId = req.body.clientId;
    await addClientToTrainer(clientId, trainerId);
    return res.status(200).send('Client was successfully added');
  } catch {
    return res.status(500).send('Internal server error at /addClient');
  }
};

// Post /users/trainer/remove-client
export const removeClient = async (req: Request, res: Response) => {
  try {
    const trainerId = req.body.user.id;
    const clientId = req.body.clientId;
    await removeClientFromTrainer(clientId, trainerId);
    return res.status(200).send('Client was successfully removed');
  } catch {
    return res.status(500).send('Internal server error at /removeClient');
  }
};

/**
 * @function sendMonthReports
 * @description Sends monthly reports to all users
 * @param {Request} req - The request object from the client (not used)
 * @param {Response} res - The response object sent to the client (status code)
 * @method POST
 * @returns {Promise<void>} The response object sent to the client
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link sendReportToAllUsers} for more information about that service
 * @private - only admin users can send monthly reports
 */
export const sendMonthReports = async (req: Request, res: Response) => {
  try {
    const reportData = req.body;
    await sendReportToAllUsers(reportData.selectedChart, reportData.date);
    res.status(200).send();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(500).send('Internal server error');
  }
};
