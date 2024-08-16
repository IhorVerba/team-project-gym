import { Document } from 'mongoose';

/**
 * @interface ExerciseSchemaInterface
 * @description Interface for Exercise
 * @extends Document
 * @property {string} name - The name of the exercise
 * @property {string} type - The type of the exercise
 * @property {Array<{weight: number, reps: number, duration: number}>} sets - The sets of the exercise (weight, reps)
 * @property {number} restTime - The rest time of the exercise
 * @property {number} duration - The duration of the exercise
 * @property {{distance: number, work: number}} result - The result of the exercise (distance, work)
 * @property {string} description - The description of the exercise
 * @property {string} trainingId - The training object id
 * @property {string} userId - The user object id
 * @see {@link ExerciseModelInterface} for more information about that interface
 */
interface ExerciseSchemaInterface extends Document {
  name: { type: string; required: boolean };
  type: { type: string; required: boolean };
  sets: [
    {
      weight: { type: number; required: boolean };
      reps: { type: number; required: boolean };
      duration: { type: number; required: boolean };
    },
  ];
  restTime: { type: number; required: boolean };
  duration: { type: number; required: boolean };
  result: {
    distance: { type: number; required: boolean };
    energy: { type: number; required: boolean };
  };
  description: { type: string; required: boolean };
  trainingId: { type: string; required: boolean };
  userId: { type: string; required: boolean };
}

/**
 * @interface ExerciseModelInterface
 * @description Interface for Exercise
 * @property {string} name - The name of the exercise
 * @property {string} type - The type of the exercise
 * @property {Array<{weight: number, reps: number}>} sets - The sets of the exercise (weight, reps)
 * @property {number} restTime - The rest time of the exercise
 * @property {number} duration - The duration of the exercise
 * @property {{distance: number, work: number}} result - The result of the exercise (distance, work)
 * @property {string} description - The description of the exercise
 * @property {string} trainingId - The training object id
 * @property {string} userId - The user object id
 * @see {@link ExerciseSchemaInterface} for more information about that interface
 */
interface ExerciseModelInterface {
  name: string;
  type: string;
  sets: [
    {
      weight: number;
      reps: number;
    },
  ];
  restTime: number;
  duration: number;
  result: {
    distance: number;
    energy: number;
  };
  description: string;
  trainingId: string;
  userId: string;
}
export type { ExerciseModelInterface, ExerciseSchemaInterface };
