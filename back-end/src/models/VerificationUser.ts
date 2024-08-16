import VerificationUser from '../types/VerificationUserInterface';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @constant verificationUserSchema
 * @description Schema for VerificationUser
 * @type {Schema<VerificationUser>}
 * @property {boolean} tokenIsUsed - The token is used
 * @property {string} verificationToken - The verification token
 * @see {@link VerificationUser} for more information about that interface
 */
const verificationUserSchema: VerificationUser = new Schema({
  tokenIsUsed: Boolean,
  verificationToken: String,
});

module.exports = mongoose.model('VerificationUser', verificationUserSchema);
