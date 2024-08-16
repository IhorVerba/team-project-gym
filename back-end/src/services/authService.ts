import crypto from 'crypto';
import ForgotResetToken from '../models/ForgotResetToken';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const jwt = require('jsonwebtoken');
const { sendResetEmail } = require('../services/Mail/mailService');
const User = require('../models/User');

dotenv.config();

/**
 * @function createToken
 * @description Creates a token with the given payload, secret, and expiration time
 * @param {object} payload - the payload to include in the token
 * @param {string} tokenSecret - the secret to use for the token
 * @param {string} expiresIn - the expiration time for the token
 * @returns {string} the created token
 */
export const createToken = (
  payload: object,
  tokenSecret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, tokenSecret, { expiresIn });
  return token;
};

/**
 * @function forgotPassword
 * @description Sends a reset password email to the user with the given email address
 * @param {string} email - the email of the user
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if the email is not provided or the user is not found
 * @see {@link User} for more information on User model
 */
export const forgotPassword = async (email: string) => {
  if (!email) {
    throw new Error('Please provide email');
  }
  const user = await User.findOne({ email }).lean().exec();
  if (!user) {
    throw new Error('User with such email not found');
  }
  const token = crypto.randomBytes(32).toString('hex');
  const forgotResetToken = new ForgotResetToken({
    passwordResetToken: crypto.createHash('sha256').update(token).digest('hex'),
    isUsed: false,
  });

  forgotResetToken.expiresAt = dayjs().add(30, 'minutes').toDate();
  await forgotResetToken.save();

  await User.updateOne(
    { email },
    { forgotResetPassword: forgotResetToken._id },
  ).exec();

  const resetToken = forgotResetToken.passwordResetToken;
  const resetUrl = `${process.env.REACT_APP_URL}/reset-password/${resetToken}`;

  await sendResetEmail(email, resetUrl);
};

/**
 * @function checkResetToken
 * @description Checks if the reset token is valid
 * @param {string} resetToken - the reset token to check
 * @returns {Promise<void>} a promise that resolves when the token is checked
 * @throws {Error} - if the reset token is not provided or is invalid
 * @see {@link ForgotResetToken} for more information on ForgotResetToken model
 */
export const checkResetToken = async (resetToken: string) => {
  if (!resetToken) {
    throw new Error('Please provide reset token');
  }

  const isTokenValid = await ForgotResetToken.findOne({
    passwordResetToken: resetToken,
    expiresAt: { $gt: dayjs().toDate() },
    isUsed: false,
  }).exec();

  if (!isTokenValid) {
    throw new Error('Reset token not found or expired');
  }
};

/**
 * @function resetPassword
 * @description Resets the password for the user with the given reset token
 * @param {string} password - the new password
 * @param {string} resetToken - the reset token
 * @returns {Promise<void>} a promise that resolves when the password is reset
 * @throws {Error} - if the password or reset token is not provided, the reset token is invalid, the user is not found, or the new password is the same as the old one
 * @see {@link ForgotResetToken} for more information on ForgotResetToken model
 * @see {@link User} for more information on User model
 */
export const resetPassword = async (password: string, resetToken: string) => {
  if (!resetToken || !password) {
    throw new Error('Please provide reset token and password');
  }

  const forgotPasswordToken = await ForgotResetToken.findOne({
    passwordResetToken: resetToken,
    expiresAt: { $gt: dayjs().toDate() },
    isUsed: false,
  }).exec();
  if (!forgotPasswordToken) {
    throw new Error('Reset token not found or expired');
  }

  const user = await User.findOne({
    forgotResetPassword: forgotPasswordToken._id,
  }).exec();
  if (!user) {
    throw new Error('User not found');
  }

  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    throw new Error('New password cannot be the same as the old one');
  }

  user.password = password;
  await user.save();
  forgotPasswordToken.isUsed = true;
  await forgotPasswordToken.save();
};

/**
 * @function login
 * @description Logs in the user with the given email and password. Checks if password and email is correct. Returns access and refresh tokens if the user is found and the password is correct
 * @param {string} email - the email of the user
 * @param {string} password - the password of the user
 * @returns {Promise<void>} a promise that resolves when the user is logged in
 * @throws {Error} - if the email or password is not provided, the user is not found, the user is not verified, or the password is incorrect
 * @see {@link User} for more information on User model
 */
export const login = async (email?: string, password?: string) => {
  if (!email || !password) {
    throw new Error('Email and password was not provided');
  }
  const foundUser = await User.findOne({ email }).lean().exec();
  if (!foundUser) {
    throw new Error('Invalid email or password');
  }
  if (!foundUser.password) {
    throw new Error(
      'User is not verified. Please verify your email to proceed',
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid email or password');
  }

  const payload = {
    user: {
      id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    },
  };

  const accessToken = createToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    '30m',
  );
  const refreshToken = createToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    '7d',
  );

  await User.findByIdAndUpdate(foundUser._id, { refreshToken });

  return { accessToken, refreshToken };
};

/**
 * @function me
 * @description Return user information by user id given from access token payload
 * @param {string} userId - the id of the user
 * @returns {Promise<void>} a promise that resolves when the user is found
 * @throws {Error} - if the email or password is not provided or the user already exists
 * @see {@link User} for more information on User model
 */
export const me = async (userId: string) => {
  if (!userId) {
    throw new Error('User id was not provided');
  }
  const user = await User.findById(userId)
    .select('-password -refreshToken -__v')
    .lean()
    .exec();

  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

/**
 * @function refreshToken
 * @description Refreshes the access token with the given refresh token
 * @param {string} refreshToken - the refresh token
 * @returns {Promise<string>} a promise that resolves with the new access token
 * @throws {Error} - if the refresh token is not provided, the refresh token is invalid, or the user is already logged in from another device
 */
export const refreshToken = async (refreshToken?: string) => {
  if (!refreshToken) {
    throw new Error('No refresh token provided');
  }
  // Verify refresh token for validity
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
  );
  if (!decoded) {
    throw new Error('Invalid refresh token');
  }
  // check if refresh token in db
  const user = await User.findById(decoded.user.id);
  if (user.refreshToken !== refreshToken) {
    throw new Error('You are already logged in from another device');
  }
  // Create new access token with the same payload
  const payload = {
    user: {
      id: decoded.user.id,
      email: decoded.user.email,
      role: decoded.user.role,
    },
  };
  const accessToken = createToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    '30m',
  );
  return accessToken;
};
