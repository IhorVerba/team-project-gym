import { Schema, Document } from 'mongoose';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
import UserStatus from '../types/UserStatus';

/**
 * @interface UserInterface
 * @description Interface for User
 * @extends Document
 * @property {string} email - The email of the user
 * @property {string} firstName - The first name of the user
 * @property {string} lastName - The last name of the user
 * @property {string} password - The password of the user
 * @property {string} role - The role of the user
 * @property {string} refreshToken - The refresh token of the user
 * @property {string} photoUrl - The photo url of the user
 * @property {string} phoneNumber - The phone number of the user
 * @property {Array<Schema.Types.ObjectId>} userIds - The user object ids
 * @property {Array<Schema.Types.ObjectId>} trainerIds - The trainer object ids
 * @property {Schema.Types.ObjectId} verification - The verification object id
 * @property {Schema.Types.ObjectId} forgotResetPassword - The forgot reset password object id
 * @property {UserStatus} userStatus - The user status
 * @see {@link UserStatus} for more information about that interface
 */
interface UserInterface extends Document {
  email: { type: string; required: boolean };
  firstName: { type: string; required: boolean };
  lastName: { type: string; required: boolean };
  password: { type: string; required: boolean };
  role: { type: string; required: boolean };
  refreshToken: { type: string; required: boolean };
  photoUrl: { type: string; required: boolean };
  phoneNumber: { type: string; required: boolean };
  userIds?: { type: Schema.Types.ObjectId[]; ref: string; required: boolean };
  trainerIds?: {
    type: Schema.Types.ObjectId[];
    ref: string;
    required: boolean;
  };
  forgotResetPassword?: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
  verification?: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
  userStatus: { type: UserStatus; required: boolean };
}

/**
 * @constant userSchema
 * @description Schema for User
 * @type {Schema<UserInterface>}
 * @property {string} email - The email of the user
 * @property {string} firstName - The first name of the user
 * @property {string} lastName - The last name of the user
 * @property {string} password - The password of the user
 * @property {string} role - The role of the user
 * @property {string} refreshToken - The refresh token of the user
 * @property {string} photoUrl - The photo url of the user
 * @property {string} phoneNumber - The phone number of the user
 * @property {Array<Schema.Types.ObjectId>} userIds - The user object ids
 * @property {Array<Schema.Types.ObjectId>} trainerIds - The trainer object ids
 * @property {Schema.Types.ObjectId} verification - The verification object id
 * @property {Schema.Types.ObjectId} forgotResetPassword - The forgot reset password object id
 * @property {UserStatus} userStatus - The user status
 * @see {@link UserInterface} for more information about that interface
 */
const userSchema = new Schema<UserInterface>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
  refreshToken: { type: String, required: false },
  photoUrl: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  userIds: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: undefined,
    required: false,
  },
  trainerIds: {
    type: [Schema.Types.ObjectId],
    default: undefined,
    ref: 'User',
    required: false,
  },
  verification: {
    type: Schema.Types.ObjectId,
    ref: 'VerificationUser',
  },
  forgotResetPassword: {
    type: Schema.Types.ObjectId,
    ref: 'ForgotResetUser',
  },
  userStatus: {
    type: String,
    enum: Object.values(UserStatus),
    required: true,
  },
});

// mongoose middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
