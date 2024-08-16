import { Exercise } from './Exercise';
import { User } from './User';

/**
 * @interface Training - fot the trainings.
 * @property {string} _id - The _id of the training.
 * @property {string} name
 * @property {string} createdAt - The date when the training was created.
 * @property {string} updatedAt - The date when the training was updated.
 * @property {User[]} userIds - The users that are doing the training.
 * @property {Exercise[]} exercisesIds - The exercises that are in the training.
 * @property {boolean} isFinished - The boolean that indicates if the training is finished.
 * @see {@link User} interface for more information on the User interface.
 * @see {@link Exercise} interface for more information on the Exercise interface.
 */
interface Training {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  userIds: User[];
  exercisesIds: Exercise[];
  trainerId?: User;
  isFinished?: boolean;
}

export default Training;
