import { Modal } from '@mantine/core';
import { Exercise } from '../../types/Exercise';
import { HandleCreate } from '../../types/HandleCreate';
import { UserExerciseForm } from '../UserExerciseForm/UserExerciseForm';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props - interface for UserExerciseModal component
 * @property {HandleCreate<Exercise>} onCreate - function to create a new exercise
 * @property {() => void} close - function to close the modal
 * @property {boolean} opened - boolean to check if the modal is opened
 * @property {string[]} workoutTypes - array of workout types
 * @property {Exercise} defaultModalValues - default values for the modal
 * @see {@link Exercise} for Exercise type
 * @see {@link HandleCreate} for UserExerciseForm component
 */
type Props = {
  onCreate: HandleCreate<Exercise>;
  close: () => void;
  opened: boolean;
  workoutTypes: string[];
  defaultModalValues?: Exercise;
  disabled?: boolean;
  isEditable: boolean;
  setIsSetted: (value: boolean) => void;
  isSetted: boolean;
};

/**
 * @function UserExerciseModal component
 * @description - This component renders a modal with UserExerciseForm component inside
 * @param {HandleCreate<Exercise>} onCreate - function to create a new exercise
 * @param {() => void} close - function to close the modal
 * @param {boolean} opened - boolean to check if the modal is opened
 * @param {string[]} workoutTypes - array of workout types
 * @param {Exercise} defaultModalValues - default values for the modal
 * @returns {JSX.Element} - Rendered UserExerciseModal component
 * @see {@link UserExerciseForm} for UserExerciseForm component
 */
const UserExerciseModal: React.FC<Props> = ({
  onCreate,
  close,
  opened,
  workoutTypes = [],
  defaultModalValues,
  disabled,
  isEditable,
  setIsSetted,
  isSetted,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      title={
        disabled
          ? t('userExerciseModal.pastmodalTitle')
          : t('userExerciseModal.modalTitle')
      }
      transitionProps={{
        transition: 'fade',
        duration: 100,
      }}
      overlayProps={{
        opacity: 0.8,
        blur: 4,
      }}
      keepMounted
    >
      <UserExerciseForm
        onCreate={onCreate}
        workoutTypes={workoutTypes}
        defaultModalValues={defaultModalValues}
        disabled={disabled}
        isEditable={isEditable}
        setIsSetted={setIsSetted}
        isSetted={isSetted}
      />
    </Modal>
  );
};
export default UserExerciseModal;
