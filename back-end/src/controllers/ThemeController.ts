/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getColorsService, setColorsService } from '../services/themeService';
dotenv.config();

/**
 * @function getColors
 * @description Gets theme colors
 * @param {Request} _req - The request object from the client (not used)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (colors)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getColorsService} for more information about that service
 * @public can be accessed by anyone mainly for the front-end to get the colors
 */
export const getColors = async (_req: Request, res: Response) => {
  try {
    const colors = await getColorsService();
    res.status(200).json(colors);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * @function setColors
 * @description Sets theme colors
 * @param {Request} req - The request object from the client (colors)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (message)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link setColorsService} for more information about that service
 * @private need to be admin to access this endpoint
 */
export const setColors = async (req: Request, res: Response) => {
  try {
    await setColorsService(req.body.colors);
    res.status(200).json({ message: 'Colors updated successfully' });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
