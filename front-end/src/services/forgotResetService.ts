import axiosService from './axiosService';

/**
 * @function sendEmail - This service is used to send an email.
 * @async
 * @param {string} email - The email to send.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the send email request.
 */
export const sendEmail = async (email: string) => {
  const res = await axiosService.post('/auth/forgot-password', { email });
  return res.data;
};

/**
 * @function checkResetToken - This service is used to check the reset token.
 * @async
 * @param {string} token - The token to check.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the check reset token request.
 */
export const checkResetToken = async (token: string | undefined) => {
  const res = await axiosService.get(`/auth/reset-password/${token}`);
  return res.data;
};

/**
 * @function sendPassword - This service is used to send a password.
 * @async
 * @param {string} password - The password to send.
 * @param {string} token - The token to send.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the send password request.
 */
export const sendPassword = async (
  password: string,
  token: string | undefined,
) => {
  const res = await axiosService.post(`/auth/reset-password/${token}`, {
    password,
  });
  return res.data;
};
