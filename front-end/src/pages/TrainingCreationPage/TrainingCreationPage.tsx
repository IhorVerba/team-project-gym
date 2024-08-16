import { useEffect, useLayoutEffect, useState } from 'react';
import {
  getTrainingById,
  updateTraining,
} from '../../services/trainingPageService';
import { useNavigate, useParams } from 'react-router-dom';
import Training from '../../types/Training';
import { Exercise, basicTypes } from '../../types/Exercise';
import { Button, Center, Container, Flex, Text, Title } from '@mantine/core';
import { CheckboxUserCardsList } from '../../components/CheckboxUserCardsList/CheckboxUserCardsList';
import { User } from '../../types/User';
import { ExercisesList } from '../../components/ExercisesList/ExercisesList';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import notification from '../../utils/notification';
import {
  createOrUpdateUserExercise,
  deleteExercisesOnTraining,
  deleteUsersTrainingExercises,
  getUserTrainingExercises,
} from '../../services/exerciseService';
import { AxiosError } from 'axios';
import TrainingToSendInterface from '../../types/TrainingToSendInterface';
import { TrainingCreationUsersModal } from '../../components/TrainingCreationUsersModal/TrainingCreationUsersModal';
import { TrainingCreationExerciseModal } from '../../components/TrainingCreationExerciseModal/TrainingCreationExerciseModal';
import { IconUserCog } from '@tabler/icons-react';
import { IconReplace } from '@tabler/icons-react';
import {
  buttonProps,
  iconButtonProps,
  sectionProps,
} from '../../styles/styleProps';
import Loader from '../../components/ui/Loader/Loader';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { useTranslation } from 'react-i18next';
import TopScrollButton from '../../components/ui/TopScrollButton';

/**
 * @function TrainingCreationPage
 * @description This component of page is used to show training creation page. It's used to create new training for user or group of users. Here we can also add or delete exercises from training. And edit or finish training.
 * @returns TrainingCreationPage component
 */
export const TrainingCreationPage = () => {
  const { trainingId } = useParams();

  const { t } = useTranslation();

  const [userData, setUserData] = useState<User[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training>();
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const isMobile = useMediaQuery('(width < 768px)');

  const navigate = useNavigate();

  /**
   * @description Fetches training data by id. If training is finished, it redirects to training page.
   * @see {@link getTrainingById} function from trainingPageService
   * @see {@link notification} component from utils
   * @returns void - sets selected training state, user data and exercise data, sets page loading state
   */
  const fetchTrainingData = async () => {
    setPageLoading(true);
    const training = await getTrainingById(trainingId as string);

    setSelectedTraining(training);
    setUserData(training.userIds);
    setExerciseData(training.exercisesIds);

    setPageLoading(false);
  };

  useEffect(() => {
    fetchTrainingData();
  }, [trainingId]);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  /**
   * @description Handles select user. If user is already selected, it deselects it.
   * @param {string} userId - user id
   * @returns void - sets selected user state
   */
  const handleSelectUser = (userId: string) => {
    if (selectedUser === userId) {
      setSelectedUser(null);
      return;
    }

    setSelectedUser(userId);
  };

  const [UserModalLoading, setUserModalLoading] = useState(false);
  const [UserModalOpened, { open: openUserModal, close: closeUserModal }] =
    useDisclosure(false);

  const [ExerciseModalLoading, setExerciseModalLoading] = useState(false);
  const [
    ExerciseModalOpened,
    { open: openExerciseModal, close: closeExerciseModal },
  ] = useDisclosure(false);

  const [confirmModalLoading, setConfirmLoading] = useState(false);
  const [
    ConfirmModalOpened,
    { open: openConfirmModal, close: closeConfirmModal },
  ] = useDisclosure(false);

  // #region Handlers
  /**
   * @description Handles create exercise. Creates new exercise for user.
   * @param {Exercise} values - exercise to create (name, type, sets, reps, weight, rest)
   * @see {@link createOrUpdateUserExercise} function from exerciseService
   * @see {@link notification} component from utils
   * @returns void - creates exercise
   * @throws error notification - if creating exercise is not successful
   */
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

  /**
   * @description Fetches user exercises. Fetches exercises for selected user.
   * @see {@link getUserTrainingExercises} function from exerciseService
   * @returns void - sets exercise data state
   * @throws error in console if fetching user exercises is not successful
   */
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

  const handleFinishTrainingWrapper = async () => {
    await handleUpdateTraining({ isFinished: true });
  };

  /**
   * @description Handles update training. Updates training with new data.
   * @param {string[]} newUserIds - new user ids
   * @param {string[]} newExercisesIds - new exercises ids
   * @param {boolean} isFinished - is training finished
   * @see {@link deleteUsersTrainingExercises} function from exerciseService
   * @see {@link deleteExercisesOnTraining} function from exerciseService
   * @see {@link updateTraining} function from trainingPageService
   * @see {@link notification} function from utils
   * @returns void - updates training
   * @throws error notification - if updating training is not successful
   */
  const handleUpdateTraining = async ({
    newUserIds,
    newExercisesIds,
    isFinished,
  }: {
    newUserIds?: string[];
    newExercisesIds?: string[];
    isFinished?: boolean;
  }) => {
    setUserModalLoading(true);
    setExerciseModalLoading(true);
    setConfirmLoading(true);

    if (!selectedTraining) {
      return;
    }

    let trainingToUpdate = {};
    let removedUsers: string[] = [];
    let removedExercises: string[] = [];

    if (isFinished) {
      trainingToUpdate = {
        ...selectedTraining,
        isFinished,
      };
      navigate(`/trainings/${trainingId}`, { replace: true });
    }

    if (newUserIds) {
      trainingToUpdate = {
        ...selectedTraining,
        userIds: newUserIds,
      };

      removedUsers = userData
        .filter((user) => !newUserIds.includes(user._id as string))
        .map((item) => item._id) as string[];
    }

    if (newExercisesIds) {
      trainingToUpdate = {
        ...selectedTraining,
        userIds: userData.map((user) => user._id as string),
        exercisesIds: newExercisesIds,
      };

      removedExercises = exerciseData
        .filter((exercise) => !newExercisesIds.includes(exercise._id as string))
        .map((item) => item.name) as string[];
    }

    try {
      if (removedUsers.length > 0) {
        await deleteUsersTrainingExercises(
          removedUsers as string[],
          trainingId as string,
        );
      }

      if (removedExercises.length > 0) {
        await deleteExercisesOnTraining(removedExercises, trainingId as string);
      }

      await updateTraining(
        trainingToUpdate as TrainingToSendInterface,
        trainingId as string,
      );

      notification({
        type: 'success',
        message: t('trainingCreationPage.updated'),
      });
      closeUserModal();
      closeExerciseModal();
      closeConfirmModal();

      fetchTrainingData();
      setSelectedUser(null);
    } catch (error) {
      notification({
        type: 'error',
        message: t('trainingCreationPage.cannotUpdate'),
      });
    } finally {
      setUserModalLoading(false);
      setExerciseModalLoading(false);
      setConfirmLoading(false);
    }
  };
  // #endregion

  useLayoutEffect(() => {
    if (selectedUser) {
      fetchUserExercises();

      return;
    }

    setExerciseData(selectedTraining?.exercisesIds as Exercise[]);
  }, [selectedUser]);

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

  const handleExerciseModalOpen = () => {
    setSelectedUser(null);
    openExerciseModal();
  };

  return (
    <>
      {pageLoading ? (
        <Center h="80vh">
          <Loader />
        </Center>
      ) : (
        <>
          <TrainingCreationUsersModal
            onSubmit={handleUpdateTraining}
            opened={UserModalOpened}
            close={closeUserModal}
            defaultValues={selectedTraining as Training}
            title={t('trainingCreationUsersModal.modalTitle')}
            loading={UserModalLoading}
          />

          <TrainingCreationExerciseModal
            onSubmit={handleUpdateTraining}
            opened={ExerciseModalOpened}
            close={closeExerciseModal}
            defaultValues={selectedTraining as Training}
            title={t('trainingCreationExerciseModal.modalTitle')}
            loading={ExerciseModalLoading}
          />

          <Container {...sectionProps} mt={0} p={0}>
            <Title ta="center" order={1} fz="28px">
              {selectedTraining?.name}
            </Title>

            <Container mt="20px" p={0}>
              <Flex align="center" justify="space-between">
                <Title order={2}>
                  {t('trainingCreationPage.clientSectionTitle')}
                </Title>

                {isMobile ? (
                  <Button onClick={openUserModal} {...iconButtonProps}>
                    <IconUserCog />
                  </Button>
                ) : (
                  <Button onClick={openUserModal} {...buttonProps} w={'auto'}>
                    {t('trainingCreationPage.changeUsersBtn')}
                  </Button>
                )}
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

            <Container mt="20px" p={0}>
              <Flex align="center" justify="space-between">
                <Title order={2}>
                  {t('trainingCreationPage.exerciseSectionTitle')}
                </Title>

                {isMobile ? (
                  <Button
                    onClick={handleExerciseModalOpen}
                    {...iconButtonProps}
                  >
                    <IconReplace />
                  </Button>
                ) : (
                  <Button
                    onClick={handleExerciseModalOpen}
                    {...buttonProps}
                    w={'auto'}
                  >
                    {t('trainingCreationPage.changeExercisesBtn')}
                  </Button>
                )}
              </Flex>

              <ExercisesList
                variant="user"
                exercises={exerciseData}
                workoutTypes={workoutTypes as string[]}
                createExercise={handleCreateExercise}
                selectedUser={selectedUser}
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                loading={exerciseLoading}
                skeletonCardCount={exerciseData.length}
                handleUpdateTraining={handleUpdateTraining}
                isEditable={false}
              />
            </Container>

            <Center>
              <Button
                {...buttonProps}
                mt="lg"
                onClick={openConfirmModal}
                w={'auto'}
              >
                {t('trainingCreationPage.finishTrainingBtn')}
              </Button>
            </Center>

            <TopScrollButton />
          </Container>

          <ConfirmModal
            text={t('trainingCreationPage.confirmModalTitle')}
            buttonText={t('trainingCreationPage.confirmModalBtn')}
            opened={ConfirmModalOpened}
            close={closeConfirmModal}
            loading={confirmModalLoading}
            confirmedAction={handleFinishTrainingWrapper}
          />
        </>
      )}
    </>
  );
};
