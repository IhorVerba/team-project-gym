import { Paper, Flex, Avatar, Text, Container } from '@mantine/core';
import { IconBarbell, IconRun, IconStretching2 } from '@tabler/icons-react';
import { Exercise, basicTypes } from '../types/Exercise';
import { cardPaperProps, cardFlexProps } from '../styles/styleProps';

/**
 * @function ExerciseCard
 * @description Card component that displays exercise information with icon and details
 * @param {Exercise} exercise - exercise object
 * @returns {React.ReactElement} React component
 * @see {@link Exercise} for exercise interface
 * @see {@link basicTypes} for basic exercise types
 * @see {@link cardPaperProps} for Paper component props
 * @see {@link cardFlexProps} for Flex component props
 * @see {@link cardTitleProps} for Text component propsS
 */
export const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const { type, name } = exercise;

  return (
    <Paper {...cardPaperProps}>
      <Flex direction="column" {...cardFlexProps}>
        <Container p={0}>
          <Avatar src={''} size={80} radius={80} mx="auto">
            {type.toLowerCase() === basicTypes[0].toLowerCase() ? (
              <IconBarbell size={48} />
            ) : type.toLowerCase() === basicTypes[1].toLowerCase() ? (
              <IconRun size={48} />
            ) : (
              <IconStretching2 size={48} />
            )}
          </Avatar>
          <Text ta="center" tt="capitalize" mt="sm" fz="lg">
            {name}
          </Text>
          <Text ta="center" fz="md" tt="capitalize">
            {type}
          </Text>
        </Container>
      </Flex>
    </Paper>
  );
};
