import mongoose, { Schema, Document } from 'mongoose';

/**
 * @interface ChangePasswordCode
 * @description Interface for ChangePasswordCode
 * @extends Document
 * @property {boolean} codeIsUsed - The code is used
 * @property {string} verificationCode - The verification code
 * @property {Date} expiresAt - The expiration date
 * @property {Schema.Types.ObjectId} user - The user object id
 * @property {Date} createdAt - The creation date
 */
interface ChangePaswordCode extends Document {
  codeIsUsed: { type: boolean; required: boolean; default: boolean };
  verificationCode: { type: string; required: boolean };
  expiresAt: { type: Date; required: boolean };
  user: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
  createdAt: { type: Date; required: boolean; default: Date };
}

/**
 * @constant ChangePasswordCodeSchema
 * @description Schema for ChangePasswordCode
 * @type {Schema<ChangePaswordCode>}
 * @property {boolean} codeIsUsed - The code is used (default: false)
 * @property {string} verificationCode - The verification code
 * @property {Date} expiresAt - The expiration date
 * @property {Schema.Types.ObjectId} user - The user object id
 * @property {Date} createdAt - The creation date
 * @see {@link ChangePaswordCode} for more information about that interface
 */
const ChangePasswordCodeSchema = new Schema<ChangePaswordCode>(
  {
    codeIsUsed: { type: Boolean, required: true, default: false },
    verificationCode: { type: String, required: true },
    expiresAt: Date,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const ChangePasswordCodeModel = mongoose.model(
  'ChangePasswordCode',
  ChangePasswordCodeSchema,
);
