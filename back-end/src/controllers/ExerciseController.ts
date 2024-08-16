import { Request, Response } from 'express';
const exerciseService = require('../services/ExerciseService');

/**
 * @function getAllExercises
 * @description Gets all exercises
 * @param {Request} req - The request object from the client
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (exercises)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getAllExercises} for more information about that service
 */
exports.getAllExercises = async (_: Request, res: Response) => {
  try {
    const exercises = await exerciseService.getAllExercises();
    res.status(200).json(exercises);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function createExercise
 * @description Creates a new exercise
 * @param {Request} req - The request object from the client (exercise)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (exercise)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link createExercise} for more information about that service
 */
exports.createExercise = async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseService.createExercise(req.body);
    res.status(200).json(exercise);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function getExerciseById
 * @description Gets an exercise by id
 * @param {Request} req - The request object from the client (exercise id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (exercise)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getExerciseById} for more information about that service
 */
exports.getExerciseById = async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseService.getExerciseById(req.params.id);
    res.status(200).json(exercise);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function updateExercise
 * @description Updates an existing exercise by id with new data
 * @param {Request} req - The request object from the client (exercise id and new data)
 * @param {Response} res - The response object sent to the client
 * @method PUT
 * @returns {Promise<void>} The response object sent to the client (updated exercise)
 * @throws {Error} - returns 404 status code with error message if error occurs
 * @see {@link updateExercise} for more information about that service
 */
exports.updateExercise = async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseService.updateExercise(
      req.params.id,
      req.body,
    );
    res.status(200).json(exercise);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
};

/**
 * @function deleteExercise
 * @description Deletes an exercise by id
 * @param {Request} req - The request object from the client (exercise id)
 * @param {Response} res - The response object sent to the client
 * @method DELETE
 * @returns {Promise<void>} The response object sent to the client (exercise)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link deleteExercise} for more information about that service
 */
exports.deleteExercise = async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseService.deleteExercise(req.params.id);
    res.status(200).json(exercise);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function createUserOrUpdateUserTrainingExercise
 * @description Creates or updates a user's exercise on a training
 * @param {Request} req - The request object from the client (exercise)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (exercise)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link createUserOrUpdateExercise} for more information about that service
 */
exports.createOrUpdateUserTrainingExercise = async (
  req: Request,
  res: Response,
) => {
  try {
    const exercise = await exerciseService.createOrUpdateUserExercise(
      req.body,
      req.body.user.id,
    );

    res.status(200).json(exercise);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function getUserTrainingExercises
 * @description Gets a user's exercises on a training
 * @param {Request} req - The request object from the client (user id, training id, exercise names)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (exercises)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getUserExercisesOnTraining} for more information about that service
 */
exports.getUserTrainingExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await exerciseService.getUserExercisesOnTraining(
      req.query.userId,
      req.query.trainingId,
      req.query.exerciseNames,
    );

    res.status(200).json(exercises);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.getClientExercisesByDateRange = async (req: Request, res: Response) => {
  try {
    const exercises = await exerciseService.getClientExercisesByDateRange(
      req.query.clientId,
      req.query.startDate,
      req.query.endDate,
    );

    res.status(200).send(exercises);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.deleteUsersTrainingExercises = async (req: Request, res: Response) => {
  try {
    await exerciseService.deleteUsersExerciseOnTraining(
      req.body.userIds,
      req.body.trainingId,
      req.body.user.id,
    );

    res.status(200).json('Exercises deleted successfully');
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

/**
 * @function deleteTrainingExercises
 * @description Deletes exercises on a training
 * @param {Request} req - The request object from the client (training id, exercise names)
 * @param {Response} res - The response object sent to the client
 * @method DELETE
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link deleteExercisesOnTraining} for more information about that service
 */
exports.deleteTrainingExercises = async (req: Request, res: Response) => {
  try {
    await exerciseService.deleteExercisesOnTraining(
      req.body.exercisesNames,
      req.body.trainingId,
      req.body.user.id,
    );

    res.status(200).json('Exercises deleted successfully');
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.getLatestResultsByClientId = async (req: Request, res: Response) => {
  try {
    const results = await exerciseService.getLatestResultsByClientId(
      req.params.id,
    );

    res.status(200).json(results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.getLatestResultsByClientId = async (req: Request, res: Response) => {
  try {
    const results = await exerciseService.getLatestResultsByClientId(
      req.params.id,
    );

    res.status(200).json(results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
