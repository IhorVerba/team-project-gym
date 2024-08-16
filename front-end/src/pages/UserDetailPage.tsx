import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Stack,
  Title,
  Text,
  Flex,
  Center,
  Pagination,
  rem,
  Group,
  Container,
  UnstyledButton,
  Button,
} from '@mantine/core';
import {
  addClientTrainer,
  fetchUserDetail,
  getUserTraining,
  removeClientTrainer,
} from '../services/userDetailPageService';
import { User } from '../types/User';
import { useDisclosure } from '@mantine/hooks';
import Training from '../types/Training';
import usePagination from '../hooks/usePagination';
import UserDetailsList from '../components/UserDetailList';
import { IconDots } from '@tabler/icons-react';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { UserPageModal } from '../components/UserPageModal';
import InitialsAvatar from '../components/ui/Avatar';
import notification from '../utils/notification';
import { AxiosError } from 'axios';
import UserRole from '../types/UserRole';
import { activateUser, disableUser, updateUser } from '../services/userService';
import TrainerModal from '../components/TrainerModal';
import { useAuthContext } from '../context/AuthContext';
import MobileCreateButton from '../components/ui/MobileCreateButton';
import { TrainingPageModal } from '../components/TrainingPageModal';
import TrainingToSendInterface from '../types/TrainingToSendInterface';
import { createTraining } from '../services/trainingPageService';
import { getAllExercises } from '../services/exerciseService';
import { Exercise } from '../types/Exercise';
import Loader from '../components/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
import DeleteButton from '../components/ui/DeleteButton';
import { buttonProps } from '../styles/styleProps';
import TopScrollButton from '../components/ui/TopScrollButton';
import UserStatus from '../types/UserStatus';
import ActivateButton from '../components/ui/ActivateButton';
import NoResults from '../components/ui/NoResults/NoResults';
import ClientStatistics from '../components/ClientStatistics/ClientStatistics';
import LatestExerciseResults from '../components/LatestExerciseResults/LatestExerciseResults';

/**
 * @abstract interface {@link TrainerUserInterface} - interface for user data with trainerIds or userIds
 * @extends Omit<User, 'trainerIds' | 'userIds'> - omit trainerIds and userIds from User interface
 * @property {User[]} trainerIds - array of trainers
 * @property {User[]} userIds - array of users
 * @see {@link User} interface
 * @see {@link Omit} utility type
 */
interface TrainerUserInterface extends Omit<User, 'trainerIds' | 'userIds'> {
  trainerIds?: User[];
  userIds?: User[];
}

/**
 * @function UserDetailPage
 * @description This component of page is used to show user detail page. It's used to show user details, trainings, trainers, clients and create new training.
 * @see {@link UserDetailsList} component
 * @see {@link ConfirmModal} component
 * @see {@link UserPageModal} component
 * @see {@link InitialsAvatar} component
 * @see {@link TrainerModal} component
 * @see {@link MobileCreateButton} component
 * @see {@link TrainingPageModal} component
 * @returns UserDetailPage component
 */
const UserDetailPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user: LoggedUser } = useAuthContext();
  const { userId } = useParams();
  const [userData, setUserData] = useState<TrainerUserInterface>();
  const [trainings, setTrainings] = useState<Training[]>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState(false);

  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [trainers, setTrainers] = useState<User[] | undefined>(
    userData?.trainerIds,
  );
  const [clients, setClients] = useState<User[] | undefined>(userData?.userIds);
  const [selectedTrainer, setSelectedTrainer] = useState<User>();

  const [opened, { open, close }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
    useDisclosure(false);
  const [
    openedCreateTraining,
    { open: openCreateTraining, close: closeCreateTraining },
  ] = useDisclosure(false);

  const [openedAssign, { open: openAssign, close: closeAssign }] =
    useDisclosure(false);

  const [modalLoading, setModalLoading] = useState(false);

  // #region Handlers
  /**
   * @description Handles creating new training. Sets modal loading state. Creates new training with given data. Shows notification if training is created successfully or not.
   * @param {string} name - name of training
   * @param {string[]} userIds - array of usersIds
   * @param {string[]} exercisesIds - array of exercisesIds
   * @see {@link createTraining} function from trainingPageService
   * @see {@link notification} component from utils
   * @returns void - sets modal loading state
   * @throws error notification - if cannot create training
   */
  const handleCreateTraining = async ({
    name,
    userIds,
    exercisesIds,
  }: TrainingToSendInterface) => {
    setModalLoading(true);

    const newTraining = {
      name,
      userIds,
      exercisesIds,
      trainerId: LoggedUser?._id,
    };

    try {
      const training = await createTraining(newTraining);

      notification({
        type: 'success',
        message: t('notification.TrainingSuccessfullyCreated'),
      });
      navigate(`/training-creation/${training._id}`);
      close();
    } catch (error) {
      console.log(error);

      notification({
        type: 'error',
        message: t('notification.CannotCreateTraining'),
      });
    } finally {
      setModalLoading(false);
    }
  };

  /**
   * @description Fetches all exercises and sets exercises state.
   * @see {@link getAllExercises} function from exerciseService
   * @see {@link notification} component from utils
   * @returns void - sets exercises state
   * @throws error notification - if fetching exercises is not successful
   */
  const fetchExercises = async () => {
    setExercisesLoading(true);

    try {
      const allExercises = await getAllExercises();

      setExercises(allExercises);
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CanNotFetchExercises'),
      });
    } finally {
      setExercisesLoading(false);
    }
  };

  /**
   * @description Fetches user data and training data. Sets data loading state.
   * @see {@link fetchUserDetail} function from userDetailPageService
   * @see {@link getUserTraining} function from userDetailPageService
   * @see {@link notification} function from utils
   * @returns void - sets user data and training data
   * @throws error notification - if fetching user data is not successful
   */
  const fetchUserData = async () => {
    setDataIsLoading(true);
    if (userId) {
      try {
        const userData = await fetchUserDetail(userId);
        const trainingData = await getUserTraining(userId);
        if (!userData || !trainingData)
          throw new AxiosError('Server error happened!');

        setUserData(userData);
        setTrainings(trainingData);
      } catch (error) {
        navigate('..');
        notification({
          type: 'error',
          message: t('notification.CanNotFetchUser'),
        });
      }
    }
    setDataIsLoading(false);
  };

  /**
   * @description Handles updating user. Creates new user object with given data. Updates user with given data. Shows notification if user is updated successfully or not.
   * @param {string} _id - id of user whom we want to update
   * @param {User} user - user object with email, firstName, lastName, role and phoneNumber which are used to update user
   * @param _ - function to set loading state (empty because it's not used)
   * @param closeUpdate - function to close update modal
   * @see {@link updateUser} function from userService
   * @see {@link fetchUserData} function from this component
   * @see {@link notification} component from utils
   * @returns void - updates user
   * @throws error notification - if updating user is not successful
   */
  const handleUpdateUser = async (
    _id: string,
    user: User,
    _: (value: boolean) => void,
    closeUpdate: () => void,
  ) => {
    const newUser = {
      ...user,
      _id,
    };

    const { email, firstName, lastName, role, phoneNumber } = newUser;

    const userToUpdate = {
      email,
      firstName,
      lastName,
      role,
      phoneNumber,
    };

    try {
      await updateUser(userToUpdate, _id as string);
      closeUpdate();

      fetchUserData();
      notification({
        type: 'success',
        message: t('notification.UserSuccessfullyUpdated'),
      });
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CannotUpdateUser'),
      });
    }
  };

  /**
   * @description Handles disabling user. Sets delete loading state. Disables user with given id. Shows notification if user is disabled successfully or not.
   * @param {string} _id - id of user whom we want to disable
   * @param setDeleteLoading - function to set delete loading state
   * @param closeDelete - function to close delete modal
   * @param {UserRole | undefined} role - role of user whom we want to disable
   * @see {@link disableUser} function from userService
   * @see {@link notification} component from utils
   * @returns void - disables user
   * @throws error notification - if disabling user is not successful
   */
  const handleDisableUser = async (
    _id: string,
    setDeleteLoading: (value: boolean) => void,
    closeDelete: () => void,
    role: UserRole | undefined,
  ) => {
    setDeleteLoading(true);

    try {
      await disableUser(_id as string, role as UserRole);
      notification({
        type: 'success',
        message: t('notification.UserSuccessfullyDisabled'),
      });
      closeDelete();
      navigate('..');
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CanNotDisableUser'),
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDisableUserWrapper = async () => {
    await handleDisableUser(
      userData?._id as string,
      setDataIsLoading,
      closeDelete,
      userData?.role,
    );
  };

  const handleActivateUser = async (
    _id: string,
    setDeleteLoading: (value: boolean) => void,
    closeDelete: () => void,
    role: UserRole | undefined,
  ) => {
    setDeleteLoading(true);

    try {
      await activateUser(_id as string, role as UserRole);
      notification({
        type: 'success',
        message: t('notification.UserSuccessfullyActivated'),
      });
      closeDelete();
      navigate('..');
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CanNotActivateUser'),
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleActivateUserWrapper = async () => {
    await handleActivateUser(
      userData?._id as string,
      setDataIsLoading,
      closeDelete,
      userData?.role,
    );
  };

  const {
    currentPage: currentTrainingPage,
    currentItems: currentTrainings,
    totalPages: totalTrainingPages,
    handleChangePage: handleChangeTrainingPage,
  } = usePagination(trainings ? trainings : []);

  const {
    currentPage: currentClientPage,
    currentItems: currentClients,
    totalPages: totalClientPages,
    handleChangePage: handleChangeClientPage,
  } = usePagination(clients ? clients : []);

  const {
    currentPage: currentTrainerPage,
    currentItems: currentTrainers,
    totalPages: totalTrainerPages,
    handleChangePage: handleChangeTrainerPage,
  } = usePagination(trainers ? trainers : []);

  useEffect(() => {
    fetchUserData();
    fetchExercises();
    handleChangeClientPage(1);
    handleChangeTrainingPage(1);
    handleChangeTrainerPage(1);
  }, []);

  useEffect(() => {
    setTrainers(userData?.trainerIds);
    setClients(userData?.userIds);
    handleChangeTrainerPage(1);
  }, [userData]);

  const [isClientAssigning, setIsClientAssigning] = useState(false);
  const becomeTrainer = async () => {
    if (LoggedUser?.role !== UserRole.Trainer) {
      return;
    }

    setIsClientAssigning(true);

    try {
      const clientId = userData?._id as string;
      await addClientTrainer(clientId);
      await fetchUserData();
    } catch {
      notification({
        message: t('userDetailsPage.You can not become trainer'),
        type: 'error',
      });
    } finally {
      closeAssign();
      setIsClientAssigning(false);
    }
  };

  const stopBeingTrainer = async () => {
    if (LoggedUser?.role !== UserRole.Trainer) {
      return;
    }

    setIsClientAssigning(true);

    try {
      const clientId = userData?._id as string;
      await removeClientTrainer(clientId);
      await fetchUserData();
    } catch (e) {
      notification({
        message: t('userDetailsPage.You can not stop being trainer'),
        type: 'error',
      });
    } finally {
      closeAssign();
      setIsClientAssigning(false);
    }
  };
  // #endregion

  if (!userData) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  const isTrainer =
    LoggedUser?.role === UserRole.Trainer &&
    trainers?.map((t) => t._id).includes(LoggedUser?._id);

  const isActive = userData?.userStatus === UserStatus.Active;

  const getTrainings = () => {
    if (LoggedUser?.role === UserRole.Trainer)
      return currentTrainings.length === 0 ? (
        <Group justify="space-between">
          <Title order={4}>{t('userDetailsPage.trainings')}</Title>
          <MobileCreateButton
            open={() => openCreateTraining()}
            buttonTitle={t('userDetailsPage.create')}
          />
        </Group>
      ) : (
        <Stack w="100%">
          <Group justify="space-between">
            <Title order={4}>{t('userDetailsPage.trainings')}</Title>
            <MobileCreateButton
              open={() => openCreateTraining()}
              buttonTitle={t('userDetailsPage.create')}
              mobileBreakPoint={430}
            />
          </Group>

          <UserDetailsList visibleItems={currentTrainings} />
          <Pagination
            value={currentTrainingPage}
            total={totalTrainingPages}
            onChange={handleChangeTrainingPage}
            boundaries={1}
            siblings={1}
            style={{ alignSelf: 'center' }}
          />
        </Stack>
      );
  };
  return (
    <>
      {dataIsLoading || exercisesLoading ? (
        <Center h="80vh">
          <Loader />
        </Center>
      ) : (
        <Container size="responsive" maw="1440px" mah="100vh" p={0}>
          <UserPageModal
            onUpdate={handleUpdateUser}
            _id={userData?._id}
            isUserActive={isActive}
            defaultModalValues={userData as User}
            opened={openedUpdate}
            close={closeUpdate}
            userRole={userData?.role as UserRole}
            text={t('userDetailsPage.updateUser')}
            isCreate={false}
            openDelete={openDelete}
            loading={dataIsLoading}
            phoneNumberIsNotRequired={true}
          />
          <TrainingPageModal
            defaultValues={{
              userIds: userData ? ([userData] as User[]) : [],
              exercisesIds: [],
              name: '',
            }}
            onCreate={handleCreateTraining}
            opened={openedCreateTraining}
            close={closeCreateTraining}
            users={userData ? [userData] : []}
            exercises={exercises}
            title={t('userDetailsPage.create')}
            loading={modalLoading}
            isPersonalTraining
          />

          <ConfirmModal
            text={
              isActive
                ? t('userDetailsPage.areYouSureDisable')
                : t('userDetailsPage.areYouSureActivate')
            }
            confirmedAction={
              isActive ? handleDisableUserWrapper : handleActivateUserWrapper
            }
            opened={openedDelete}
            close={closeDelete}
            loading={dataIsLoading}
            buttonText={
              isActive
                ? t('userDetailsPage.disable')
                : t('userDetailsPage.activate')
            }
          />

          <ConfirmModal
            text={
              isTrainer
                ? t('userDetailsPage.areYouSureDontTrain')
                : t('userDetailsPage.areYouSureBecomeTrainer')
            }
            confirmedAction={isTrainer ? stopBeingTrainer : becomeTrainer}
            opened={openedAssign}
            close={closeAssign}
            loading={isClientAssigning}
            buttonText={
              isTrainer
                ? t('userDetailsPage.dontTrain')
                : t('userDetailsPage.train')
            }
          />

          <TrainerModal
            opened={opened}
            close={close}
            trainer={selectedTrainer as User}
          />
          <Stack>
            <Flex justify="space-between">
              {LoggedUser?.role !== UserRole.Admin && (
                <Button onClick={openAssign} {...buttonProps}>
                  {isTrainer
                    ? t('userDetailsPage.DoNotTrain')
                    : t('userDetailsPage.Become trainer')}
                </Button>
              )}

              {userData?.role === UserRole.Client ? (
                <UnstyledButton
                  size="sm"
                  onClick={openUpdate}
                  className="exercise-button"
                  style={{ position: 'relative' }}
                >
                  <IconDots
                    style={{ width: rem(30), height: rem(30) }}
                    stroke={1.5}
                  />
                </UnstyledButton>
              ) : isActive ? (
                <DeleteButton
                  openDelete={openDelete}
                  deleteLoading={dataIsLoading}
                />
              ) : (
                <ActivateButton
                  openConfirm={openDelete}
                  activateLoading={dataIsLoading}
                />
              )}
            </Flex>
            <Stack align="center">
              <InitialsAvatar
                firstName={userData?.firstName}
                lastName={userData?.lastName}
                photoUrl={userData?.photoUrl}
                fontSize={20}
                size={100}
                radius={120}
              />
              <Title ta="center">
                {userData?.firstName} {userData?.lastName}
              </Title>
              <Text ta="center">{userData?.email}</Text>
              {userData?.phoneNumber && (
                <Text ta="center">{userData.phoneNumber}</Text>
              )}
            </Stack>

            {userData.role === UserRole.Client && (
              <>
                <LatestExerciseResults clientId={userId} />
                <ClientStatistics clientId={userId} />
              </>
            )}

            {getTrainings()}
            {trainers && (
              <Stack w="100%">
                <Group justify="space-between">
                  <Title order={4}>{t('userDetailsPage.trainers')} </Title>
                </Group>
                {trainers.length > 0 ? (
                  <>
                    <UserDetailsList
                      setSelectedTrainer={setSelectedTrainer}
                      visibleItems={currentTrainers}
                      open={open}
                    />
                    <Pagination
                      value={currentTrainerPage}
                      total={totalTrainerPages}
                      onChange={handleChangeTrainerPage}
                      boundaries={1}
                      siblings={1}
                      style={{ alignSelf: 'center' }}
                      mb={25}
                    />
                  </>
                ) : (
                  <Center h="30vh" style={{ overflow: 'hidden' }}>
                    <NoResults text={t('userDetailsPage.No trainers')} />
                  </Center>
                )}
              </Stack>
            )}
            {LoggedUser?.role === UserRole.Admin ? (
              currentClients && currentClients.length > 0 ? (
                <Stack w="100%">
                  <Title order={4}>Clients: </Title>
                  <UserDetailsList
                    setSelectedTrainer={setSelectedTrainer}
                    visibleItems={currentClients}
                    open={open}
                  />
                  <Pagination
                    value={currentClientPage}
                    total={totalClientPages}
                    onChange={handleChangeClientPage}
                    boundaries={1}
                    siblings={1}
                    style={{ alignSelf: 'center' }}
                    mb={70}
                    mx={0}
                    gap={5}
                  />
                </Stack>
              ) : (
                <Center h="30vh" style={{ overflow: 'hidden' }}>
                  <NoResults text={t('userDetailsPage.No clients')} />
                </Center>
              )
            ) : null}
          </Stack>
          <TopScrollButton />
        </Container>
      )}
    </>
  );
};
export default UserDetailPage;
