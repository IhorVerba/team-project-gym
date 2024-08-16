import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import Notification from '../types/Notification';
import i18n from '../i18n';

/**
 * @description Component for displaying notifications
 * @param {string} type - The type of notification (success or error)
 * @param {string} message - The message to be displayed in the notification
 * @param {number} autoClose - The time in milliseconds before the notification closes automatically
 * @returns {void} Displays a notification based on the type and message
 * @see {@link https://mantine.dev/docs/notifications/ | Mantine notifications} for more information on notifications
 */
const notification = ({ type, message, autoClose }: Notification) => {
  if (type === 'success') {
    notifications.show({
      position: 'top-center',
      title: i18n.t('notification.title.Success'),
      message: message,
      autoClose: autoClose || 5000,
      color: 'green',
      icon: <IconCheck />,
    });
  } else if (type === 'error') {
    notifications.show({
      position: 'top-center',
      title: i18n.t('notification.title.Error'),
      message: message,
      autoClose: autoClose || 5000,
      color: 'red',
      icon: <IconX />,
    });
  }
};

export default notification;
