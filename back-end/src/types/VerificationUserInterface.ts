/**
 * @interface VerificationUser
 * @description Interface for VerificationUser
 * @property {boolean} tokenIsUsed - The token is used
 * @property {string} verificationToken - The verification token
 */
interface VerificationUser {
  tokenIsUsed: boolean;
  verificationToken: string;
}
export default VerificationUser;
