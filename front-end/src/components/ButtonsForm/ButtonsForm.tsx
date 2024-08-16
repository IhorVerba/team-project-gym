import { Button, Group, Paper } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { buttonProps } from '../../styles/styleProps';

/**
 * @interface ButtonsFormProps - The interface for the ButtonsForm component.
 * @property {string} link1 - The link for the first button.
 * @property {string} link2 - The link for the second button.
 * @property {string} text1 - The text for the first button.
 * @property {string} text2 - The text for the second button.
 */
interface ButtonsFormProps {
  link1: string;
  link2: string;
  text1: string;
  text2: string;
  isOne?: boolean;
}

/**
 * @function ButtonsForm - The component for the buttons in the form.
 * @param {ButtonsFormProps} props - The props for the component.
 * @returns The buttons for the form.
 * @see {@link ButtonsFormProps} - The interface for the ButtonsForm component.
 * @see {@link buttonProps} - The style props for the button.
 */
export const ButtonsForm: React.FC<ButtonsFormProps> = ({
  link1,
  link2,
  text1,
  text2,
  isOne,
}) => {
  return (
    <Paper withBorder shadow="md" p={30} radius="md" mt="md">
      <Group gap={'sm'} justify="center">
        {isOne ? (
          <NavLink to={link1}>
            <Button {...buttonProps} w="fit-content">
              {text1}
            </Button>
          </NavLink>
        ) : (
          <>
            <NavLink to={link1}>
              <Button {...buttonProps} w="fit-content">
                {text1}
              </Button>
            </NavLink>
            <NavLink to={link2}>
              <Button {...buttonProps} w="fit-content">
                {text2}
              </Button>
            </NavLink>
          </>
        )}
      </Group>
    </Paper>
  );
};
