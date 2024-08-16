import { Grid } from '@mantine/core';
import { Exercise } from '../../types/Exercise';
import { ExerciseCard } from '../ExerciseCard';
import NoResults from '../ui/NoResults/NoResults';
import { HandleCreate } from '../../types/HandleCreate';
import UserExercisesCard from '../UserExerciseCard/UserExerciseCard';
import { NavLink } from 'react-router-dom';
import { SkeletonCardsList } from '../ui/Skeletons/SkeletonCardsList';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../ui/ConfirmModal';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import notification from '../../utils/notification';

/**
 * @interface Props - The props for the ExercisesList component.
 * @property {string} variant - The variant of the component.
 * @property {Exercise[]} exercises - The exercises array.
 * @property {string[]} workoutTypes - The workout types array.
 * @property {HandleCreate<Exercise>} createExercise - The function to create the exercise.
 * @property {string | null} selectedUser - The selected user.
 * @property {string[]} selectedExercises - The selected exercises array.
 * @property {(exercises: string[]) => void} setSelectedExercises - The function to set the selected exercises.
 */
type Props = {
  variant: string;
  exercises: Exercise[];
  workoutTypes?: string[];
  createExercise?: HandleCreate<Exercise>;
  selectedUser?: string | null;
  selectedExercises?: string[];
  setSelectedExercises?: (exercises: string[]) => void;
  disabled?: boolean;
  isEditable?: boolean;
  loading?: boolean;
  skeletonCardCount?: number;
  handleUpdateTraining?: ({
    newUserIds,
    newExercisesIds,
    isFinished,
  }: {
    newUserIds?: string[];
    newExercisesIds?: string[];
    isFinished?: boolean;
  }) => void;
  isFinished?: boolean;
};

/**
 * @function ExercisesList - A component that displays the list (grid) of exercises cards. The list can be general or user exercises. This based on the variant prop. If the variant is general, the component will display the general exercises. If the variant is user, the component will display the user exercises.
 * @param {Props} props - The props to be passed into the component.
 * @returns The ExercisesList component.
 * @see {@link Props} - The props for the ExercisesList component.
 * @see {@link ExerciseCard} - The card for the exercise.
 * @see {@link UserExercisesCard} - The card for the user exercise.
 * @see {@link NoResults} - The component to display if there's no results.
 */
export const ExercisesList: React.FC<Props> = ({
  variant,
  exercises,
  workoutTypes,
  createExercise,
  selectedUser,
  selectedExercises,
  setSelectedExercises,
  disabled,
  isEditable,
  loading,
  skeletonCardCount,
  handleUpdateTraining,
  isFinished,
}) => {
  const { t } = useTranslation();

  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();

  const handleDeleteExercise = async () => {
    setExerciseLoading(true);
    try {
      if (exerciseToDelete) {
        const filteredExercises = exercises
          .filter((exercise) => exercise._id !== exerciseToDelete._id)
          .map((exercise) => exercise._id as string);

        handleUpdateTraining &&
          (await handleUpdateTraining({ newExercisesIds: filteredExercises }));
      }
    } catch (error) {
      notification({
        type: 'error',
        message: t('trainingCreationPage.cannotUpdate'),
      });
    } finally {
      setExerciseLoading(false);
    }
  };

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ConfirmModal
        opened={opened}
        close={close}
        loading={exerciseLoading}
        text={t('exercisesList.deleteExercise')}
        buttonText={t('exercisesList.confirmDeleteExercise')}
        confirmedAction={handleDeleteExercise}
      />
      <Grid m="xs" mx={0}>
        {!loading ? (
          exercises.length !== 0 ? (
            exercises.map((exercise: Exercise) => {
              return (
                <Grid.Col
                  span={{
                    base: selectedExercises?.includes(exercise._id as string)
                      ? 12
                      : 6,
                    xs: selectedExercises?.includes(exercise._id as string)
                      ? 12
                      : 4,
                    lg: 3,
                  }}
                  m={0}
                  p={5}
                  key={exercise._id}
                >
                  {variant === 'general' ? (
                    <NavLink to={`${exercise._id}`}>
                      <ExerciseCard exercise={exercise} />
                    </NavLink>
                  ) : (
                    <UserExercisesCard
                      exercise={exercise}
                      workoutTypes={workoutTypes as string[]}
                      createExercise={createExercise as HandleCreate<Exercise>}
                      selectedUser={selectedUser}
                      selectedExercises={(selectedExercises as string[]) || []}
                      setSelectedExercises={
                        setSelectedExercises as (exercises: string[]) => void
                      }
                      isFinished={isFinished}
                      disabled={disabled}
                      openModal={open}
                      setExerciseToDelete={setExerciseToDelete}
                      isEditable={isEditable as boolean}
                    />
                  )}
                </Grid.Col>
              );
            })
          ) : (
            <NoResults text={t('exercisesList.notFound')} />
          )
        ) : (
          <SkeletonCardsList
            type="default"
            cardCount={skeletonCardCount || 4}
            cardHeight={167}
            avatarHeight={80}
            titleWidth={100}
            titleHeight={20}
            subtitleWidth={90}
            subtitleHeight={17}
          />
        )}
      </Grid>
    </>
  );
};
