import express from 'express';
import { checkPermission } from '../../middleware/rbacMiddleware';
import Permissions from '../../types/Permissions';
import {
  getMailTemplateByName,
  getMailTemplateNames,
  saveMailTemplate,
  sendMailTemplate,
} from '../../controllers/MailSenderController';

/**
 * @module MailSenderRoutes
 * @description Router for mail sending. Mounted on /api/mail-sender.
 * @type {express.Router}
 * @const
 * @see {@link sendMailTemplate} for more information on the sendMailTemplate function
 * @see {@link saveMailTemplate} for more information on the saveMailTemplate function
 * @see {@link getMailTemplateByName} for more information on the getMailTemplateByName function
 * @see {@link getMailTemplateNames} for more information on the getMailTemplateNames function
 */
const router = express.Router();

router.post('/send', checkPermission([Permissions.ADMIN]), sendMailTemplate);
router.post('/save', checkPermission([Permissions.ADMIN]), saveMailTemplate);
router.get(
  '/names/:name',
  checkPermission([Permissions.ADMIN]),
  getMailTemplateByName,
);
router.get(
  '/names',
  checkPermission([Permissions.ADMIN]),
  getMailTemplateNames,
);

export default router;
