import {
  getDecryptedUserId,
  sendReportToUser,
  getCharts,
} from '../services/Mail/userReportService';
import { Request, Response } from 'express';
import { getUserById } from '../services/userService';

/**
 * @function getUserIdFromLink
 * @description Gets a user by id from a link
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (user)
 * @throws {Error} - returns 404 status code with error message if error occurs
 * @see {@link getDecryptedUserId} for more information about that service
 */
export const getUserIdFromLink = async (req: Request, res: Response) => {
  try {
    const userId = await getDecryptedUserId(req.params.id);

    const user = await getUserById(userId);

    res.status(200).send(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      return res.status(404).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function sendReportToClient
 * @description Sends a report to a client by email with selected charts and date
 * @param {Request} req - The request object from the client (email, selectedCharts, date)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 404 status code with error message if error occurs
 * @see {@link sendReportToUser} for more information about that service
 */
export const sendReportToClient = async (req: Request, res: Response) => {
  try {
    const { email, selectedCharts, date } = req.body;
    await sendReportToUser(email, selectedCharts, date);
    res.status(200).send('Report sent');
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(404).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function getSelectedCharts
 * @description Gets selected charts to form a report
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (charts)
 * @throws {Error} - returns 404 status code with error message if error occurs
 * @see {@link getCharts} for more information about that service
 */
export const getSelectedCharts = async (req: Request, res: Response) => {
  try {
    const charts = await getCharts(req.params.id);
    res.status(200).send(charts);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(404).send(err.message);
    }
  }
};
