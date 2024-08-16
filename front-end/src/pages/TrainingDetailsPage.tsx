import { useEffect, useLayoutEffect, useState } from 'react';
import {
  getTrainingById,
  deleteTraining,
} from '../services/trainingPageService';
import { useNavigate, useParams } from 'react-router-dom';
import Training from '../types/Training';
import { Exercise, basicTypes } from '../types/Exercise';
import {
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { CheckboxUserCardsList } from '../components/CheckboxUserCardsList/CheckboxUserCardsList';
import { User } from '../types/User';
import { ExercisesList } from '../components/ExercisesList/ExercisesList';
import { useDisclosure } from '@mantine/hooks';
import notification from '../utils/notification';
import {
  createOrUpdateUserExercise,
  deleteExercisesOnTraining,
  getUserTrainingExercises,
} from '../services/exerciseService';
import Loader from '../components/ui/Loader/Loader';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { useTranslation } from 'react-i18next';
import DeleteButton from '../components/ui/DeleteButton';
import { formatDate } from '../utils/formatDate';
import { useAuthContext } from '../context/AuthContext';
import { AxiosError } from 'axios';
import TopScrollButton from '../components/ui/TopScrollButton';

export const TrainingDetailsPage = () => {
  const { trainingId } = useParams();

  const { t } = useTranslation();

  const { user } = useAuthContext();

  const [userData, setUserData] = useState<User[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training>();
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [exerciseLoading, setExerciseLoading] = useState(false);

  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const training = await getTrainingById(trainingId as string);

    setSelectedTraining(training);
    setUserData(training.userIds);
    setExerciseData(training.exercisesIds);
  };

  useLayoutEffect(() => {
    fetchUserData();
  }, [trainingId]);

  const fetchTrainingData = async () => {
    setPageLoading(true);
    const training = await getTrainingById(trainingId as string);

    setSelectedTraining(training);
    setUserData(training.userIds);
    setExerciseData(training.exercisesIds);

    setPageLoading(false);
  };

  useLayoutEffect(() => {
    fetchTrainingData();
  }, [trainingId]);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleSelectUser = (userId: string) => {
    if (selectedUser === userId) {
      setSelectedUser(null);
      return;
    }

    setSelectedUser(userId);
  };

  const fetchUserExercises = async () => {
    setExerciseLoading(true);

    const exercisesNames = selectedTraining?.exercisesIds.map(
      (exercise) => exercise.name,
    );

    try {
      const userExercises = await getUserTrainingExercises(
        selectedUser as string,
        trainingId as string,
        exercisesNames as string[],
      );

      if (userExercises.length > 0) {
        let exercises: Exercise[] = [];

        if (selectedTraining) {
          exercises = selectedTraining.exercisesIds.map((item) => {
            const findedUserExercise = userExercises.find(
              (userItem) => item.name === userItem.name,
            );

            if (findedUserExercise) {
              return findedUserExercise;
            }

            return item;
          });
        }

        setExerciseData(exercises);
      } else {
        setExerciseData(selectedTraining?.exercisesIds as Exercise[]);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setExerciseLoading(false);
    }
  };

  const handleDeleteTrainingWrapper = async () => {
    await handleDeleteTraining(
      trainingId as string,
      setDeleteLoading,
      closeDelete,
    );
  };

  const handleDeleteTraining = async (
    trainingId: string,
    setDeleteLoading: (value: boolean) => void,
    closeDelete: () => void,
  ) => {
    setDeleteLoading(true);
    try {
      const exerciseNames = exerciseData.map((exercise) => exercise.name);
      await deleteExercisesOnTraining(exerciseNames, trainingId as string);
      await deleteTraining(trainingId as string);
      notification({
        type: 'success',
        message: t('TrainingDetailsPage.deleted'),
      });
      fetchUserData();
    } catch (error) {
      notification({
        type: 'error',
        message: t('TrainingDetailsPage.cannotDelete'),
      });
    } finally {
      setDeleteLoading(false);
      closeDelete();
      navigate('/trainings');
    }
  };

  const handleCreateExercise = async (values: Exercise) => {
    const userExercise = {
      ...values,
      userId: selectedUser as string,
      trainingId: trainingId,
    };

    delete userExercise._id;

    try {
      await createOrUpdateUserExercise(userExercise);
    } catch (error) {
      if (error instanceof AxiosError) {
        notification({
          type: 'error',
          message: error.response?.data.error,
        });
      }
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchUserExercises();
      return;
    }

    setExerciseData(selectedTraining?.exercisesIds as Exercise[]);
  }, [selectedUser]);

  const sectionProps = {
    fluid: true,
    w: '100%',
    my: 'md',
  };

  let workoutTypes: string[] = [];
  if (exerciseData) {
    workoutTypes = [
      ...new Set(
        basicTypes.concat(
          exerciseData.map((exercise: Exercise) => exercise.type),
        ),
      ),
    ];
  } else {
    workoutTypes = [];
  }

  let formattedDate = null;
  if (selectedTraining && selectedTraining.createdAt) {
    const dateObject = new Date(selectedTraining.createdAt);
    if (!isNaN(dateObject.getTime())) {
      formattedDate = formatDate(dateObject);
    }
  }

  return (
    <>
      {pageLoading ? (
        <Center h="80vh">
          <Loader />
        </Center>
      ) : (
        <>
          <ConfirmModal
            text={t('TrainingDetailsPage.areYouSure')}
            buttonText={t('confirmModal.Delete')}
            opened={openedDelete}
            close={closeDelete}
            loading={deleteLoading}
            confirmedAction={handleDeleteTrainingWrapper}
          />

          <Container {...sectionProps} mt={0} p={0}>
            <Flex justify="space-between" align="center">
              <Title order={1}>
                {selectedTraining?.isFinished
                  ? t('TrainingDetailsPage.TrainingDetails', {
                    training: selectedTraining?.name,
                  })
                  : selectedTraining?.name}
              </Title>
              {selectedTraining?.isFinished &&
                user?._id === selectedTraining?.trainerId && (
                <Flex style={{ flex: '0 0 auto' }}>
                  <DeleteButton
                    openDelete={openDelete}
                    deleteLoading={deleteLoading}
                  />
                </Flex>
              )}
            </Flex>
            <Divider my="md" />

            {formattedDate && (
              <Group>
                <Text fw="600" fz="md">
                  {t('TrainingDetailsPage.Date')}: {formattedDate}
                </Text>
              </Group>
            )}

            <Container mt="10px" p="0">
              <Flex align="center" justify="space-between">
                <Title order={2}>
                  {t('trainingCreationPage.clientSectionTitle')}
                </Title>
              </Flex>

              {userData.length > 0 ? (
                <CheckboxUserCardsList
                  users={userData}
                  selectedUser={selectedUser}
                  handleSelectUser={handleSelectUser}
                />
              ) : (
                <Text mih="100px" fz="lg" ta="center">
                  {t('trainingCreationPage.noUsersFound')}
                </Text>
              )}
            </Container>

            <Container mt="10px" p="0">
              <Flex align="center" justify="space-between">
                <Title order={2}>
                  {t('trainingCreationPage.exerciseSectionTitle')}
                </Title>
              </Flex>

              <ExercisesList
                variant="user"
                exercises={exerciseData}
                workoutTypes={workoutTypes as string[]}
                selectedUser={selectedUser}
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                createExercise={handleCreateExercise}
                disabled={true}
                isEditable={selectedTraining?.trainerId === user?._id}
                loading={exerciseLoading}
                skeletonCardCount={exerciseData.length}
                isFinished={selectedTraining?.isFinished}
              />
            </Container>

            <TopScrollButton />
          </Container>
        </>
      )}
    </>
  );
};
