import { Schema, model } from 'mongoose';
import { ExerciseSchemaInterface } from '../types/ExerciseInterface';

/**
 * @constant exerciseSchema
 * @description Schema for Exercise
 * @type {Schema<ExerciseSchemaInterface>}
 * @property {string} name - The name of the exercise
 * @property {string} type - The type of the exercise
 * @property {Array<{weight: number, reps: number, duration: number}>} sets - The sets of the exercise (weight, reps)
 * @property {number} restTime - The rest time of the exercise
 * @property {number} duration - The duration of the exercise
 * @property {{distance: number, energy: number}} result - The result of the exercise (distance, energy)
 * @property {string} description - The description of the exercise
 * @property {string} userId - The user object id
 * @property {string} trainingId - The training object id
 * @see {@link ExerciseSchemaInterface} for more information about that interface
 */
const exerciseSchema = new Schema<ExerciseSchemaInterface>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    sets: {
      type: [
        {
          weight: { type: Number, default: undefined },
          reps: { type: Number, default: undefined },
          duration: { type: Number, default: undefined },
        },
      ],
      default: undefined,
    },
    restTime: { type: Number, required: false },
    duration: { type: Number, required: false },
    result: {
      type: {
        distance: { type: Number, required: false, default: undefined },
        energy: { type: Number, required: false, default: undefined },
      },
      default: undefined,
    },
    description: { type: String, required: false },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: undefined,
      required: false,
      unique: false,
    },
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: 'Training',
      default: undefined,
      required: false,
      unique: false,
    },
  },
  { timestamps: true },
);
module.exports = model('Exercise', exerciseSchema);
