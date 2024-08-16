import Permissions from '../types/Permissions';

const express = require('express');

const rbacMiddleware = require('../middleware/rbacMiddleware');
const TrainingController = require('../controllers/TrainingController');
const authMe = require('../middleware/authMe');

/**
 * @module trainingRoutes
 * @description Router for training-related endpoints. Mounted on /api/trainings.
 * @type {express.Router}
 * @const
 * @see {@link TrainingController} for more information on the TrainingController
 */
const router = express.Router();

router.post('/getClientReportData', TrainingController.getClientReportData);

router.get(
  '/get-all',
  authMe,
  rbacMiddleware.checkPermission([Permissions.TRAINER, Permissions.ADMIN]),
  TrainingController.getAllTraining,
);

router.get(
  '/:id',
  authMe,
  rbacMiddleware.checkPermission([Permissions.TRAINER]),
  TrainingController.getTraining,
);

router.post(
  '/create-training',
  authMe,
  rbacMiddleware.checkPermission([Permissions.TRAINER]),
  TrainingController.createTrainingModel,
);

router.put(
  '/update-training',
  authMe,
  rbacMiddleware.checkPermission([Permissions.TRAINER]),
  TrainingController.updateTrainingModel,
);

router.delete(
  '/delete-training',
  authMe,
  rbacMiddleware.checkPermission([Permissions.TRAINER]),
  TrainingController.deleteTrainingModel,
);

export {};
module.exports = router;
