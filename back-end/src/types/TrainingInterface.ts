/**
 * @interface Training
 * @description Interface for Training
 * @property {string} name - The name of the training
 * @property {string} date - The date of the training
 * @property {Array<string>} userIds - The user object ids
 * @property {Array<string>} exercisesIds - The exercise object ids
 * @property {boolean} isFinished - The training is finished
 */
interface Training {
  name: string;
  date: string;
  userIds: string[];
  exercisesIds: string[];
  trainerId: string;
  isFinished: boolean;
}

export default Training;
