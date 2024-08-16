import axiosService from './axiosService';

/**
 * @function getAllClientTrainings - This service is used to get all client trainings.
 * @async
 * @param {string} userId - The id of the user to get trainings.
 * @param {[Date | null, Date | null]} date - The array of dates to get trainings.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<any[]>} all the training data for user.
 */
export const getAllClientReportData = async (
  userId: string,
  date: [Date | null, Date | null],
) => {
  const { data } = await axiosService.post('/training/getClientReportData', {
    userId,
    date,
  });

  return data;
};

/**
 * @function getTrainingById - This service is used to send a report email to selected user.
 * @async
 * @param {string} trainingId - The id of the training to get.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<any>} The result of the get training by id request.
 */
export const sendReportEmail = async (
  email: string,
  selectedCharts: string[],
  date: [Date | null, Date | null],
) => {
  await axiosService.post('/user-report', { email, selectedCharts, date });
};

/**
 * @function getSelectedCharts - This service is used to get selected charts.
 * @async
 * @param {string} chartsId - The id of the charts object to get.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<any>} Selected charts for user.
 */
export const getSelectedCharts = async (chartsId: string) => {
  const { data } = await axiosService.get(`/user-report/charts/${chartsId}`);
  return data;
};

export const saveImage = async (imageDataUrl: string) => {
  const { data } = await axiosService.post('/imageUploader/saveChartImage', {
    imageDataUrl,
  });

  return data;
};
