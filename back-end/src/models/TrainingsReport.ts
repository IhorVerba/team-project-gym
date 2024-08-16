import mongoose, { Schema } from 'mongoose';
import { TrainingsReport } from '../types/TrainingsReport';

/**
 * @constant TrainingsReportSchema
 * @description Schema for TrainingsReport
 * @type {Schema<TrainingsReport>}
 * @property {string} typeChart - The type of the types chart
 * @property {string} exerciseChart - All exercise chart
 * @property {string} strengthChart - Strength exercises chart
 * @property {string} cardioChart - Cardio exercises chart
 * @property {string} crossfitChart - Crossfit exercises chart
 * @property {Date} date - The date of the report
 * @see {@link TrainingsReport} for more information about that interface
 */
const TrainingsReportSchema = new Schema<TrainingsReport>({
  typeChart: { type: String },
  exerciseChart: { type: String },
  strengthChart: { type: String },
  cardioChart: { type: String },
  crossfitChart: { type: String },
  date: { type: Date },
});

module.exports = mongoose.model('TrainingsReport', TrainingsReportSchema);
export default mongoose.model('TrainingsReport', TrainingsReportSchema);
