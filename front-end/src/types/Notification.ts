import React from 'react';

/**
 * @interface Notification
 * @property {'success' | 'error'} type - The type notification.
 * @property {string} message - The message.
 * @property {React.ReactNode} [icon] - The icon.
 * @property {number} [autoClose] - The time of auto closing of notification.
 */
interface Notification {
  type: 'success' | 'error';
  message: string;
  icon?: React.ReactNode;
  autoClose?: number;
}

export default Notification;
