/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useLayoutEffect, useState } from 'react';
import { UserPageHeader } from '../components/UserPageHeader/UserPageHeader';
import UserRole from '../types/UserRole';
import { useDisclosure } from '@mantine/hooks';
import { TrainingPageModal } from '../components/TrainingPageModal';
import Training from '../types/Training';
import notification from '../utils/notification';
import { User } from '../types/User';
import TrainingToSendInterface from '../types/TrainingToSendInterface';
import { TrainingsList } from '../components/TrainingsList';
import { Container, Flex, Pagination } from '@mantine/core';
import searchTraining from '../utils/searchTraining';
import usePagination from '../hooks/usePagination';
import { Exercise } from '../types/Exercise';
import { getAllExercises } from '../services/exerciseService';
import { fetchClientsMainInfo } from '../services/userService';
import {
  createTraining,
  getAllTrainings,
} from '../services/trainingPageService';
import { sectionProps } from '../styles/styleProps';
import { useNavigate } from 'react-router-dom';
import { useFilterContext } from '../context/FilterContext';
import { useAuthContext } from '../context/AuthContext';
import UserFilter from '../types/UserFilter';
import { useTranslation } from 'react-i18next';
import TopScrollButton from '../components/ui/TopScrollButton';

/**
 * @function TrainingPage
 * @description This component of page is used to show training page. It shows all trainings, and here it can be created new training.
 * @see {@link UserPageHeader} component
 * @see {@link TrainingPageModal} component
 * @see {@link TrainigsList} component
 * @see {@link Loader} component
 * @see {@link Pagination} component
 * @returns TrainingPage component
 */
export const TrainingPage = () => {
  const { user } = useAuthContext();

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [usersLoading, setUsersLoading] = useState(true);
  const [exercisesLoading, setExercisesLoading] = useState(true);
  const [trainingsLoading, setTrainingsLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  const { searchValue, setSearchValue, selectedFilter, setSelectedFilter } =
    useFilterContext();

  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  const filteredTrainings = searchTraining(
    trainings,
    searchValue,
    dateValue[0],
    dateValue[1],
  ) as Training[];

  const [visibleTrainings, setVisibleTrainings] = useState<Training[]>([]);

  const {
    currentPage,
    currentItems: currentTrainings,
    totalPages,
    handleChangePage,
    setCurrentPage,
  } = usePagination(visibleTrainings, searchValue);

  const clearFilters = () => {
    setSelectedFilter(UserFilter.OwnTrainigns);
    setSearchValue('');
  };

  useEffect(() => {
    clearFilters();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, filteredTrainings]);
  // #region Handlers
  /**
   * @description Fetches all users, exercises and trainings.
   * @see {@link fetchClientsMainInfo} function from userService
   * @see {@link notification} component from utils
   * @returns void - sets users, exercises, trainings states
   * @throws error notification - if fetching users, exercises or trainings is not successful
   */
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const users = await fetchClientsMainInfo();
      setUsers(users);
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CanNotFetchUsers'),
      });
    } finally {
      setUsersLoading(false);
    }
  };

  /**
   * @description Fetches all exercises.
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
   * @description Fetches all trainings.
   * @see {@link getAllTrainins} function from trainingPageService
   * @see {@link notification} component from utils
   * @returns void - sets trainings state
   * @throws error notification - if fetching trainings is not successful
   */
  const fetchTrainings = async () => {
    setTrainingsLoading(true);
    try {
      const allTrainings = await getAllTrainings();

      setTrainings(allTrainings);
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CanNotFetchTrainings'),
      });
    } finally {
      setTrainingsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
    fetchUsers();
    fetchExercises();
  }, []);

  /**
   * @description Creates new training. Sets loading state. If training is created successfully, shows success notification, navigates to training creation page and closes modal.
   * @param {string} name - name of training
   * @param {string[]} userIds - array of user ids
   * @param {string[]} exercisesIds - array of exercises ids
   * @see {@link createTraining} function from trainingPageService
   * @see {@link notification} function from utils
   * @returns void - creates training
   * @throws error notification - if creating training is not successful
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
      trainerId: user?._id as string,
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
      notification({
        type: 'error',
        message: t('notification.CannotCreateTraining'),
      });
    } finally {
      setModalLoading(false);
    }
  };
  // #endregion

  useLayoutEffect(() => {
    let filtered: Training[] = [];

    switch (selectedFilter) {
      case UserFilter.OwnTrainigns:
        filtered = filteredTrainings.filter(
          (training) => training?.trainerId?._id === user?._id,
        );
        if (dateValue[0] && dateValue[1]) {
          filtered = filtered.filter((training) => {
            const trainingDate = training.createdAt
              ? new Date(training.createdAt)
              : null;

            return (
              trainingDate !== null &&
              trainingDate >= dateValue[0]! &&
              trainingDate <= dateValue[1]!
            );
          });
        }
        break;
      case UserFilter.AllTrainigns:
        filtered = filteredTrainings;
        if (dateValue[0] && dateValue[1]) {
          filtered = filtered.filter((training) => {
            const trainingDate = training.createdAt
              ? new Date(training.createdAt)
              : null;

            return (
              trainingDate !== null &&
              trainingDate >= dateValue[0]! &&
              trainingDate <= dateValue[1]!
            );
          });
        }
        break;
    }

    setVisibleTrainings(filtered);
    setCurrentPage(1);
  }, [selectedFilter, searchValue, trainings, dateValue]);

  const isLoading = trainingsLoading || usersLoading || exercisesLoading;

  return (
    <>
      <TrainingPageModal
        onCreate={handleCreateTraining}
        opened={opened}
        close={close}
        users={users}
        exercises={exercises}
        title={t('trainingPage.create')}
        loading={modalLoading}
      />

      <Container size="responsive" maw="1440px" p={0}>
        <UserPageHeader
          sectionProps={sectionProps}
          selectedDates={dateValue}
          setSelectedDates={setDateValue}
          open={open}
          userRole={UserRole.Trainer}
          pageTitle={t('trainingPage.title')}
          buttonTitle={t('trainingPage.create')}
          loading={isLoading}
        />
        <Container {...sectionProps} p={0}>
          <Flex direction="column" align="center" gap="md">
            <TrainingsList
              visibleTrainings={currentTrainings}
              loading={isLoading}
            />

            <Pagination
              value={currentPage}
              total={totalPages}
              onChange={handleChangePage}
              boundaries={1}
              siblings={1}
              mb={50}
              mx={0}
              gap={5}
            />
          </Flex>
        </Container>
        <TopScrollButton />
      </Container>
    </>
  );
};
