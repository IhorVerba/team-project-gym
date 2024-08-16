import { Schema } from 'mongoose';
const mongoose = require('mongoose');

/**
 * @interface ForgotResetToken
 * @description Interface for ForgotResetToken
 * @property {string} passwordResetToken - The password reset token
 * @property {Date} expiresAt - The expiration date
 * @property {boolean} isUsed - The token is used
 */
export interface ForgotResetToken {
  passwordResetToken: { type: string; required: boolean };
  expiresAt: { type: Date; required: boolean };
  isUsed?: { type: boolean; required: boolean };
}

/**
 * @constant forgotResetTokenSchema
 * @description Schema for ForgotResetToken
 * @type {Schema<ForgotResetToken>}
 * @property {string} passwordResetToken - The password reset token
 * @property {Date} expiresAt - The expiration date
 * @property {boolean} isUsed - The token is used (default: false)
 * @see {@link ForgotResetToken} for more information about that interface
 */
const forgotResetTokenSchema = new Schema<ForgotResetToken>(
  {
    passwordResetToken: String,
    expiresAt: Date,
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ForgotResetToken', forgotResetTokenSchema);
export default mongoose.model('ForgotResetToken', forgotResetTokenSchema);
