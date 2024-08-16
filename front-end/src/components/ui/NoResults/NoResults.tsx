import { Container, Flex, Text } from '@mantine/core';

/**
 * @interface Props - The props for the NoResults component.
 * @param {string} [text] - The text to display.
 */
interface Props {
  text?: string;
}

/**
 * @function NoResults - A component that displays a message when there are no results.
 * @param {Props} props - The props to pass to the component.
 * @returns The NoResults component.
 * @see {@link Props} - The props for the NoResults component.
 */
const NoResults: React.FC<Props> = ({ text = 'No data' }) => {
  return (
    <Container>
      <Flex justify="center" align="center">
        <Text size="lg">{text}</Text>
      </Flex>
    </Container>
  );
};

export default NoResults;
