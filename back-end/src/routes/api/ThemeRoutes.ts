import express from 'express';
import { getColors, setColors } from '../../controllers/ThemeController';
const authMe = require('../../middleware/authMe');

/**
 * @module ThemeRoutes
 * @description Router for theme-related endpoints. Mounted on /api/theme.
 * @type {express.Router}
 * @const
 * @see {@link getColors} for more information on the getColors function
 * @see {@link setColors} for more information on the setColors function
 */
const router = express.Router();

router.get('/', getColors);
router.post('/', authMe, setColors);

export default router;
