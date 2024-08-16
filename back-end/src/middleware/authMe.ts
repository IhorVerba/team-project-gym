const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

/**
 * @function authMe
 * @description Middleware that checks if the user is authenticated
 * @param {Request} req - The request object from the client (access token)
 * @param {Response} res - The response object sent to the client (user info)
 * @param {NextFunction} next - The next function to be called
 * @returns {void} The next function to be called
 * @throws {Error} - returns 401 status code with error message if error occurs
 */
module.exports = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.body.user = decoded.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Internal server error at authMe middleware' });
  }
};
