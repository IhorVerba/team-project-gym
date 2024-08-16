import UserStatus from '../types/UserStatus';
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const VerificationModel = require('../models/VerificationUser');
const { hashPassword } = require('../utils/hashPassword');

/**
 * @function setPassword
 * @description Set password for user after verification token is verified
 * @param {Object} data - Object containing verificationToken and password
 * @returns {Object} - Object containing success and message
 * @throws {Error} - If token is invalid or already used
 * @see {@link VerificationModel} - For VerificationModel
 * @see {@link hashPassword} - For hashing password
 * @see {@link UserStatus} - For UserModel
 */
const setPassword = async (data: {
  verificationToken: string;
  password: string;
}) => {
  const { verificationToken, password } = data;
  const decoded = jwt.verify(
    verificationToken,
    process.env.ACCESS_TOKEN_SECRET,
  );
  if (!decoded) {
    return { success: false, message: 'Invalid token' };
  }
  const verificationUser = await VerificationModel.findOne({
    verificationToken,
  });
  if (verificationUser.tokenIsUsed) {
    return { success: false, message: 'Already verified' };
  }
  await VerificationModel.findOneAndUpdate(
    {
      verificationToken,
    },
    {
      tokenIsUsed: true,
    },
  );
  const userToVerify = await UserModel.findOne({
    verification: verificationUser._id,
  }).exec();
  await UserModel.updateOne(
    { _id: userToVerify._id },
    {
      password: await hashPassword(password),
      userStatus: UserStatus.Active,
    },
  );
  return;
};

/**
 * @function checkToken
 * @description Check if verification token is valid
 * @param {string} verificationToken - Verification token
 * @returns {Object} - Object containing user data
 * @throws {Error} - If token is expired or already verified
 * @see {@link VerificationModel} - For VerificationModel
 */
const checkToken = async (verificationToken: string) => {
  const decoded = jwt.verify(
    verificationToken,
    process.env.ACCESS_TOKEN_SECRET,
  );
  if (!decoded) {
    throw new Error('Token is expired');
  }
  const verificationUser = await VerificationModel.findOne({
    verificationToken: verificationToken,
  });
  if (verificationUser.tokenIsUsed === true) {
    throw new Error('Already verified');
  }
  return decoded.data;
};
module.exports = { setPassword, checkToken };
