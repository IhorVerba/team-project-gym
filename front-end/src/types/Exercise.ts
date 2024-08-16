/**
 * @interface Exercise
 * @property {Date} createdAt - The createdAt property of the model from backend.
 * @property {string} _id - The _id property of the model from backend.
 * @property {string} name - The name exercise
 * @property {string} type - The type exercise
 * @property {Array<{ weight?: number; reps?: number; duration?: number }>} sets - The sets exercise
 * @property {number} restTime - The restTime exercise
 * @property {number} duration - The duration exercise
 * @property {{ distance?: number; energy?: number }} result - The result exercise
 * @property {string} description - The description exercise
 * @property {string} userId - The userId exercise. Who is doing the exercise
 * @property {string} trainingId - The trainingId exercise. To which training the exercise belongs
 */
export interface Exercise {
  createdAt?: Date;
  _id?: string;
  name: string;
  type: string;
  sets?: { weight?: number; reps?: number; duration?: number }[];
  restTime?: number;
  duration?: number;
  result?: { distance?: number; energy?: number };
  description?: string;
  userId?: string;
  trainingId?: string;
}

/**
 * @constant basicTypes - The basicTypes array constant.
 * @type {string[]}
 */
export const basicTypes = ['Strength', 'Cardio', 'Crossfit'];
