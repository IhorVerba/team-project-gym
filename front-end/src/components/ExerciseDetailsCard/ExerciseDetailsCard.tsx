import { useState } from 'react';
import {
  Paper,
  Flex,
  Avatar,
  Text,
  rem,
  Container,
  Divider,
  UnstyledButton,
} from '@mantine/core';
import {
  IconBarbell,
  IconRun,
  IconDots,
  IconStretching2,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Exercise, basicTypes } from '../../types/Exercise';
import ExerciseModal from '../ExercisesModal';
import { HandleUpdate } from '../../types/HandleUpdate';
import { HandleDelete } from '../../types/HandleDelete';
import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './ExerciseDetailsCard.scss';

/**
 * @function Card - A component that displays the exercise details card.
 * @param {Exercise} exercise - The exercise object.
 * @param {string[]} workoutTypes - The workout types array.
 * @param {HandleUpdate<Exercise>} updateExercise - The function to update the exercise.
 * @param {HandleDelete} deleteExercise - The function to delete the exercise.
 * @returns The ExerciseDetailsCard component.
 * @see {@link Exercise} - The exercise object.
 * @see {@link HandleUpdate} - The interface for update function of the exercise.
 * @see {@link HandleDelete} - The interface for delete function of the exercise.
 * @see {@link ExerciseModal} - The modal for the exercise.
 */
export const Card = ({
  exercise,
  workoutTypes,
  updateExercise,
  deleteExercise,
}: {
  exercise: Exercise;
  workoutTypes: string[];
  updateExercise: HandleUpdate<Exercise>;
  deleteExercise: HandleDelete;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [modalLoading, setModalLoading] = useState(false);

  const { _id, name, type, description } = exercise;

  const openModalHandler = () => {
    open();
  };

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: description,
  });

  const cleanHTML = editor?.getHTML();

  return (
    <>
      <ExerciseModal
        _id={_id}
        formAction="update"
        opened={opened}
        close={close}
        workoutTypes={workoutTypes}
        onUpdate={updateExercise}
        loading={modalLoading}
        setLoading={setModalLoading}
        defaultModalValues={exercise}
        onDelete={deleteExercise}
      />
      <Paper
        radius="md"
        p="lg"
        h="100%"
        bg="var(--mantine-color-body)"
        style={{ position: 'relative' }}
      >
        <Flex
          direction="column"
          justify="space-between"
          align="center"
          h="100%"
          gap="sm"
        >
          <Container p={0} bg="var(--mantine-color-body)">
            <Avatar src={''} size={80} radius={80} mx="auto">
              {type.toLowerCase() === basicTypes[0].toLowerCase() ? (
                <IconBarbell size={48} />
              ) : type.toLowerCase() === basicTypes[1].toLowerCase() ? (
                <IconRun size={48} />
              ) : (
                <IconStretching2 size={48} />
              )}
            </Avatar>
            <Text ta="center" fz="xl" fw={500} mt="xs" tt="capitalize">
              {name}
            </Text>
            <Text ta="center" fz="md" tt="capitalize">
              {type}
            </Text>
            {description && cleanHTML ? (
              <>
                <Divider my="md" />
                <Text
                  ta="center"
                  className="description"
                  dangerouslySetInnerHTML={{ __html: cleanHTML }}
                />
                <Divider my="md" />
              </>
            ) : null}
          </Container>
          <UnstyledButton
            size="sm"
            onClick={openModalHandler}
            className="exercise-button"
            style={{ position: 'absolute' }}
            top={10}
            right={10}
          >
            <IconDots
              style={{ width: rem(30), height: rem(30) }}
              stroke={1.5}
            />
          </UnstyledButton>
        </Flex>
      </Paper>
    </>
  );
};
