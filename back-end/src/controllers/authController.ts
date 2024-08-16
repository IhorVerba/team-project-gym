import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as authService from '../services/authService';
const verificationService = require('../services/verificationService');
dotenv.config();

/**
 * @function login
 * @description Logs in a user
 * @param {Request} req - The request object from the client (email and password)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (accessToken and refreshToken)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link login} for more information about that service
 */
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login(
      email,
      password,
    );
    return res.status(200).json({ accessToken, refreshToken });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    return res.status(500).json({ message: 'Internal server error at /login' });
  }
};

/**
 * @function me
 * @description Gets user information
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (user)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link me} for more information about that service
 */
const me = async (req: Request, res: Response) => {
  try {
    const user = await authService.me(req.body.user.id);
    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error at /me' });
  }
};

/**
 * @function setPassword
 * @description Sets a new password
 * @param {Request} req - The request object from the client (new password and verification token)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (data)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link setPassword} for more information about that service
 */
const setPassword = async (req: Request, res: Response) => {
  try {
    const data = await verificationService.setPassword(req.body);
    return res.status(200).send({ data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: 'Internal server error at /setPassword' });
    }
  }
};

/**
 * @function checkToken
 * @description Checks if a verification token is valid
 * @param {Request} req - The request object from the client (verification token)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (email)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link checkToken} for more information about that service
 */
const checkToken = async (req: Request, res: Response) => {
  try {
    const email = await verificationService.checkToken(
      req.body.verificationToken,
    );
    return res.status(200).send({ email });
  } catch (error: unknown) {
    res.status(500).json({ message: 'Internal server error at /checkToken' });
  }
};

/**
 * @function refreshToken
 * @description Refreshes the token so user can stay logged in
 * @param {Request} req - The request object from the client (refresh token)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (access token)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link refreshToken} for more information about that service
 */
const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshToken(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res
      .status(500)
      .json({ message: 'Internal server error at /refreshToken' });
  }
};

/**
 * @function forgotPassword
 * @description Handles the forgot password functionality. Sends a password reset email to the provided email address.
 * @param {Request} req - The request object (email).
 * @param {Response} res - The response object.
 * @method POST
 * @returns A JSON response indicating the status of the operation.
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link forgotPassword} for more information about that serviceS
 */
const forgotPassword = async (req: Request, res: Response) => {
  try {
    await authService.forgotPassword(req.body.email);
    return res.status(200).json({
      message: 'Message sent to email',
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

/**
 * @function checkResetToken
 * @description Checks if a reset token is valid
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @method GET
 * @returns A JSON response indicating the status of the operation.
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link checkResetToken} for more information about that service
 */
const checkResetToken = async (req: Request, res: Response) => {
  try {
    await authService.checkResetToken(req.params.resetToken);
    return res.status(200).json({
      message: 'Reset token is valid',
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

/**
 * @function resetPassword
 * @description Resets the password for a user with a valid reset token
 * @param {Request} req - The request object (password from body and reset token from query).
 * @param {Response} res - The response object.
 * @method POST
 * @returns A JSON response indicating the status of the operation.
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link resetPassword} for more information about that service
 */
const resetPassword = async (req: Request, res: Response) => {
  try {
    await authService.resetPassword(req.body.password, req.params.resetToken);
    return res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

module.exports = {
  login,
  me,
  setPassword,
  checkToken,
  refreshToken,
  forgotPassword,
  checkResetToken,
  resetPassword,
};
