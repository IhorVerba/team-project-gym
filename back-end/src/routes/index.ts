import express from 'express';
const router = express.Router();
const bodyParser = require('body-parser');
const authRoutes = require('./auth/authRoutes');
const userRoutes = require('./api/UserRoutes');
const trainingRoutes = require('./trainingRoutes');
const imageUploaderRoutes = require('./api/ImageUploaderRoutes');
const monthReportRoutes = require('./monthReportRoutes');
const authMe = require('../middleware/authMe');
const exerciseRoutes = require('./api/ExerciseRoutes');
import userPasswordRoutes from './api/ChangePasswordRoutes';
import ThemeRoutes from './api/ThemeRoutes';
import mailSenderRoutes from './api/MailSenderRoutes';

router.use(bodyParser.json());

// first routes that don't need authentication and JWT verification
router.use('/auth', authRoutes);
router.use('/theme', ThemeRoutes);
router.use('/user-report', monthReportRoutes);
// inside next routes authMe middleware is used were needed
router.use('/training', trainingRoutes);
router.use(authMe);
// next routes need authentication and JWT verification
router.use('/users', userRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/imageUploader', imageUploaderRoutes);
router.use('/change-password', userPasswordRoutes);
router.use('/mail-template', mailSenderRoutes);

module.exports = router;
