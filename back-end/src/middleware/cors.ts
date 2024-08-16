/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

/* eslint-disable @typescript-eslint/no-explicit-any */

// read allowed origins from .env variable, stored separated by ',' - 'origin1, origin2, ... originN'
const allowedOrigins = process.env.ALLOWED_ORIGINS || '';
const allowedOriginsArray = allowedOrigins
  .split(',')
  .map((item) => item.trim());

/**
 * @function corsMiddleware
 * @description Middleware to handle CORS. It sets the allowed origins and headers for the response object and handles preflight requests
 * @param {Request} req - The request object from the client
 * @param {Response} res - The response object sent to the client
 * @param {NextFunction} next - The next function to be called
 * @returns {void | Response<any, Record<string, any>>} The response object sent to the client
 */
const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<any, Record<string, any>> => {
  const { origin } = req.headers;
  if (allowedOriginsArray.includes(origin as string)) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  // set response headers for preflight request
  if (req.method === 'OPTIONS') {
    // if you want to use custom http methods add them to the second parameter separate by ','
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    // if you want to use custom headers just add them to the second parameter separate by ','
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, contentType, Content-Type, Authorization',
    );
    return res.status(200).send();
  }
  return next();
};
module.exports = corsMiddleware;
