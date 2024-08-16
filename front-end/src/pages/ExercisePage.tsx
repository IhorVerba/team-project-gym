import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  Title,
  Button,
  Flex,
  MultiSelect,
  Divider,
  Container,
  Input,
  CloseButton,
  Popover,
  Skeleton,
} from '@mantine/core';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ExerciseModal from '../components/ExercisesModal';
import { Exercise, basicTypes } from '../types/Exercise';
import { createExercise, getAllExercises } from '../services/exerciseService';
import notification from '../utils/notification';
import { AxiosError } from 'axios';
import {
  buttonProps,
  headingElementsProps,
  sectionProps,
} from '../styles/styleProps';
import MobileCreateButton from '../components/ui/MobileCreateButton';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import usePagination from '../hooks/usePagination';
import { Pagination } from '@mantine/core';
import { ExercisesList } from '../components/ExercisesList/ExercisesList';
import { useTranslation } from 'react-i18next';
import TopScrollButton from '../components/ui/TopScrollButton';

/**
 * @function ExercisePage
 * @description This component of page is used to show exercises page. It's used to show all exercises and create new exercise.
 * @see {@link ExerciseModal} component
 * @see {@link ExercisesList} component
 * @see {@link Loader} component
 * @see {@link MobileCreateButton} component
 * @returns ExercisePage component
 */
const ExercisePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isExercisesLoading, setIsExercisesLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [enteredValue, setEnteredValue] = useState<string>('');
  const workoutTypes = [
    ...new Set(
      basicTypes.concat(exercises.map((exercise: Exercise) => exercise.type)),
    ),
  ];
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);

  const isMobile = useMediaQuery('(width <= 1000px)');

  /**
   * @description Fetches all exercises. Sets exercises state. Sets loading state.
   * @see {@link getAllExercises} function from exerciseService
   * @returns void - sets exercises state
   */
  const fetchExercises = async () => {
    setIsExercisesLoading(true);
    const exercises = await getAllExercises();
    if (exercises) setExercises(exercises);
    setIsExercisesLoading(false);
  };

  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  const {
    currentPage,
    totalPages,
    handleChangePage,
    currentItems,
    setCurrentPage,
  } = usePagination(filteredExercises, enteredValue);

  /**
   * @description Creates new exercise. Sets loading state. If exercise is created successfully, shows success notification, fetches exercises and closes modal. If exercise is not created successfully, shows error notification.
   * @param {Exercise} values - values from form - name, type, description of exercise
   * @see {@link createExercise} function from exerciseService
   * @see {@link notification} component from utils
   * @returns void - shows notification, fetches exercises, closes modal
   * @throws error notification - if exercise is not created successfully
   */
  const handleCreateExercise = async (values: Exercise) => {
    setModalLoading(true);
    try {
      const { name, type, description } = values;
      const exerciseData = { name, type, description };

      await createExercise(exerciseData);
      notification({
        type: 'success',
        message: t('exercisePage.created'),
      });
      fetchExercises();
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

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredExercises]);

  useLayoutEffect(() => {
    setFilteredExercises(
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(enteredValue.trim().toLowerCase()),
      ),
    );
    if (selectedFilter.length > 0) {
      setFilteredExercises((prevState: Exercise[]) => {
        return prevState.filter((exercise) =>
          selectedFilter
            .map((type) => type.toLowerCase())
            .includes(exercise.type.toLowerCase()),
        );
      });
    }
  }, [exercises, enteredValue, selectedFilter]);

  return (
    <>
      <ExerciseModal
        opened={opened}
        close={close}
        workoutTypes={workoutTypes}
        formAction="create"
        onCreate={handleCreateExercise}
        loading={modalLoading}
        setLoading={setModalLoading}
      />
      <Container size="responsive" maw="1440px" p={0}>
        <Flex
          gap="sm"
          direction={{
            base: 'column',
            xs: 'column',
            sm: 'row',
          }}
          align="center"
          justify="space-between"
        >
          <Title order={1}>{t('exercisePage.exercises')}</Title>
          <Flex
            direction="row"
            gap="sm"
            justify={{ sm: 'center' }}
            align="center"
            w={{ base: '100%', sm: 'auto' }}
          >
            {!isExercisesLoading ? (
              <Input
                placeholder={t('exercisePage.name')}
                onChange={(e) => setEnteredValue(e.target.value)}
                value={enteredValue}
                {...headingElementsProps}
                flex={{ base: 1, sm: 'auto' }}
                ref={ref}
                rightSectionPointerEvents="auto"
                rightSectionProps={{ style: { cursor: 'text' } }}
                rightSection={
                  <>
                    {enteredValue ? (
                      <CloseButton
                        onClick={() => setEnteredValue('')}
                        style={{ display: enteredValue ? undefined : 'none' }}
                      />
                    ) : (
                      <IconSearch
                        size={20}
                        onClick={() => {
                          if (ref.current) {
                            ref.current.focus();
                          }
                        }}
                      />
                    )}
                  </>
                }
              />
            ) : (
              <Skeleton
                width="11rem"
                height="2.5rem"
                flex={{ base: 1, sm: 'auto' }}
              />
            )}

            {!isMobile ? (
              !isExercisesLoading ? (
                <MultiSelect
                  placeholder={t('exercisePage.chooseType')}
                  data={workoutTypes}
                  clearable
                  searchable
                  nothingFoundMessage={t('exercisePage.nothingFound')}
                  hidePickedOptions
                  onChange={setSelectedFilter}
                  {...headingElementsProps}
                  rightSection={<IconFilter size={20} />}
                />
              ) : (
                <Skeleton
                  width="11rem"
                  height="2.5rem"
                  flex={{ base: 1, sm: 'auto' }}
                />
              )
            ) : !isExercisesLoading ? (
              <Popover width={300} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button {...buttonProps} h="2.5rem" w="2.5rem" p={0}>
                    <IconFilter size={20} />
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <MultiSelect
                    placeholder={t('exercisePage.selectType')}
                    data={workoutTypes}
                    searchable
                    nothingFoundMessage={t('exercisePage.nothingFound')}
                    hidePickedOptions
                    onChange={setSelectedFilter}
                    comboboxProps={{ withinPortal: false }}
                    defaultValue={selectedFilter}
                  />
                </Popover.Dropdown>
              </Popover>
            ) : (
              <Skeleton height="2.5rem" width="2.5rem" />
            )}
            <MobileCreateButton
              open={open}
              buttonTitle={t('exercisePage.createExercise')}
              loading={isExercisesLoading}
            />
          </Flex>
        </Flex>

        <Divider my="md" />

        <Container {...sectionProps} p={0}>
          <ExercisesList
            variant="general"
            exercises={currentItems}
            loading={isExercisesLoading}
          />

          <Flex justify="center" mt="md">
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
export default ExercisePage;
