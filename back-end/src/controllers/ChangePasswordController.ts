import { Request, Response } from 'express';
import {
  sendEmailWithToken,
  checkVerificationCode,
  changePasswordService,
} from '../services/changePasswordService';

/**
 * @function getChangePasswordMail
 * @description Sends an email with a verification code
 * @param {Request} req - The request object from the client (user)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link sendEmailWithToken} for more information about that service
 */
export const getChangePasswordMail = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    await sendEmailWithToken(userId);
    return res.sendStatus(200);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    return res
      .status(500)
      .send('Internal server error at changePassword/getChangePasswordMail');
  }
};

/**
 * @function verifyCode
 * @description Verifies the code sent in the email
 * @param {Request} req - The request object from the client (verification code and user)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link checkVerificationCode} for more information about that service
 */
export const verifyCode = async (req: Request, res: Response) => {
  try {
    const code = req.body.verificationCode;
    const user = req.body.user;
    if (!code) {
      return res.status(400).send('code was not provided');
    }
    await checkVerificationCode(code, user);
    return res.sendStatus(200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(500)
      .send('Internal server error at changePassword/verifyCode');
  }
};

/**
 * @function changePassword
 * @description Changes the password of a user
 * @param {Request} req - The request object from the client (verification code, password and user)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link changePasswordService} for more information about that service
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { verificationCode, password } = req.body;
    const user = req.body.user;
    if (!verificationCode || !password) {
      return res.status(400).send('code or password was not provided');
    }
    await changePasswordService(verificationCode, password, user);
    return res.sendStatus(200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: 'Internal server error at /changePassword' });
  }
};
