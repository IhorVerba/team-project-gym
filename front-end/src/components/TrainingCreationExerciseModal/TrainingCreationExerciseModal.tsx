import { useEffect, useState } from 'react';
import { getAllExercises } from '../../services/exerciseService';
import notification from '../../utils/notification';
import Training from '../../types/Training';
import { useForm } from '@mantine/form';
import { Exercise } from '../../types/Exercise';
import { getExerciseIconUrlByType } from '../../utils/getExerciseIconUrlByType';
import { Button, Center, Modal, Stack } from '@mantine/core';
import { MultiSelectWithAvatar } from '../MultiSelectWithAvatar/MultiSelectWithAvatar';
import Loader from '../ui/Loader/Loader';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props - The interface for the TrainingCreationExerciseModal component.
 * @property {Function} onSubmit - The function to call when the form is submitted. It receives the new user ids and new exercises ids. It returns a promise.
 * @property {boolean} opened - The flag to indicate if the modal is opened.
 * @property {Function} close - The function to call when the modal is closed.
 * @property {Training} defaultValues - The default values for the form.
 * @property {string} title - The title of the modal.
 * @property {boolean} loading - The flag to indicate if the form is loading.
 */
type Props = {
  onSubmit: ({
    newUserIds,
    newExercisesIds,
  }: {
    newUserIds?: string[];
    newExercisesIds?: string[];
  }) => Promise<void>;
  opened: boolean;
  close: () => void;
  defaultValues: Training;
  title: string;
  loading: boolean;
};

/**
 * @function TrainingCreationExerciseModal - A component that displays the training creation exercise modal.
 * @param {Props} props - The props to pass to the component.
 * @returns The TrainingCreationExerciseModal component.
 * @see {@link Props} - The props for the TrainingCreationExerciseModal component.
 * @see {@link Training} - The training type.
 * @see {@link Exercise} - The exercise type.
 * @see {@link MultiSelectWithAvatar} - The multi select with avatar component.
 * @see {@link Loader} - The loader component.
 */
export const TrainingCreationExerciseModal: React.FC<Props> = ({
  onSubmit,
  opened,
  close,
  defaultValues,
  title,
  loading,
}) => {
  const { t } = useTranslation();

  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState(false);

  /**
   * @function fetchExercises - Fetches all exercises.
   * @description Fetches all exercises and sets the exercises loading flag.
   * @returns The result of fetching exercises.
   * @throws Will show an error notification if something went wrong.
   * @see {@link getAllExercises} - The function to get all exercises.
   * @see {@link notification} - The notification component.
   */
  const fetchExercises = async () => {
    setExercisesLoading(true);

    try {
      const allExercises = await getAllExercises();

      setAllExercises(allExercises);
    } catch (error) {
      notification({
        type: 'error',
        message: 'Something went wrong! Cannot fetch exercises.',
      });
    } finally {
      setExercisesLoading(false);
    }
  };

  useEffect(() => {
    if (opened) {
      fetchExercises();
    }
  }, [opened]);

  const initialValues = {
    exercisesIds: defaultValues
      ? defaultValues.exercisesIds.map((exercise) => exercise._id as string)
      : ([] as string[]),
  };

  const form = useForm({
    initialValues,
  });

  const closeModalHandler = () => {
    close();
    form.setValues(initialValues);
  };

  const handleSelectChange = (value: string[]) => {
    form.setFieldValue('exercisesIds', value);
  };

  const multiSelectWithAvatarOptions = allExercises.map((exercise) => ({
    value: exercise._id as string,
    label: exercise.name,
    photoUrl: getExerciseIconUrlByType(exercise.type),
  }));

  return (
    <Modal opened={opened} onClose={closeModalHandler} centered title={title}>
      {exercisesLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <form
          onSubmit={form.onSubmit(() =>
            onSubmit({ newExercisesIds: form.values.exercisesIds }),
          )}
        >
          <Stack>
            <MultiSelectWithAvatar
              options={multiSelectWithAvatarOptions}
              value={form.values.exercisesIds}
              setValue={handleSelectChange}
              placeholder={t('trainingCreationExerciseModal.selectExercises')}
              label={t('trainingCreationExerciseModal.selectExercises')}
            />
          </Stack>
          <Center>
            <Button mt="md" type="submit" loading={loading}>
              {t('trainingCreationExerciseModal.changeExercisesBtn')}
            </Button>
          </Center>
        </form>
      )}
    </Modal>
  );
};
