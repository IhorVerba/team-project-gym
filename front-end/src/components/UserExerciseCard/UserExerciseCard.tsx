import {
  Paper,
  Flex,
  Avatar,
  Text,
  Container,
  UnstyledButton,
} from '@mantine/core';
import {
  IconBarbell,
  IconRun,
  IconStretching2,
  IconX,
} from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Exercise, basicTypes } from '../../types/Exercise';
import { HandleCreate } from '../../types/HandleCreate';
import UserExerciseModal from '../UserExerciseModal/UserExerciseModal';
import {
  cardFlexProps,
  cardPaperProps,
  cardTitleProps,
} from '../../styles/styleProps';
import { UserExerciseForm } from '../UserExerciseForm/UserExerciseForm';
import classes from './UserExerciseCardAnimation.module.scss';
import { useEffect, useState } from 'react';

/**
 * @interface Props - The props for the UserExercisesCard component.
 * @param {Exercise} exercise - The exercise to display.
 * @param {string[]} workoutTypes - The workout types.
 * @param {HandleCreate<Exercise>} createExercise - The function to create an exercise.
 * @param {string | null} [selectedUser] - The selected user.
 * @param {string[]} selectedExercises - The selected exercises.
 * @param {(exercises: string[]) => void} setSelectedExercises - The function to set the selected exercises.
 * @returns The Props interface.
 * @see {@link Exercise} - The Exercise type.
 * @see {@link HandleCreate} - The HandleCreate type.
 */
type Props = {
  exercise: Exercise;
  workoutTypes: string[];
  createExercise: HandleCreate<Exercise>;
  selectedUser?: string | null;
  selectedExercises: string[];
  setSelectedExercises: (exercises: string[]) => void;
  disabled?: boolean;
  openModal?: () => void;
  setExerciseToDelete?: (exercise: Exercise) => void;
  isFinished?: boolean;
  isEditable: boolean;
};

/**
 * @constant UserExercisesCard - A component that displays an exercise card.
 * @description A component that displays a card with the exercise name and type, and an icon based on the type of the exercise.
 * @param {Props} props - The props to pass to the component.
 * @returns The UserExercisesCard component.
 * @see {@link Props} - The props for the UserExercisesCard component.
 * @see {@link Exercise} - The Exercise type.
 * @see {@link UserExerciseModal} - The UserExerciseModal component.
 * @see {@link UserExerciseForm} - The UserExerciseForm component.
 */
const UserExercisesCard: React.FC<Props> = ({
  exercise,
  workoutTypes,
  createExercise,
  selectedUser,
  selectedExercises,
  setSelectedExercises,
  disabled,
  openModal,
  setExerciseToDelete,
  isFinished,
  isEditable,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [isFirstRender, setIsFirstRender] = useState(false);

  const [isSetted, setIsSetted] = useState(
    !!exercise.userId && !!exercise.trainingId,
  );

  useEffect(() => {
    if (setIsSetted && isFirstRender) {
      setIsSetted(false);
    } else {
      setIsFirstRender(true);
    }
  }, [selectedUser]);

  const { _id, name, type } = exercise;

  const openModalHandler = () => {
    if (selectedUser) {
      open();
    }
  };

  const handleDeleteExercise = () => {
    openModal && openModal();
    setExerciseToDelete && setExerciseToDelete(exercise);
  };

  const isMobile = useMediaQuery('(width < 992px)');

  /**
   * @function handleCardClick - A function that handles the card click.
   * @description A function that handles the card click and adds or removes the exercise from the selected exercises.
   * @returns The handleCardClick function.
   */
  const handleCardClick = () => {
    if (!selectedUser) {
      return;
    }

    let newExercises = [];

    if (selectedExercises.includes(_id as string)) {
      newExercises = selectedExercises.filter(
        (exerciseId) => exerciseId !== exercise._id,
      );
    } else {
      newExercises = [...selectedExercises, exercise._id];
    }

    setSelectedExercises(newExercises as string[]);
  };

  return (
    <>
      {!selectedExercises.includes(_id as string) && (
        <>
          <UserExerciseModal
            opened={opened}
            close={close}
            workoutTypes={workoutTypes}
            onCreate={createExercise}
            defaultModalValues={exercise}
            disabled={disabled}
            isEditable={isEditable}
            setIsSetted={setIsSetted}
            isSetted={isSetted}
          />
          <Paper
            {...cardPaperProps}
            style={{
              cursor: selectedUser ? 'pointer' : 'default',
            }}
            onClick={isMobile ? handleCardClick : openModalHandler}
          >
            <Flex {...cardFlexProps} direction="column" pos={'relative'}>
              {!selectedUser && !isFinished && (
                <UnstyledButton
                  pos={'absolute'}
                  top={0}
                  right={0}
                  h={20}
                  w={20}
                  onClick={handleDeleteExercise}
                >
                  <IconX />
                </UnstyledButton>
              )}
              <Avatar
                src={''}
                size={80}
                radius={80}
                mx="auto"
                bg={isSetted ? 'primary-color.7' : ''}
              >
                {type.toLowerCase() === basicTypes[0].toLowerCase() ? (
                  <IconBarbell
                    size={48}
                    color={isSetted ? 'white' : 'black'}
                    stroke={1.5}
                  />
                ) : type.toLowerCase() === basicTypes[1].toLowerCase() ? (
                  <IconRun size={48} color={isSetted ? 'white' : 'black'} />
                ) : (
                  <IconStretching2
                    size={48}
                    color={isSetted ? 'white' : 'black'}
                  />
                )}
              </Avatar>

              <Text ta="center" tt="capitalize" {...cardTitleProps} mt="sm">
                {name}
              </Text>
              <Text ta="center" fz="md" tt="capitalize">
                {type}
              </Text>
            </Flex>
          </Paper>
        </>
      )}

      {isMobile && (
        <Paper
          {...cardPaperProps}
          className={classes.popAnimated}
          style={{
            cursor: selectedUser ? 'pointer' : 'default',
            display: selectedExercises.includes(_id as string)
              ? 'block'
              : 'none',
          }}
          onClick={isMobile ? handleCardClick : openModalHandler}
        >
          <Flex direction="column" gap={20}>
            <Flex
              {...cardFlexProps}
              direction="row"
              justify="space-between"
              align="center"
            >
              <Container p={0} flex={1}>
                <Avatar
                  src={''}
                  size={30}
                  radius={80}
                  bg={isSetted ? 'primary-color.7' : ''}
                >
                  {type.toLowerCase() === basicTypes[0].toLowerCase() ? (
                    <IconBarbell
                      size={48}
                      color={isSetted ? 'white' : 'black'}
                    />
                  ) : type.toLowerCase() === basicTypes[1].toLowerCase() ? (
                    <IconRun size={48} color={isSetted ? 'white' : 'black'} />
                  ) : (
                    <IconStretching2
                      size={48}
                      color={isSetted ? 'white' : 'black'}
                    />
                  )}
                </Avatar>
              </Container>
              <Text ta="center" tt="capitalize" {...cardTitleProps} flex={1}>
                {name}
              </Text>
              <Text ta="end" fz="md" tt="capitalize" flex={1}>
                {type}
              </Text>
            </Flex>

            <UserExerciseForm
              onCreate={createExercise}
              workoutTypes={workoutTypes}
              defaultModalValues={exercise}
              disabled={disabled}
              isEditable={isEditable}
              setIsSetted={setIsSetted}
              isSetted={isSetted}
            />
          </Flex>
        </Paper>
      )}
    </>
  );
};

export default UserExercisesCard;
