import { Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { iconButtonProps } from '../../styles/styleProps';
import React from 'react';

/**
 * @interface Props - The props for the DeleteButton component.
 * @param {() => void} openDelete - The function to open the delete modal.
 * @param {boolean} deleteLoading - Whether the delete button is loading.
 */
type Props = {
  openDelete: () => void;
  deleteLoading: boolean;
};

/**
 * @constant DeleteButton - A component that displays a delete button.
 * @description A component that displays a button with icon to delete an item.
 * @param {Props} props - The props to pass to the component.
 * @returns The DeleteButton component.
 */
const DeleteButton: React.FC<Props> = ({ openDelete, deleteLoading }) => {
  return (
    <Button
      onClick={openDelete}
      {...iconButtonProps}
      bg="secondary-color.9"
      loading={deleteLoading}
    >
      <IconTrash size={16} />
    </Button>
  );
};
export default DeleteButton;
