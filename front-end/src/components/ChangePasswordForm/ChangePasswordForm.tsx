import { useState } from 'react';
import { isPasswordInputsCorrect } from '../../utils/passwordStrengthChecking';
import notification from '../../utils/notification';
import { changePassword } from '../../services/changePasswordService';
import { PasswordForm } from '../PasswordForm/PasswordForm';
import { FormContainer } from '../FormContainer';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

/**
 * @interface PasswordChangeFormProps - The props for the PasswordChangeForm component.
 * @property {string} verificationCode - The verification code.
 * @property {() => void} closeAndResetModal - The function to close and reset the modal.
 */
interface PasswordChangeFormProps {
  verificationCode: string;
  closeAndResetModal: () => void;
}

/**
 * @function ChangePasswordForm - A component that displays the change password form.
 * @param {PasswordChangeFormProps} props - The props to be passed into the component.
 * @returns The ChangePasswordForm component.
 * @see {@link PasswordChangeFormProps} - The props for the PasswordChangeForm component.
 * @see {@link PasswordForm} - The form for the password.
 * @see {@link FormContainer} - The container for the form.
 */
const ChangePasswordForm = ({
  verificationCode,
  closeAndResetModal,
}: PasswordChangeFormProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  /**
   * @function handleSubmit - Handles the submit event of the form.
   * @param {string} password - The password.
   * @param {string} confirmPassword - The confirm password.
   * @returns {void} The return the result of the function that handles the submit event of the form. (change password service)
   * @see {@link isPasswordInputsCorrect} - The function to check if the password inputs are correct.
   * @see {@link changePassword} - The function to change the password.
   * @see {@link notification} - The function to display a notification.
   */
  const handleSubmit = async (password: string, confirmPassword: string) => {
    if (!isPasswordInputsCorrect(password, confirmPassword)) {
      return;
    }
    try {
      setIsLoading(true);
      await changePassword(verificationCode, password);
      notification({
        type: 'success',
        message: t('notification.PasswordSuccessfullyChanged'),
      });
      closeAndResetModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        return notification({
          type: 'error',
          message: error.response?.data.message,
        });
      }
      notification({
        type: 'error',
        message: t('notification.FailedChangePassword'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      title={t('changePasswordForm.title')}
      width={{ xs: '400' }}
      marginTop={'0px'}
    >
      <PasswordForm
        type="change"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </FormContainer>
  );
};
export default ChangePasswordForm;
