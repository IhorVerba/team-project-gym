import Training from '../types/Training';
import TrainingToSendInterface from '../types/TrainingToSendInterface';
import axiosService from './axiosService';

/**
 * @function createTraining - This service is used to create a training.
 * @async
 * @param {TrainingToSendInterface} training - The training to create.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Training>} The result of the create training request.
 */
export const createTraining = async (
  training: TrainingToSendInterface,
): Promise<Training> => {
  const response = await axiosService.post(
    'training/create-training',
    training,
  );
  return response.data;
};

/**
 * @function updateTraining - This service is used to update a training.
 * @async
 * @param {TrainingToSendInterface} newTraining - The new training to update.
 * @param {string} trainingId - The id of the training to update.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Training>} The result of the update training request.
 */
export const updateTraining = async (
  newTraining: TrainingToSendInterface,
  trainingId: string,
): Promise<Training> => {
  const response = await axiosService.put('training/update-training', {
    updatedTrainingId: trainingId,
    updatedTraining: newTraining,
  });
  return response.data;
};

/**
 * @function deleteTraining - This service is used to delete a training.
 * @async
 * @param {string} id - The id of the training to delete.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the delete training request.
 */
export const deleteTraining = async (id: string) => {
  await axiosService.delete('training/delete-training', {
    data: { trainingToDeleteId: id },
  });
};

/**
 * @function getAllTrainings - This service is used to get all trainings.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Training[]>} The result of the get all trainings request.
 */
export const getAllTrainings = async (): Promise<Training[]> => {
  const response = await axiosService.get('training/get-all');
  const trainings = response.data;
  return trainings;
};

/**
 * @function getTrainingById - This service is used to get a training by id.
 * @async
 * @param {string} id - The id of the training to get.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Training>} The result of the get training by id request.
 */
export const getTrainingById = async (id: string): Promise<Training> => {
  const response = await axiosService.get(`training/${id}`);
  return response.data;
};
