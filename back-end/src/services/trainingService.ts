/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import Training from '../types/TrainingInterface';
const TrainingModel = require('../models/Training');

/**
 * @function getAllTrainings
 * @description Get all trainings
 * @param {string} userId - the user id
 * @returns {Promise<Training[]>} a promise that resolves with an array of trainings
 * @see {@link TrainingModel} for more information on getting all trainings
 */
export const getAllTrainings = async (userId?: string) => {
  if (userId) {
    return await TrainingModel.find({ userIds: { $in: [userId] } })
      .sort({ createdAt: -1 })
      .populate('userIds')
      .populate('exercisesIds');
  }

  return await TrainingModel.find()
    .sort({ createdAt: -1 })
    .populate('userIds')
    .populate('exercisesIds')
    .populate('trainerId');
};

/**
 * @function getAllClientReportData
 * @description Get all client trainings by date range and user id
 * @param {string} userId - the user id
 * @param {string[]} date - the date
 * @returns {Promise<any[]>} a promise that resolves with an array of trainings
 * @see {@link TrainingModel} for more information on getting all client trainings
 */
export const getAllClientReportData = async (
  userId: string,
  date: [string | null, string | null],
) => {
  const convertedDates = date.map((d) => {
    if (d) {
      const dateObj = new Date(d);
      dateObj.setDate(dateObj.getDate() + 1);
      return dateObj;
    }
    return null;
  });

  const exerciseCountByTypePipeline = [
    {
      $match: {
        userIds: new mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: convertedDates[0],
          $lte: convertedDates[1],
        },
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: 'trainingId',
        as: 'exercises',
      },
    },
    {
      $match: {
        exercises: { $exists: true, $ne: [] },
      },
    },
    {
      $unwind: '$exercises',
    },
    {
      $group: {
        _id: '$exercises.type',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        userIds: 0,
        trainingId: 0,
        name: 0,
        exercisesIds: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
  ];

  const exerciseCountByNamePipeline = [
    {
      $match: {
        userIds: new mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: convertedDates[0],
          $lte: convertedDates[1],
        },
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: 'trainingId',
        as: 'exercises',
      },
    },
    {
      $match: {
        exercises: { $exists: true, $ne: [] },
      },
    },
    {
      $unwind: '$exercises',
    },
    {
      $group: {
        _id: '$exercises.name',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        userIds: 0,
        trainingId: 0,
        name: 0,
        exercisesIds: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
  ];

  const strengthExercisesPipeline = [
    {
      $match: {
        userIds: new mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: convertedDates[0],
          $lte: convertedDates[1],
        },
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: 'trainingId',
        as: 'exercises',
      },
    },
    {
      $match: {
        exercises: { $exists: true, $ne: [] },
      },
    },
    {
      $unwind: '$exercises',
    },
    {
      $match: {
        'exercises.type': 'Strength',
        'exercises.sets.weight': { $gt: 0 },
      },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          name: '$exercises.name',
        },
        maxWeight: { $max: { $max: '$exercises.sets.weight' } },
      },
    },
    {
      $group: {
        _id: '$_id.date',
        exercises: {
          $push: { name: '$_id.name', maxWeight: '$maxWeight' },
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        exercises: 1,
      },
    },
  ];

  const cardioExercisesPipeline = [
    {
      $match: {
        userIds: new mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: convertedDates[0],
          $lte: convertedDates[1],
        },
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: 'trainingId',
        as: 'exercises',
      },
    },
    {
      $match: {
        exercises: { $exists: true, $ne: [] },
      },
    },
    {
      $unwind: '$exercises',
    },
    {
      $match: {
        'exercises.type': 'Cardio',
        // 'exercises.result.energy': { $gt: 0 },
        // 'exercises.result.distance': { $gt: 0 },
      },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          name: '$exercises.name',
        },
        totalEnergy: {
          $sum: {
            $sum: '$exercises.result.energy',
          },
        },
        totalDistance: {
          $sum: {
            $sum: '$exercises.result.distance',
          },
        },
      },
    },
    {
      $group: {
        _id: '$_id.date',
        exercises: {
          $push: {
            name: '$_id.name',
            totalEnergy: '$totalEnergy',
            totalDistance: '$totalDistance',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        exercises: 1,
      },
    },
  ];

  const crossfitExercisesPipeline = [
    {
      $match: {
        userIds: new mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: convertedDates[0],
          $lte: convertedDates[1],
        },
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: 'trainingId',
        as: 'exercises',
      },
    },
    {
      $match: {
        exercises: { $exists: true, $ne: [] },
      },
    },
    {
      $unwind: '$exercises',
    },
    {
      $match: {
        'exercises.type': 'Crossfit',
      },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          name: '$exercises.name',
        },
        reps: {
          $sum: {
            $sum: '$exercises.sets.reps',
          },
        },
        weight: {
          $max: {
            $max: '$exercises.sets.weight',
          },
        },
      },
    },
    {
      $group: {
        _id: '$_id.date',
        exercises: {
          $push: {
            name: '$_id.name',
            reps: '$reps',
            weight: '$weight',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        exercises: 1,
      },
    },
  ];

  const exerciseCountByTypeResult = await TrainingModel.aggregate(
    exerciseCountByTypePipeline,
  );
  const exerciseCountByNameResult = await TrainingModel.aggregate(
    exerciseCountByNamePipeline,
  );
  const strengthExercisesResult = await TrainingModel.aggregate(
    strengthExercisesPipeline,
  );
  const cardioExercisesResult = await TrainingModel.aggregate(
    cardioExercisesPipeline,
  );
  const crossfitExercisesResult = await TrainingModel.aggregate(
    crossfitExercisesPipeline,
  );

  // #region Data transformation
  // #region Strength exercises
  type strExDataType = {
    date: string;
    exercises: { name: string; maxWeight: number }[];
  };
  const strengthData = strengthExercisesResult.reduce(
    (
      acc: Record<string, { name: string; maxWeight: number }[]>,
      { date, exercises }: strExDataType,
    ) => {
      exercises.forEach(({ name, maxWeight }) => {
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({ name, maxWeight });
      });
      return acc;
    },
    {},
  );

  const strength = Object.entries(strengthData)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    )
    .map(([date, exercises]: any) => ({
      date,
      ...exercises.reduce(
        (
          acc: Record<string, any>,
          { name, maxWeight }: { name: string; maxWeight: number },
        ) => {
          acc[name] = maxWeight;
          return acc;
        },
        {},
      ),
    }));
  // #endregion
  // #region Cardio exercises
  type cardioExDataType = {
    date: string;
    exercises: { name: string; totalEnergy: number; totalDistance: number }[];
  };
  const cardioData = cardioExercisesResult.reduce(
    (
      acc: Record<
        string,
        { name: string; totalEnergy: number; totalDistance: number }[]
      >,
      { date, exercises }: cardioExDataType,
    ) => {
      exercises.forEach(({ name, totalEnergy, totalDistance }) => {
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({ name, totalEnergy, totalDistance });
      });
      return acc;
    },
    {},
  );

  const cardioEnergy = Object.entries(cardioData)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    )
    .map(([date, exercises]: any) => ({
      date,
      ...exercises.reduce(
        (
          acc: Record<string, any>,
          { name, totalEnergy }: { name: string; totalEnergy: number },
        ) => {
          acc[name] = totalEnergy;
          return acc;
        },
      ),
    }));

  const cardioDistance = Object.entries(cardioData)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    )
    .map(([date, exercises]: any) => ({
      date,
      ...exercises.reduce(
        (
          acc: Record<string, any>,
          { name, totalDistance }: { name: string; totalDistance: number },
        ) => {
          acc[name] = totalDistance;
          return acc;
        },
      ),
    }));

  // #endregion
  // #region Crossfit exercises
  type crossfitExDataType = {
    date: string;
    exercises: { name: string; reps: number; weight: number }[];
  };
  const crossfitData = crossfitExercisesResult.reduce(
    (
      acc: Record<string, { name: string; reps: number; weight: number }[]>,
      { date, exercises }: crossfitExDataType,
    ) => {
      exercises.forEach(({ name, reps, weight }) => {
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({ name, reps, weight });
      });
      return acc;
    },
    {},
  );
  const crossfitRepeats = Object.entries(crossfitData)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    )
    .map(([date, exercises]: any) => ({
      date,
      ...exercises.reduce(
        (
          acc: Record<string, any>,
          { name, reps }: { name: string; reps: number },
        ) => {
          acc[name] = reps;
          return acc;
        },
        {},
      ),
    }));

  const crossfitWeight = Object.entries(crossfitData)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    )
    .map(([date, exercises]: any) => ({
      date,
      ...exercises.reduce(
        (
          acc: Record<string, any>,
          { name, weight }: { name: string; weight: number },
        ) => {
          acc[name] = weight;
          return acc;
        },
        {},
      ),
    }));
  // #endregion
  // #endregion

  const chartsData = [
    {
      title: 'Exercise count by type',
      data: exerciseCountByTypeResult,
    },
    {
      title: 'Exercise count by name',
      data: exerciseCountByNameResult,
    },
    {
      title: 'Strength exercises',
      data: strength,
    },
    {
      title: 'Cardio exercises, energy',
      data: cardioEnergy,
    },
    {
      title: 'Cardio exercises, distance',
      data: cardioDistance,
    },
    {
      title: 'Crossfit exercises, reps',
      data: crossfitRepeats,
    },
    {
      title: 'Crossfit exercises, weight',
      data: crossfitWeight,
    },
  ];

  return chartsData;
};

/**
 * @function getTrainingById
 * @description Get the training by id
 * @param {string} trainingId - the training id
 * @returns {Promise<Training>} a promise that resolves with the training
 * @see {@link TrainingModel} for more information on getting the training by id
 */
export const getTrainingById = async (trainingId: string) => {
  return await TrainingModel.findOne({ _id: trainingId })
    .populate('userIds')
    .populate('exercisesIds');
};

/**
 * @function createTraining
 * @description Create a training
 * @param {Training} training - the training object
 * @returns {Promise<Training>} a promise that resolves with the training
 * @see {@link TrainingModel} for more information on creating a training
 */
export const createTraining = async (training: Training) => {
  return await TrainingModel.create(training);
};

/**
 * @function updateTraining
 * @description Update the training
 * @param {string} id - the training id
 * @param {Training} newTraining - the new training object
 * @returns {Promise<void>} a promise that resolves when the training is updated
 * @throws {Error} - if the training is already finished
 * @see {@link TrainingModel} for more information on updating the training
 */
export const updateTraining = async (
  id: string,
  newTraining: Training,
  userId: string,
) => {
  const searchedTraining = await getTrainingById(id);

  if (searchedTraining.trainerId.toString() !== userId) {
    throw new Error('Forbidden');
  }

  const foundTraining = await TrainingModel.exists({
    isFinished: true,
    _id: id,
  });

  if (foundTraining) {
    throw new Error('Training already finished');
  }

  await TrainingModel.findByIdAndUpdate(id, newTraining);
};

/**
 * @function deleteTraining
 * @description Delete the training
 * @param {string} id - the training id
 * @returns {Promise<void>} a promise that resolves when the training is deleted
 * @see {@link TrainingModel} for more information on deleting the training
 */
export const deleteTraining = async (id: string, userId: string) => {
  const searchedTraining = await getTrainingById(id);

  if (searchedTraining.trainerId.toString() !== userId) {
    throw new Error('Forbidden');
  }

  await TrainingModel.findByIdAndDelete(id);
};
