import {
  getUserIdFromLink,
  sendReportToClient,
  getSelectedCharts,
} from '../controllers/monthReport';

const express = require('express');

/**
 * @module monthReportRoutes
 * @description Router for month report-related endpoints. Mounted on /api/month-report.
 * @type {express.Router}
 * @const
 * @see {@link getUserIdFromLink} for more information on the getUserIdFromLink function
 * @see {@link getSelectedCharts} for more information on the getSelectedCharts function
 * @see {@link sendReportToClient} for more information on the sendReportToClient function
 */
const router = express.Router();
router.get('/:id', getUserIdFromLink);
router.get('/charts/:id', getSelectedCharts);
router.post('/', sendReportToClient);

export {};
module.exports = router;
