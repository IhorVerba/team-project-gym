import { ExerciseModelInterface } from '../types/ExerciseInterface';
import { getTrainingById } from './trainingService';
const { ObjectId } = require('mongoose').Types;
const ExerciseModel = require('../models/Exercise');

/**
 * @function getAllExercises
 * @description Get all exercises
 * @returns {Promise<ExerciseModelInterface[]>} a promise that resolves with an array of exercises
 * @see {@link ExerciseModel} for more information on getting all exercises
 */
const getAllExercises = async () => {
  return await ExerciseModel.find({
    $or: [{ userId: { $exists: false } }, { trainingId: { $exists: false } }],
  });
};

/**
 * @function createExercise
 * @description Create a new exercise
 * @param {ExerciseModelInterface} exercise - the exercise object
 * @returns {Promise<ExerciseModelInterface>} a promise that resolves with the new exercise
 * @throws {Error} - if the exercise with this name already exists
 * @see {@link ExerciseModel} for more information on creating an exercise
 */
const createExercise = async (exercise: ExerciseModelInterface) => {
  if (exercise.trainingId || exercise.userId) {
    throw new Error('Forbidden');
  }

  const exerciseName = exercise.name.toLowerCase();

  const isExerciseExist = await ExerciseModel.findOne({
    name: { $regex: new RegExp('^' + exerciseName + '$', 'i') },
    userId: { $exists: false },
    trainingId: { $exists: false },
  });

  if (isExerciseExist) {
    throw new Error('Exercise with this name already exists');
  }

  return await ExerciseModel.create(exercise);
};

/**
 * @function getExerciseById
 * @description Get an exercise by id
 * @param {string} id - the exercise id
 * @returns {Promise<ExerciseModelInterface>} a promise that resolves with the exercise
 * @see {@link ExerciseModel} for more information on getting an exercise by id
 */
const getExerciseById = async (id: string) => {
  return await ExerciseModel.findById(id);
};

/**
 * @function updateExercise
 * @description Update an exercise
 * @param {string} id - the exercise id
 * @param {ExerciseModelInterface} exercise - the exercise object
 * @returns {Promise<ExerciseModelInterface>} a promise that resolves with the updated exercise
 * @see {@link ExerciseModel} for more information on updating an exercise
 */
const updateExercise = async (id: string, exercise: ExerciseModelInterface) => {
  const searchedExercise = await getExerciseById(id);

  if (
    searchedExercise &&
    (searchedExercise.trainingId ||
      searchedExercise.userId ||
      exercise.trainingId ||
      exercise.userId)
  ) {
    throw new Error('Forbidden');
  }

  return await ExerciseModel.findOneAndUpdate({ _id: id }, exercise, {
    new: true,
  });
};

/**
 * @function deleteExercise
 * @description Delete an exercise
 * @param {string} id - the exercise id
 * @returns {Promise<ExerciseModelInterface>} a promise that resolves with the deleted exercise
 * @see {@link ExerciseModel} for more information on deleting an exercise
 */
const deleteExercise = async (id: string) => {
  const searchedExercise = await getExerciseById(id);

  if (
    searchedExercise &&
    (searchedExercise.trainingId || searchedExercise.userId)
  ) {
    throw new Error('Forbidden');
  }

  return await ExerciseModel.findByIdAndDelete(id);
};

/**
 * @function createUserOrUpdateExercise
 * @description Create a new exercise or update an existing one
 * @param {ExerciseModelInterface} exercise - the exercise object
 * @returns {Promise<ExerciseModelInterface>} a promise that resolves with the new or updated exercise
 * @see {@link ExerciseModel} for more information on creating or updating an exercise
 */
const createOrUpdateUserExercise = async (
  exercise: ExerciseModelInterface,
  userId: string,
) => {
  if (!exercise.userId || !exercise.trainingId) {
    throw new Error('Missing trainingId or userId');
  }

  const searchedTraining = await getTrainingById(exercise.trainingId);

  if (
    !searchedTraining ||
    !searchedTraining.trainerId ||
    searchedTraining.trainerId.toString() !== userId
  ) {
    throw new Error('Forbidden');
  }

  return await ExerciseModel.findOneAndUpdate(
    {
      name: exercise.name,
      userId: exercise.userId,
      trainingId: exercise.trainingId,
    },
    exercise,
    { upsert: true, new: true },
  );
};

/**
 * @function getLastUserExercises
 * @description Get the selected user's last exercises
 * @param {string} userId - the user id
 * @param {string[]} exercisesNames - the exercises names
 * @returns {Promise<ExerciseModelInterface[]>} a promise that resolves with the last user exercises
 * @see {@link ExerciseModel} for more information on getting the last user exercises
 */
const getLastUserExercises = async (
  userId: string,
  exercisesNames: string[],
) => {
  const ObjectUserId = new ObjectId(userId);
  const pipeline = [
    {
      $match: {
        userId: ObjectUserId,
        name: { $in: exercisesNames },
      },
    },
    {
      $sort: { createdAt: 1 },
    },
    {
      $group: {
        _id: '$name',
        exercise: { $last: '$$ROOT' },
      },
    },
    {
      $replaceRoot: { newRoot: '$exercise' },
    },
    {
      $project: {
        userId: 0,
        trainingId: 0,
        descrirtion: 0,
      },
    },
    {
      $limit: exercisesNames.length,
    },
  ];

  return await ExerciseModel.aggregate(pipeline);
};

/**
 * @function getUserExercisesOnTraining
 * @description Get the selected user's exercises on a training
 * @param {string} userId - the user id
 * @param {string} trainingId - the training id
 * @param {string[]} exercisesNames - the exercises names
 * @returns {Promise<ExerciseModelInterface[]>} a promise that resolves with the user exercises on the training
 * @see {@link ExerciseModel} for more information on getting the user exercises on a training
 */
const getUserExercisesOnTraining = async (
  userId: string,
  trainingId: string,
  exercisesNames: string[],
) => {
  if (!exercisesNames) {
    return [];
  }

  const result = await ExerciseModel.find(
    {
      userId: userId,
      trainingId: trainingId,
    },
    '-description',
  );

  let pastUserExercises = [];

  if (result.length !== exercisesNames.length) {
    const newExerciseNames = exercisesNames.filter(
      (exerciseName) =>
        !result.some((item: ExerciseModelInterface) =>
          exerciseName.includes(item.name),
        ),
    );

    pastUserExercises = await getLastUserExercises(userId, newExerciseNames);
  }

  return [...result, ...pastUserExercises];
};

/**
 * @function deleteUsersExerciseOnTraining
 * @description Delete the selected users exercises on a training
 * @param {string[]} userIds - the users ids
 * @param {string} trainingId - the training id
 * @returns {Promise<void>} a promise that resolves when the users exercises are deleted
 * @see {@link ExerciseModel} for more information on deleting the users exercises on a training
 */
const deleteUsersExerciseOnTraining = async (
  userIds: string[],
  trainingId: string,
  userId: string,
) => {
  const searchedTraining = await getTrainingById(trainingId);

  if (!searchedTraining || searchedTraining.trainerId.toString() !== userId) {
    throw new Error('Forbidden');
  }

  await ExerciseModel.deleteMany({
    userId: { $in: userIds },
    trainingId: trainingId,
  });
};

/**
 * @function deleteExercisesOnTraining
 * @description Delete the selected exercises on a training
 * @param {string[]} exercisesNames - the exercises names
 * @param {string} trainingId - the training id
 * @returns {Promise<void>} a promise that resolves when the exercises are deleted
 * @see {@link ExerciseModel} for more information on deleting the exercises on a training
 */
const deleteExercisesOnTraining = async (
  exercisesNames: string[],
  trainingId: string,
  userId: string,
) => {
  const searchedTraining = await getTrainingById(trainingId);

  if (!searchedTraining || searchedTraining.trainerId.toString() !== userId) {
    throw new Error('Forbidden');
  }

  await ExerciseModel.deleteMany({
    name: { $in: exercisesNames },
    trainingId: trainingId,
  });
};

const getLatestResultsByClientId = async (userId: string) => {
  const latestResults = await ExerciseModel.aggregate([
    { $match: { userId: new ObjectId(userId) } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: '$name',
        type: { $first: '$type' },
        date: { $first: '$createdAt' },
        sets: { $first: '$sets' },
        result: { $first: '$result' },
        duration: { $first: '$duration' },
      },
    },
    { $sort: { date: -1 } },
    {
      $project: {
        _id: 0,
        name: '$_id',
        date: 1,
        result: 1,
        sets: 1,
        type: 1,
        duration: 1,
      },
    },
  ]);

  return latestResults;
};

const getClientExercisesByDateRange = async (
  clientId: string,
  startDate: Date,
  endDate: Date,
) => {
  try {
    const exercises = await ExerciseModel.aggregate([
      {
        $match: {
          userId: new ObjectId(clientId),
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: '$name',
          type: { $first: '$type' },
          results: {
            $push: {
              date: '$createdAt',
              distance: '$result.distance',
              energy: '$result.energy',
            },
          },
          weights: {
            $push: {
              date: '$createdAt',
              weight: { $last: '$sets.weight' },
              reps: { $last: '$sets.reps' },
            },
          },
          durations: {
            $push: {
              date: '$createdAt',
              duration: '$duration',
            },
          },
        },
      },
      {
        $addFields: {
          latestResultDate: { $max: '$results.date' },
        },
      },
      {
        $sort: { latestResultDate: -1 },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          type: 1,
          results: {
            $map: {
              input: '$results',
              as: 'result',
              in: {
                date: {
                  $dateToString: { format: '%d-%m-%Y', date: '$$result.date' },
                },
                distance: '$$result.distance',
                energy: '$$result.energy',
              },
            },
          },
          weights: {
            $map: {
              input: '$weights',
              as: 'weight',
              in: {
                date: {
                  $dateToString: { format: '%d-%m-%Y', date: '$$weight.date' },
                },
                weight: '$$weight.weight',
                reps: '$$weight.reps',
              },
            },
          },
          durations: {
            $map: {
              input: '$durations',
              as: 'duration',
              in: {
                date: {
                  $dateToString: {
                    format: '%d-%m-%Y',
                    date: '$$duration.date',
                  },
                },
                duration: '$$duration.duration',
              },
            },
          },
          duration: {
            $map: {
              input: '$durations',
              as: 'duration',
              in: '$$duration.duration',
            },
          },
        },
      },
    ]);

    return exercises;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

module.exports = {
  getAllExercises,
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
  createOrUpdateUserExercise,
  getUserExercisesOnTraining,
  getClientExercisesByDateRange,
  deleteUsersExerciseOnTraining,
  deleteExercisesOnTraining,
  getLatestResultsByClientId,
};
