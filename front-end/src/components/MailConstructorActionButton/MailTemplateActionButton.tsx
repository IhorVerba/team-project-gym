import { Button } from '@mantine/core';
import {
  IconCloudDownload,
  IconCloudUpload,
  IconSend,
} from '@tabler/icons-react';
import { useState } from 'react';
import notification from '../../utils/notification';
import { useTranslation } from 'react-i18next';
import { buttonProps } from '../../styles/styleProps';

/**
 * @interface MailTemplateActionButtonProps - The interface for the MailTemplateActionButton component.
 * @property {() => Promise<void>} openModal - The function to open the modal.
 * @property {'load' | 'save' | 'send'} actionType - The type of the action.
 */
interface MailTemplateActionButtonProps {
  openModal: () => Promise<void>;
  actionType: 'load' | 'save' | 'send';
}

/**
 * @function MailTemplateActionButton - A component that displays the mail template action button.
 * @param {MailTemplateActionButtonProps} props - The props to pass to the component.
 * @returns The MailTemplateActionButton component.
 * @see {@link MailTemplateActionButtonProps} - The props for the MailTemplateActionButton component.
 */
const MailTemplateActionButton = ({
  openModal,
  actionType,
}: MailTemplateActionButtonProps) => {
  const { t } = useTranslation();
  const [isModalLoading, setIsModalLoading] = useState(false);

  /**
   * @function openModalHandler - Handles the opening of the modal.
   * @returns The result of the open modal function.
   * @throws The error when the modal can not be opened.
   * @see {@link notification}
   */
  const openModalHandler = async () => {
    try {
      setIsModalLoading(true);
      await openModal();
    } catch (e) {
      switch (actionType) {
        case 'load':
          return notification({
            type: 'error',
            message: t('notification.Can not load mail template'),
          });
        case 'save':
          return notification({
            type: 'error',
            message: t('notification.Can not save mail template'),
          });
        case 'send':
          return notification({
            type: 'error',
            message: t('notification.Can not send mail'),
          });
      }
    } finally {
      setIsModalLoading(false);
    }
  };

  /**
   * @function getButtonNameByType - Gets the button name by the type.
   * @returns The button name.
   * @see {@link actionType}
   */
  const getButtonNameByType = () => {
    switch (actionType) {
      case 'load':
        return t('mailTemplateActionButton.Load template');
      case 'save':
        return t('mailTemplateActionButton.Save as template');
      case 'send':
        return t('mailTemplateActionButton.Send mail');
    }
  };

  /**
   * @function getButtonIconByType - Gets the button icon by the action type.
   * @returns The button icon.
   * @see {@link actionType}
   */
  const getButtonIconByType = () => {
    switch (actionType) {
      case 'load':
        return <IconCloudDownload />;
      case 'save':
        return <IconCloudUpload />;
      case 'send':
        return <IconSend />;
    }
  };

  return (
    <>
      <Button
        onClick={openModalHandler}
        loading={isModalLoading}
        rightSection={getButtonIconByType()}
        {...buttonProps}
        w="100%"
        maw={300}
      >
        {getButtonNameByType()}
      </Button>
    </>
  );
};

export default MailTemplateActionButton;
