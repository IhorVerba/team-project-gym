import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  deleteExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
} from '../../services/exerciseService';
import { Exercise, basicTypes } from '../../types/Exercise';
import { Card } from '../../components/ExerciseDetailsCard/ExerciseDetailsCard';
import notification from '../../utils/notification';
import { AxiosError } from 'axios';
import { Center, Container, Divider, Flex, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader/Loader';
import NoResults from '../../components/ui/NoResults/NoResults';
import { useTranslation } from 'react-i18next';

/**
 * @function ExerciseDetailsPage
 * @description This component of page is used to show exercise details. It shows all details of exercise, and here it can updated or deleted.
 * @see {@link Card} component
 * @see {@link Loader} component
 * @see {@link NoResults} component
 * @returns ExerciseDetailsPage component
 */
export const ExerciseDetailsPage = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  /**
   * @description Fetches exercise by id.
   * @param {string} exerciseId - exercise id
   * @see {@link getExerciseById} function from exerciseService
   * @returns void - sets one exercise state
   * @throws error in console if fetching exercise is not successful
   */
  const fetchExercise = async (exerciseId: string) => {
    setIsLoading(true);
    try {
      const fetchedExercise = await getExerciseById(exerciseId);
      setExercise(fetchedExercise);
    } catch (error) {
      console.error('Error fetching exercise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @description Fetches all exercises.
   * @see {@link getAllExercises} function from exerciseService
   * @returns void - sets exercises state
   */
  const fetchExercises = async () => {
    const exercises = await getAllExercises();
    if (exercises) setExercises(exercises);
  };

  useEffect(() => {
    if (id) {
      fetchExercise(id);
      fetchExercises();
    }
  }, [id]);

  const workoutTypes = [
    ...new Set(
      basicTypes.concat(exercises.map((exercise: Exercise) => exercise.type)),
    ),
  ];

  /**
   * @description Updates exercise.
   * @param {string} _id - exercise id
   * @param {Exercise} values - exercise values from form which will be used to update exercise
   * @param setModalLoading - function to set loading state of modal
   * @param close - function to close modal
   * @see {@link notification} component from utils
   * @see {@link updateExercise} function from exerciseService
   * @see {@link fetchExercise} function from this component
   * @returns void - updates exercise
   * @throws error notification - if updating exercise is not successful
   */
  const handleUpdateExercise = async (
    _id: string,
    values: Exercise,
    setModalLoading: (value: boolean) => void,
    close: () => void,
  ) => {
    const exercise = {
      ...values,
      _id,
    };

    setModalLoading(true);
    try {
      await updateExercise(exercise);
      notification({
        type: 'success',
        message: t('exerciseDetailsPage.updated'),
      });
      fetchExercise(exercise._id);
      close();
    } catch (error) {
      if (error instanceof AxiosError) {
        notification({
          type: 'error',
          message: error.response?.data.error,
        });
      }
    } finally {
      setModalLoading(false);
    }
  };

  /**
   * @description Deletes exercise.
   * @param {string | undefined} id - exercise id
   * @param setDeleteLoading - function to set loading state of delete modal
   * @param closeDelete - function to close delete modal
   * @see {@link notification} function from utils
   * @see {@link deleteExercise} function from exerciseService
   * @see {@link fetchExercise} function from this component
   * @returns void - deletes exercise
   * @throws error notification - if deleting exercise is not successful
   */
  const handleDeleteExercise = async (
    id: string | undefined,
    setDeleteLoading: (value: boolean) => void,
    closeDelete: () => void,
  ) => {
    setDeleteLoading(true);
    try {
      await deleteExercise(id as string);
      notification({
        type: 'success',
        message: t('exerciseDetailsPage.deleted'),
      });
      fetchExercise(id as string);
      closeDelete();
    } catch (error) {
      if (error instanceof AxiosError) {
        notification({
          type: 'error',
          message: error.response?.data.error,
        });
      }
    } finally {
      setDeleteLoading(false);
      navigate('/exercises');
    }
  };

  if (isLoading) {
    return (
      <Center h="80vh">
        <Loader />
      </Center>
    );
  }

  if (!exercise) {
    return (
      <Center h="80vh">
        <NoResults text={t('exerciseDetailsPage.notFound')} />
      </Center>
    );
  }

  return (
    <Container size="responsive" maw="1440px">
      <Flex
        mx="lg"
        direction={{ base: 'column', md: 'column', lg: 'row' }}
        justify="space-between"
        align="center"
      >
        <Title order={1}>
          {t('exerciseDetailsPage.title', { name: exercise.name })}
        </Title>
      </Flex>
      <Divider my="md" />
      <Card
        exercise={exercise}
        workoutTypes={workoutTypes}
        updateExercise={handleUpdateExercise}
        deleteExercise={handleDeleteExercise}
      />
    </Container>
  );
};
