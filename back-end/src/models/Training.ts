import Training from '../types/TrainingInterface';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @constant TrainingSchema
 * @description Schema for Training
 * @type {Training}
 * @property {string} name - The name of the training
 * @property {Array<Schema.Types.ObjectId>} userIds - The user object ids
 * @property {Array<Schema.Types.ObjectId>} exercisesIds - The exercise object ids
 * @property {boolean} isFinished - The training is finished
 * @see {@link Training} for more information about that interface
 */
const TrainingSchema: Training = new Schema(
  {
    name: String,
    userIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: undefined,
      required: false,
    },
    exercisesIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Exercise',
      default: undefined,
      required: false,
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: undefined,
      required: false,
    },
    isFinished: { type: Boolean, required: false, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('trainings', TrainingSchema);
