import { Button, Group, Modal, Stack } from '@mantine/core';
import React from 'react';
import { buttonProps } from '../../styles/styleProps';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props - The props for the ConfirmModal component.
 * @param {string} text - The text to display.
 * @param {string} [buttonText] - The text to display on the button.
 * @param {boolean} opened - Whether the modal is opened.
 * @param {() => void} close - The function to close the modal.
 * @param {boolean} loading - Whether the modal is loading.
 * @param {() => void} [closeUpdate] - The function to close the update modal.
 */
type Props = {
  text: string;
  buttonText?: string;
  opened: boolean;
  close: () => void;
  loading: boolean;
  closeParentModal?: () => void;
  confirmedAction: () => Promise<void>;
};

/**
 * @constant ConfirmModal - A component that displays a confirmation modal.
 * @description A component that displays a modal with a confirmation message and buttons to confirm or cancel the action.
 * @param {Props} props - The props to pass to the component.
 * @returns The ConfirmModal component.
 */
export const ConfirmModal: React.FC<Props> = ({
  text,
  buttonText,
  opened,
  close,
  loading,
  closeParentModal,
  confirmedAction,
}) => {
  const { t } = useTranslation();

  /**
   * @function handleAction - A function that handles the action based on the type of the modal.
   * @returns The action to perform.
   * @see {@link HandleDelete} - The function to delete an item.
   */
  const handleAction = async () => {
    await confirmedAction();
    if (closeParentModal) {
      closeParentModal();
    }
  };

  return (
    <Modal opened={opened} onClose={close} title={text} centered>
      <Stack gap="md">
        <Group justify="space-between">
          <Button onClick={close} {...buttonProps} w="fit-content">
            {t('confirmModal.Cancel')}
          </Button>

          <Button
            onClick={handleAction}
            {...buttonProps}
            bg="secondary-color.9"
            loading={loading}
            w="fit-content"
          >
            {buttonText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
