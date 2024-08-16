import { decryptUserId, encryptUserId } from '../../utils/cryptoEncrypting';
import Roles from '../../types/Roles';
import TrainingsReport from '../../models/TrainingsReport';
import UserStatus from '../../types/UserStatus';
const UserModel = require('../../models/User');
const { sendMonthReportEmail } = require('./mailService');

/**
 * @function createTrainingsReport
 * @description Creates a trainings report based on the selected charts.
 * @param {string[]} selectedCharts - An array of selected chart labels
 * @return {TrainingsReport} The trainings report based on the selected charts
 */
function createTrainingsReport(selectedCharts: string[]) {
  const chartTypes = [
    { key: 'typeChart', label: 'Exercise types', value: 'types' },
    { key: 'exerciseChart', label: 'All exercises', value: 'exercises' },
    { key: 'strengthChart', label: 'Strength exercises', value: 'strength' },
    { key: 'cardioChart', label: 'Cardio exercises', value: 'cardio' },
    { key: 'crossfitChart', label: 'Crossfit exercises', value: 'crossfit' },
    // Add more types here...
  ];

  const chartsData = chartTypes.reduce(
    (acc, { key, label, value }) => {
      acc[key] = selectedCharts.includes(label) ? value : undefined;
      return acc;
    },
    {} as Record<string, string | undefined>,
  );

  return new TrainingsReport(chartsData);
}
/**
 * @function getUsersEmails
 * @description Get all users' emails
 * @returns {Promise<User[]>} a promise that resolves with an array of users' emails
 * @see {@link UserModel} for more information on getting all users' emails
 */
export const getUsersEmails = async () => {
  return await UserModel.find(
    { role: Roles.CLIENT },
    { email: 1, firstName: 1 },
  );
};
/**
 * @function sendReportToAllUsers
 * @description Sends a report to all active users with at least 3 trainings, containing the selected charts for a specific date range.
 * @param {string[]} selectedCharts - an array of selected charts to include in the report
 * @param {[Date, Date]} date - a tuple representing the start and end date for the report
 * @return {Promise<User[]>} - a promise that resolves to an array of users who received the report
 */
export const sendReportToAllUsers = async (
  selectedCharts: string[],
  date: [Date, Date],
) => {
  const convertedDates = date.map((d) => {
    if (d) {
      const dateObj = new Date(d);
      dateObj.setDate(dateObj.getDate() + 1);
      return dateObj;
    }
    return null;
  });

  const users = await UserModel.aggregate([
    {
      $match: {
        userStatus: UserStatus.Active,
        role: Roles.CLIENT,
      },
    },
    {
      $lookup: {
        from: 'trainings',
        localField: '_id',
        foreignField: 'userIds',
        as: 'trainings',
      },
    },
    {
      $unwind: '$trainings',
    },
    {
      $match: {
        'trainings.createdAt': {
          $gte: convertedDates[0],
          $lte: convertedDates[1],
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        firstName: { $first: '$firstName' },
        email: { $first: '$email' },
        trainings: { $push: '$trainings' },
      },
    },
    {
      $match: {
        trainings: { $exists: true, $not: { $size: 0 } },
        $expr: { $gte: [{ $size: '$trainings' }, 3] },
      },
    },
    {
      $project: {
        _id: 1,
        firstName: 1,
        email: 1,
        trainings: 1,
      },
    },
  ]);

  const charts = createTrainingsReport(selectedCharts);
  await charts.save();

  for (const user of users) {
    await UserModel.updateOne(
      { _id: user._id },
      { $push: { trainingsReports: charts._id } },
    ).exec();

    const encryptedUserId = await encryptUserId(user._id.toString());
    const reportLink = `${process.env.REACT_APP_URL}/user-report?token=${encryptedUserId}&date=${date}&chartsId=${charts._id}`;

    await sendMonthReportEmail(user.firstName, user.email, reportLink, date.toString());
  }
};

/**
 * @function sendReportToUser
 * @description Sends a month report to the user with the given email address
 * @param {string} email - the email address of the user
 * @param {string[]} selectedCharts - the selected charts to include in the report
 * @param {[Date, Date]} date - the date range for the report
 * @returns {Promise<void>} a promise that resolves when the report is sent
 * @throws {Error} - if the user is not found
 * @see {@link UserModel} for more information on finding a user by email
 * @see {@link TrainingsReport} for more information on creating a new report
 * @see {@link sendMonthReportEmail} for more information on sending a month report email
 */
export const sendReportToUser = async (
  email: string,
  selectedCharts: string[],
  date: [Date, Date],
) => {
  const user = await UserModel.findOne({ email }).lean().exec();
  if (!user) {
    throw new Error('User not found');
  }

  const charts = createTrainingsReport(selectedCharts);

  await charts.save();
  await UserModel.updateOne(
    { email },
    { $push: { trainingsReports: charts._id } },
  ).exec();

  const encryptedUserId = await encryptUserId(user._id.toString());
  const reportLink = `${process.env.REACT_APP_URL}/user-report?token=${encryptedUserId}&date=${date}&chartsId=${charts._id}`;

  await sendMonthReportEmail(user.firstName, email, reportLink, date.toString());
};

/**
 * @function getCharts
 * @description Get the charts for the user with the given charts ID
 * @param {string} chartsId - the charts ID
 * @returns {Promise<TrainingsReport>} a promise that resolves with the charts
 * @throws {Error} - if the charts are not found
 * @see {@link TrainingsReport} for more information on getting the charts
 */
export const getCharts = async (chartsId: string) => {
  const charts = await TrainingsReport.findById(chartsId)
    .lean()
    .select('-_id -__v')
    .exec();
  if (!charts) {
    throw new Error('Charts not found');
  }
  return charts;
};

/**
 * @function getDecryptedUserId
 * @description Decrypted and get the user by user ID
 * @param {string} encryptedUserId - ID from link with encrypted user
 * @returns {Promise<string>} user
 * @see {@link decryptUserId} for more information on decrypting user from ID
 */
export const getDecryptedUserId = async (encryptedUserId: string) => {
  return await decryptUserId(encryptedUserId);
};

module.exports = {
  getUsersEmails,
  sendReportToAllUsers,
  sendReportToUser,
  getDecryptedUserId,
  getCharts,
};
