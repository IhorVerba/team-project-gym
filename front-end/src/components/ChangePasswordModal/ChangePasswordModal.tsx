import { Button, Center, Modal, PinInput, Stack, Text } from '@mantine/core';
import {
  sendCodeToEmail,
  verifyCode as verifyPasswordCode,
} from '../../services/changePasswordService';
import notification from '../../utils/notification';
import { useState } from 'react';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import { buttonProps } from '../../styles/styleProps';
import { useTranslation } from 'react-i18next';

/**
 * @interface ChangePasswordModalProps - The props for the ChangePasswordModal component.
 * @property {boolean} opened - The opened state of the modal.
 * @property {() => void} close - The function to close the modal.
 */
interface ChangePasswordModalProps {
  opened: boolean;
  close: () => void;
}

/**
 * @function ChangePasswordModal - A component that displays the change password modal.
 * @param {ChangePasswordModalProps} props - The props to be passed into the component.
 * @returns The ChangePasswordModal component.
 * @see {@link ChangePasswordModalProps} - The props for the ChangePasswordModal component.
 * @see {@link ChangePasswordForm} - The form for the change password.
 * @see {@link notification} - The function to display a notification.
 */
export const ChangePasswordModal = ({
  opened,
  close,
}: ChangePasswordModalProps) => {
  const { t } = useTranslation();

  const initialStages = { isCodeSent: false, isCodeVerified: false };
  const [changePasswordStages, setChangePasswordStages] = useState({
    ...initialStages,
  });
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [isCodeChecking, setIsCodeChecking] = useState(false);
  const [code, setCode] = useState('');

  const closeModalHandler = () => {
    setChangePasswordStages(initialStages);
    setCode('');
    close();
  };

  /**
   * @function sendVerificationCodeToEmail - Sends the verification code to the email.
   * @returns {void} The return the result of the function that sends the verification code to the email.
   * @throws The error when the message was not sent.
   * @see {@link sendCodeToEmail} - The function to send the verification code to the email.
   * @see {@link notification} - The function to display a notification.
   */
  async function sendVerificationCodeToEmail() {
    try {
      setIsCodeSending(true);
      await sendCodeToEmail();
      notification({
        type: 'success',
        message: t('notification.MessageWasSent'),
        autoClose: 10_000,
      });
      setChangePasswordStages({ ...changePasswordStages, isCodeSent: true });
    } catch (e) {
      notification({
        type: 'error',
        message: t('notification.MessageWasNotSent'),
      });
    } finally {
      setIsCodeSending(false);
    }
  }

  /**
   * @function verifyCode - Verifies the code.
   * @returns {void} The return the result of the function that verifies the code.
   * @throws The error when the code is not valid.
   * @see {@link verifyPasswordCode}
   * @see {@link notification} - The function to display a notification.
   */
  async function verifyCode() {
    try {
      setIsCodeChecking(true);
      await verifyPasswordCode(code);
      setChangePasswordStages({
        ...changePasswordStages,
        isCodeVerified: true,
      });
      notification({ type: 'success', message: t('notification.CodeIsValid') });
    } catch (e) {
      notification({
        type: 'error',
        message: t('notification.CodeIsNotValid'),
      });
    } finally {
      setIsCodeChecking(false);
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={() => closeModalHandler()}
      title={t('changePasswordModal.title')}
      centered
    >
      {!changePasswordStages.isCodeSent ? (
        <Button
          onClick={sendVerificationCodeToEmail}
          loading={isCodeSending}
          {...buttonProps}
          w="fit-content"
        >
          {t('changePasswordModal.SendCodeToEmail')}
        </Button>
      ) : !changePasswordStages.isCodeVerified ? (
        <>
          <Stack gap="sm">
            <Text>{t('changePasswordModal.EnterVerificationCode')}</Text>
            <Center>
              <PinInput
                value={code}
                onChange={(value: string) => setCode(value)}
                length={6}
                oneTimeCode
                aria-label="Enter your verification code"
              />
            </Center>
          </Stack>
          <Button
            mt="md"
            onClick={verifyCode}
            loading={isCodeChecking}
            {...buttonProps}
          >
            {t('changePasswordModal.Confirm')}
          </Button>
        </>
      ) : (
        <ChangePasswordForm
          verificationCode={code}
          closeAndResetModal={closeModalHandler}
        />
      )}
    </Modal>
  );
};
