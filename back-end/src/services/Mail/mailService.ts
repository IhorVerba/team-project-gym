import nodemailer from 'nodemailer';
import {
  changePasswordTemplate,
  greetingTemplate,
  verificationTemplate,
  resetTemplate,
  monthReportTemplate,
} from '../../views/templates';

require('dotenv').config();
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const config = {
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
};

/**
 * @function deliverMail
 * @description Sends an email to the user with the given email address using the given subject and template
 * @param {string} userEmail - the email address of the user
 * @param {string} subject - the subject of the email
 * @param {string} template - the HTML template of the email
 * @returns {Promise<void>} a promise that resolves when the email is sent
 */
const deliverMail = async (
  userEmail: string,
  subject: string,
  template: string,
): Promise<void> => {
  const transporter = nodemailer.createTransport(config);

  const message = {
    from: EMAIL,
    to: userEmail,
    subject,
    html: template,
  };

  await transporter.sendMail(message);
};

/**
 * @function sendVerificationEmail
 * @description Sends a verification email to the user with the given email address
 * @param {string} userName - the name of the user
 * @param {string} userEmail - the email address of the user
 * @param {string} link - the verification link
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if an error occurs while sending the email
 * @see {@link deliverMail} for more information on sending emails using nodemailer
 */
const sendVerificationEmail = async (
  userName: string,
  userEmail: string,
  link: string,
) => {
  const subject = 'Підтвердіть свою електронну пошту';
  const template = verificationTemplate(userName, link);
  await deliverMail(userEmail, subject, template);
};

/**
 * @function sendWelcomeEmail
 * @description Sends a welcome email to the user with the given email address
 * @param {string} userName - the name of the user
 * @param {string} userEmail - the email address of the user
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if an error occurs while sending the email
 * @see {@link deliverMail} for more information on sending emails using nodemailer
 */
const sendWelcomeEmail = async (userName: string, userEmail: string) => {
  const subject = 'Вітаємо у Hard & Smart';
  const template = greetingTemplate(userName);
  await deliverMail(userEmail, subject, template);
};

/**
 * @function sendChangePasswordEmail
 * @description Sends an email to the user with the given email address to change their password
 * @param {string} userName - the name of the user
 * @param {string} userEmail - the email address of the user
 * @param {string} verificationCode - the verification code for changing the password
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if an error occurs while sending the email
 * @see {@link deliverMail} for more information on sending emails using nodemailer
 */
const sendChangePasswordEmail = async (
  userName: string,
  userEmail: string,
  verificationCode: string,
) => {
  const subject = 'Зміна вашого паролю';
  const template = changePasswordTemplate(userName, verificationCode);
  await deliverMail(userEmail, subject, template);
};

/**
 * @function sendResetEmail
 * @description Sends an email to the user with the given email address to reset their password
 * @param {string} userEmail - the email address of the user
 * @param {string} resetUrl - the reset password link
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if an error occurs while sending the email
 * @see {@link deliverMail} for more information on sending emails using nodemailer
 */
const sendResetEmail = async (userEmail: string, resetUrl: string) => {
  const subject = 'Відновлення паролю';
  const template = resetTemplate(resetUrl);
  await deliverMail(userEmail, subject, template);
};

/**
 * @function sendMonthReportEmail
 * @description Sends an email to the user with the given email address containing their month report
 * @param {string} userName - the name of the user
 * @param {string} userEmail - the email address of the user
 * @param {string} link - the link to the month report
 * @param {string} dates - the dates of the month report
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if an error occurs while sending the email
 * @see {@link deliverMail} for more information on sending emails using nodemailer
 */
const sendMonthReportEmail = async (
  userName: string,
  userEmail: string,
  link: string,
  dates?: string,
) => {
  const subject = 'Ваш місячний звіт в Hard & Smart';
  const template = monthReportTemplate(userName, link, dates);
  await deliverMail(userEmail, subject, template);
};

/**
 * @function sendCustomEmail
 * @description Sends a custom email to the users with the given email addresses
 * @param {string[]} userEmails - the email addresses of the users
 * @param {string} subject - the subject of the email
 * @param {string} template - the HTML template of the email
 * @returns {Promise<void>} a promise that resolves when the email is sent
 * @throws {Error} - if an error occurs while sending the email
 * @see {@link deliverMail} for more information on sending emails using nodemailer
 */
const sendCustomEmail = async (
  userEmails: string[],
  subject: string,
  template: string,
) => {
  userEmails.forEach(async (email) => {
    await deliverMail(email, subject, template);
  });
};

module.exports = {
  deliverMail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendChangePasswordEmail,
  sendResetEmail,
  sendMonthReportEmail,
  sendCustomEmail,
};
