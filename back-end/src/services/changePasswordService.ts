const { hashPassword } = require('../utils/hashPassword');
import { ChangePasswordCodeModel } from '../models/ChangePasswordCode';
import dayjs from 'dayjs';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const { sendChangePasswordEmail } = require('./Mail/mailService');
const UserModel = require('../models/User');

/**
 * @function sendEmailWithToken
 * @description Sends an email with a token to the user with the given ID
 * @param {string} userId - the ID of the user
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if the user is not found
 * @see {@link UserModel} for more information on finding a user by ID
 * @see {@link sendChangePasswordEmail} for more information on sending an email with a token
 */
export async function sendEmailWithToken(userId: string) {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const verificationCode = crypto.randomInt(100_000, 999_999);

  await ChangePasswordCodeModel.deleteOne({ user: user._id });
  await ChangePasswordCodeModel.create({
    verificationCode,
    user: user._id,
    expiresAt: dayjs().add(30, 'minutes').toDate(),
  });

  await sendChangePasswordEmail(user.firstName, user.email, verificationCode);
}

/**
 * @function changePasswordService
 * @description Changes the password of the user with the given ID
 * @param {string} verificationCode - the verification code
 * @param {string} password - the new password
 * @param {object} user - the user object
 * @returns {Promise<void>} a promise that resolves when the password is changed
 * @throws {Error} - if the verification code is not valid or the user is not found
 * @see {@link checkVerificationCode} for more information on checking the verification code
 */
export async function changePasswordService(
  verificationCode: string,
  password: string,
  user: {
    id: string;
    email: string;
    role: string;
  },
) {
  await checkVerificationCode(verificationCode, user);

  const foundedUser = await UserModel.findById(user.id);
  if (!foundedUser) {
    throw new Error('User not found');
  }

  const isSamePassword = await bcrypt.compare(password, foundedUser.password);
  if (isSamePassword) {
    throw new Error('New password cannot be the same as the old one');
  }

  await ChangePasswordCodeModel.updateOne(
    {
      user: user.id,
      verificationCode,
      codeIsUsed: false,
    },
    { codeIsUsed: true },
  );

  await UserModel.updateOne(
    { _id: user.id },
    {
      password: await hashPassword(password),
    },
  );
}

/**
 * @function checkVerificationCode
 * @description Checks if the verification code is valid
 * @param {string} verificationCode - the verification code
 * @param {object} user - the user object
 * @returns {Promise<void>} a promise that resolves when the verification code is checked
 * @throws {Error} - if the verification code is not valid
 * @see {@link ChangePasswordCodeModel} for more information on checking the verification code
 */
export async function checkVerificationCode(
  verificationCode: string,
  user: {
    id: string;
    email: string;
    role: string;
  },
) {
  const isCodeValid = await ChangePasswordCodeModel.findOne({
    verificationCode,
    expiresAt: { $gt: dayjs().toDate() },
    codeIsUsed: false,
    user: user.id,
  })
    .sort({ createdAt: -1 })
    .exec();
  if (!isCodeValid) {
    throw new Error('Code is not valid');
  }
}
