import express from 'express';
const {
  login,
  me,
  setPassword,
  checkToken,
  refreshToken,
  forgotPassword,
  resetPassword,
  checkResetToken,
} = require('../../controllers/authController');

const authMe = require('../../middleware/authMe');

/**
 * @module authRoutes
 * @description Router for authentication-related endpoints. Mounted on /auth.
 * @type {express.Router}
 * @const
 * @see {@link login} for more information on the login function
 * @see {@link me} for more information on the me function
 * @see {@link setPassword} for more information on the setPassword function
 * @see {@link checkToken} for more information on the checkToken function
 * @see {@link refreshToken} for more information on the refreshToken function
 * @see {@link forgotPassword} for more information on the forgotPassword function
 * @see {@link resetPassword} for more information on the resetPassword function
 * @see {@link checkResetToken} for more information on the checkResetToken function
 */
const router = express.Router();

router.get('/me', authMe, me);
router.post('/', login);
router.post('/refresh', refreshToken);
router.post('/verification-token', checkToken);
router.post('/set-password', setPassword);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:resetToken', checkResetToken);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
