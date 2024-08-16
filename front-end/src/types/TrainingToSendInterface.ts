import Training from './Training';

/**
 * @interface TrainingToSendInterface - for the trainings.
 * @extends Omit with the Training interface, with the 'userIds' or 'exercisesIds' properties.
 * @property {string} name
 * @property {string[]} userIds - The users that are doing the training.
 * @property {string[]} exercisesIds - The exercises that are in the training.
 * @see {@link Training} interface for more information on the Training interface.
 * @see {@link Omit} for more information on the Omit interface.
 */
interface TrainingToSendInterface
  extends Omit<Training, 'userIds' | 'exercisesIds' | 'trainerId'> {
  userIds: string[];
  exercisesIds: string[];
  trainerId?: string;
}

export default TrainingToSendInterface;
