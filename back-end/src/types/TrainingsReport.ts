/**
 * @interface TrainingsReport
 * @description Interface for TrainingsReport
 * @extends Document
 * @property {string} typeChart - The type of the types chart
 * @property {string} exerciseChart - All exercise chart
 * @property {string} strengthChart - Strength exercises chart
 * @property {string} cardioChart - Cardio exercises chart
 * @property {string} crossfitChart - Crossfit exercises chart
 * @property {Date} date - The date of the report
 */
export interface TrainingsReport extends Document {
  typeChart: { type: string };
  exerciseChart: { type: string };
  strengthChart: { type: string };
  cardioChart: { type: string };
  crossfitChart: { type: string };
  date: { type: Date };
}
