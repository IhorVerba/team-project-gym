import { Request, Response } from 'express';
import {
  createTraining,
  deleteTraining,
  getAllClientReportData,
  getAllTrainings,
  getTrainingById,
  updateTraining,
} from '../services/trainingService';

/**
 * @function getAllTraining
 * @description Gets all trainings
 * @param {Request} req - The request object from the client (user id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (trainings)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link getAllTrainings} for more information about that service
 */
export const getAllTraining = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      const trainings = await getAllTrainings();
      return res.status(200).send(trainings);
    }
    const trainings = await getAllTrainings(userId as string);
    res.status(200).send(trainings);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function getClientReportData
 * @description Gets all client trainings
 * @param {Request} req - The request object from the client (user id, date)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (trainings)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link getAllClientTrainings} for more information about that service
 */
export const getClientReportData = async (req: Request, res: Response) => {
  try {
    const userTrainings = await getAllClientReportData(
      req.body.userId,
      req.body.date,
    );
    res.status(200).json(userTrainings);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: 'Internal server error at /getClientTrainings' });
  }
};

/**
 * @function createTrainingModel
 * @description Creates a training
 * @param {Request} req - The request object from the client (training)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (training)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link createTraining} for more information about that service
 */
export const createTrainingModel = async (req: Request, res: Response) => {
  try {
    const training = await createTraining(req.body);

    res.status(200).send(training);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function updateTrainingModel
 * @description Updates a training
 * @param {Request} req - The request object from the client (updatedTrainingId, updatedTraining)
 * @param {Response} res - The response object sent to the client
 * @method PUT
 * @returns {Promise<void>} The response object sent to the client (training)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link updateTraining} for more information about that service
 */
export const updateTrainingModel = async (req: Request, res: Response) => {
  const { updatedTrainingId, updatedTraining } = req.body;

  try {
    const newTraining = await updateTraining(
      updatedTrainingId,
      updatedTraining,
      req.body.user.id,
    );
    res.status(200).send(newTraining);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function deleteTrainingModel
 * @description Deletes a training
 * @param {Request} req - The request object from the client (trainingToDeleteId)
 * @param {Response} res - The response object sent to the client
 * @method DELETE
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link deleteTraining} for more information about that service
 */
export const deleteTrainingModel = async (req: Request, res: Response) => {
  try {
    await deleteTraining(req.body.trainingToDeleteId, req.body.user.id);
    res.status(200).send('Training Deleted');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      return res.status(400).send(err.message);
    }

    res.status(400).send('Unexpected error');
  }
};

/**
 * @function getTraining
 * @description Gets a training by id
 * @param {Request} req - The request object from the client (training id)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (training)
 * @throws {Error} - returns 500 status code with error message if error occurs
 * @see {@link getTrainingById} for more information about that service
 */
export const getTraining = async (req: Request, res: Response) => {
  try {
    const training = await getTrainingById(req.params.id);
    res.status(200).send(training);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
