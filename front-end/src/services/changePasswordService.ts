import axiosService from './axiosService';

/**
 * @function verifyCode - This service is used to verify the user using the verification code when changing the password.
 * @async
 * @param {string} verificationCode - The verification code.
 * @see {@link axiosService}
 * @returns {Promise<void>} The result of the verify code request.
 */
export const verifyCode = async (verificationCode: string) => {
  await axiosService.post('/change-password/verify-code', {
    verificationCode,
  });
};

/**
 * @function sendCodeToEmail - This service is used to send the verification code to the user's email when changing the password.
 * @async
 * @returns {Promise<void>} The result of the send code to email request.
 */
export const sendCodeToEmail = async () => {
  await axiosService.post('/change-password/send-mail');
};

/**
 * @function changePassword - This service is used to change the user's password. It sends the verification code and the new password.
 * @async
 * @param {string} verificationCode - The verification code.
 * @param {string} password - The new password.
 * @returns {Promise<void>} The result of the change password request.
 */
export const changePassword = async (
  verificationCode: string,
  password: string,
) => {
  await axiosService.post('change-password', {
    verificationCode,
    password,
  });
};
