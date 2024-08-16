import express from 'express';
import {
  changePassword,
  verifyCode,
  getChangePasswordMail,
} from '../../controllers/ChangePasswordController';

/**
 * @module changePasswordRoutes
 * @description This router handles API endpoints for changing user passwords. Mounted on /api/change-password.
 * @type {express.Router}
 * @const
 * @see {@link changePassword} for more information on the changePassword function
 * @see {@link verifyCode} for more information on the verifyCode function
 * @see {@link getChangePasswordMail} for more information on the getChangePasswordMail function
 */
const router = express.Router();

router.post('/send-mail', getChangePasswordMail);
router.post('/verify-code', verifyCode);
router.post('/', changePassword);

export default router;
