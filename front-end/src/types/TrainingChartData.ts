import { Exercise } from './Exercise';

/**
 * @interface TrainingData - The training data.
 * @property {Date} createdAt - The date when the training was created.
 * @property {Exercise[]} exercises - The exercises that are in the training.
 * @see {@link Exercise} interface for more information on the Exercise interface.
 */
interface TrainingData {
  createdAt: Date;
  exercises: Exercise[];
}

/**
 * @type ChartSelection - for selected charts.
 * @property {string} cardioChart
 * @property {string} crossfitChart
 * @property {string} exerciseChart
 * @property {string} strengthChart
 * @property {string} typeChart
 */
export type ChartSelection = {
  cardioChart: string;
  crossfitChart: string;
  exerciseChart: string;
  strengthChart: string;
  typeChart: string;
};

export default TrainingData;
