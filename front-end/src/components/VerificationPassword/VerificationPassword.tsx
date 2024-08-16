import { useState, useEffect } from 'react';
import notification from '../../utils/notification';
import { PaperProps, Paper, Button, Center } from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isPasswordInputsCorrect } from '../../utils/passwordStrengthChecking';
import { PasswordForm } from '../PasswordForm/PasswordForm';
import { FormContainer } from '../FormContainer/FormContainer';
import { verifyToken, setPassword } from '../../services/authService';
import Centered from '../ui/Centered';
import Loader from '../ui/Loader/Loader';
import { useTranslation } from 'react-i18next';

/**
 * @function VerificationPassword
 * @description Component that allows user to set password after registration via email link
 * @param {PaperProps} props - Paper component props
 * @returns {React.ReactElement} React component
 * @see {@link PaperProps} for Paper component props
 * @see {@link PasswordForm} for PasswordForm component
 * @see {@link FormContainer} for FormContainer component
 * @see {@link Loader} for Loader component
 * @see {@link Centered} for Centered component
 */
export const VerificationPassword = (props: PaperProps) => {
  const { t } = useTranslation();
  const [email, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenCheckingLoading, setIsTokenCheckingLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigation = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        setIsTokenCheckingLoading(true);
        const email = await verifyToken(token);
        setUserEmail(email);
      } catch (error) {
        notification({
          type: 'error',
          message: t('notification.An error occurred while checking token'),
        });
      } finally {
        setIsTokenCheckingLoading(false);
      }
    };

    checkToken();
  }, []);

  /**
   * @function handleSubmit
   * @description Function that handles form submit event to send password to the server
   * @param {string} password - password
   * @param {string} confirmPassword - password confirmation
   * @returns {Promise<void>} a result of setting password request
   * @throws an error notification if setting password request failed
   * @see {@link setPassword} for setting password request
   * @see {@link notification} for showing notification
   */
  const handleSubmit = async (password: string, confirmPassword: string) => {
    if (!isPasswordInputsCorrect(password, confirmPassword)) {
      return;
    }
    try {
      setIsLoading(true);
      await setPassword(token, password);
      notification({
        type: 'success',
        message: t('notification.Password is successfully created!'),
      });
      navigation('/login');
    } catch (e) {
      notification({
        type: 'error',
        message: t('notification.Failed to set password'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Centered>
      {isTokenCheckingLoading ? (
        <Center h="80vh">
          <Loader />
        </Center>
      ) : !email ? (
        <FormContainer
          paperProps={props}
          title={t('verificationPassword.Token is invalid')}
          subtitle={t(
            'verificationPassword.Please, contact admin or login to your profile if you are already verified',
          )}
        >
          <Button
            variant="outline"
            radius="xl"
            my="md"
            w="100%"
            fz="md"
            onClick={() => navigation('/login')}
          >
            {t('verificationPassword.Login to your profile')}
          </Button>
        </FormContainer>
      ) : (
        <FormContainer
          paperProps={props}
          title={t('verificationPassword.Hello', { email })}
          subtitle={t(
            'verificationPassword.Enter your new password and confirm',
          )}
        >
          <Paper withBorder shadow="md" p={30} radius="md" mt="md">
            <PasswordForm
              type="setup"
              isLoading={isLoading}
              handleSubmit={handleSubmit}
            />
          </Paper>
        </FormContainer>
      )}
    </Centered>
  );
};
