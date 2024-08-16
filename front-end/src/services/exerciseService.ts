import { Exercise } from '../types/Exercise';
import axiosService from './axiosService';

/**
 * @function getAllExercises - This service is used to get all exercises.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Exercise[]>} The result of the get all exercises request.
 */
export const getAllExercises = async () => {
  const { data } = await axiosService.get('/exercises');
  return data;
};

/**
 * @function updateExercise - This service is used to update an exercise.
 * @async
 * @param {Exercise} values - The exercise to update.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the update exercise request.
 */
export const updateExercise = async (values: Exercise) => {
  await axiosService.put(`/exercises/${values?._id}`, values);
};

/**
 * @function createExercise - This service is used to create an exercise.
 * @async
 * @param {Exercise} values - The exercise to create.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the create exercise request.
 */
export const createExercise = async (values: Exercise) => {
  await axiosService.post('/exercises', values);
};

/**
 * @function deleteExercise - This service is used to delete an exercise.
 * @async
 * @param {string} id - The id of the exercise to delete.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the delete exercise request.
 */
export const deleteExercise = async (id: string) => {
  await axiosService.delete(`/exercises/${id}`);
};

/**
 * @function getExerciseById - This service is used to get an exercise by id.
 * @async
 * @param {string} id - The id of the exercise to get.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Exercise>} The result of the get exercise by id request.
 */
export const getExerciseById = async (id: string) => {
  const { data } = await axiosService.get(`/exercises/${id}`);
  return data;
};

/**
 * @function getExercisesByNames - This service is used to get exercises by names.
 * @async
 * @param {string[]} names - The names of the exercises to get.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Exercise[]>} The result of the get exercises by names request.
 */
export const createOrUpdateUserExercise = async (values: Exercise) => {
  await axiosService.post('/exercises/create-user-exercise', values);
};

/**
 * @function getUserExercises - This service is used to get user exercises.
 * @async
 * @param {string} userId - The id of the user to get exercises.
 * @param {string} trainingId - The id of the training to get exercises.
 * @param {string[]} exerciseNames - The names of the exercises to get.
 * @see {@link axiosService} for the request handling.
 * @returns
 */
export const getUserTrainingExercises = async (
  userId: string,
  trainingId: string,
  exerciseNames: string[],
): Promise<Exercise[]> => {
  const response = await axiosService.get(
    '/exercises/user-training-exercises',
    {
      params: {
        userId: userId,
        trainingId: trainingId,
        exerciseNames: exerciseNames,
      },
    },
  );

  return response.data;
};

export const getClientExercisesByDateRange = async (
  clientId: string,
  startDate: Date,
  endDate: Date,
) => {
  const response = await axiosService.get(
    '/exercises/clientExercisesByDateRange',
    {
      params: {
        clientId: clientId,
        startDate: startDate,
        endDate: endDate,
      },
    },
  );

  return response.data;
};

/**
 * @function deleteUsersTrainingExercises - This service is used to delete user training exercises.
 * @async
 * @param userIds - The ids of the users to delete exercises.
 * @param trainingId - The id of the training to delete exercises.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the delete user training exercises request.
 */
export const deleteUsersTrainingExercises = async (
  userIds: string[],
  trainingId: string,
) => {
  await axiosService.delete('/exercises/delete-users-training-exercises', {
    data: {
      userIds: userIds,
      trainingId: trainingId,
    },
  });
};

/**
 * @function deleteExercisesOnTraining - This service is used to delete exercises on training.
 * @async
 * @param exercisesNames - The names of the exercises to delete.
 * @param trainingId - The id of the training to delete exercises.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the delete exercises on training request.
 */
export const deleteExercisesOnTraining = async (
  exercisesNames: string[],
  trainingId: string,
) => {
  await axiosService.delete('/exercises/delete-training-exercises', {
    data: {
      exercisesNames: exercisesNames,
      trainingId: trainingId,
    },
  });
};

export const getLatestResultsByClientId = async (id: string) => {
  const response = await axiosService.get(`/exercises/${id}/latest-results`);
  return response.data;
};
