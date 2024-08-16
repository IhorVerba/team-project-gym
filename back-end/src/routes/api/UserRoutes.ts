import Permissions from '../../types/Permissions';
import { checkPermission } from '../../middleware/rbacMiddleware';

const express = require('express');

/**
 * @module UserRoutes
 * @description Router for user-related endpoints. Mounted on /api/users.
 * @type {express.Router}
 * @const
 * @see {@link AdminController} for more information on the AdminController
 * @see {@link TrainerController} for more information on the TrainerController
 * @see {@link ClientController} for more information on the ClientController
 * @see {@link UserController} for more information on the UserController
 */
const router = express.Router();

const AdminController = require('../../controllers/AdminController');
const TrainerController = require('../../controllers/TrainerController');
const ClientController = require('../../controllers/ClientController');
const UserController = require('../../controllers/UserController');

router.post(
  '/send-reports',
  checkPermission([Permissions.TRAINER]),
  TrainerController.sendMonthReports,
);

router.get(
  '/',
  checkPermission([Permissions.ADMIN, Permissions.TRAINER]),
  UserController.getAllUsers,
);

router.get(
  '/disabled-users',
  checkPermission([Permissions.ADMIN, Permissions.TRAINER]),
  UserController.getDisabledUsers,
);

router.get(
  '/disabled-clients',
  checkPermission([Permissions.TRAINER]),
  UserController.getDisabledClientsInfo,
);

router.get(
  '/all-clients',
  checkPermission([Permissions.ADMIN, Permissions.TRAINER]),
  ClientController.getAllClients,
);

router.get(
  '/clients-main-info',
  checkPermission([Permissions.TRAINER]),
  UserController.getClientsMainInfo,
);

router.get(
  '/:id',
  checkPermission([Permissions.ADMIN, Permissions.TRAINER]),
  UserController.getUserById,
);

router.post(
  '/create-admin',
  checkPermission([Permissions.ADMIN]),
  AdminController.createAdmin,
);
router.post(
  '/create-trainer',
  checkPermission([Permissions.ADMIN]),
  TrainerController.createTrainer,
);
router.post(
  '/create-client',
  checkPermission([Permissions.TRAINER]),
  ClientController.createClient,
);

router.post(
  '/disable-admin',
  checkPermission([Permissions.ADMIN]),
  AdminController.disableAdmin,
);
router.post(
  '/disable-trainer',
  checkPermission([Permissions.ADMIN]),
  TrainerController.disableTrainer,
);
router.post(
  '/disable-client',
  checkPermission([Permissions.TRAINER]),
  ClientController.disableClient,
);

router.post(
  '/activate-admin',
  checkPermission([Permissions.ADMIN]),
  AdminController.activateAdmin,
);
router.post(
  '/activate-trainer',
  checkPermission([Permissions.ADMIN]),
  TrainerController.activateTrainer,
);
router.post(
  '/activate-client',
  checkPermission([Permissions.TRAINER]),
  ClientController.activateClient,
);

router.put(
  '/update-admin',
  checkPermission([Permissions.ADMIN]),
  AdminController.updateAdmin,
);
router.put(
  '/update-trainer',
  checkPermission([Permissions.ADMIN]),
  TrainerController.updateTrainer,
);
router.put(
  '/update-client',
  checkPermission([Permissions.TRAINER]),
  ClientController.updateClient,
);
router.post(
  '/trainer/add-client',
  checkPermission([Permissions.TRAINER]),
  TrainerController.addClient,
);

router.post(
  '/trainer/remove-client',
  checkPermission([Permissions.TRAINER]),
  TrainerController.removeClient,
);

module.exports = router;
