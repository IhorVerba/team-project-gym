import TrainingToSendInterface from './TrainingToSendInterface';

/**
 * @type HandleUpdate - The type of the handle update function which depends on the generic type.
 * @template T - The generic type of data.
 * @param {string} _id - The id of the object to update.
 * @param {T} value - The value to be updated.
 * @param {Function} setModalLoading - The function to set the modal loading state.
 * @param {Function} closeUpdate - The function to close the update modal.
 * @returns {Promise<void>} The result of the update request.
 */
export type HandleUpdate<T> = (
  _id: string,
  value: T,
  setModalLoading: (value: boolean) => void,
  closeUpdate: () => void,
) => Promise<void>;

/**
 * @type HandleUpdateTraining - The type of the handle update training function.
 * @param {TrainingToSendInterface} training - The training to be updated.
 * @param {string} trainingId - The id of the training to update.
 * @param {Function} closeModal - The function to close the modal.
 * @param {Function} setModalLoading - The function to set the modal loading state.
 * @returns {Promise<void>} The result of the update training request.
 */
export type HandleUpdateTraining = (
  training: TrainingToSendInterface,
  trainingId: string,
  closeModal: () => void,
  setModalLoading: (value: boolean) => void,
) => Promise<void>;
