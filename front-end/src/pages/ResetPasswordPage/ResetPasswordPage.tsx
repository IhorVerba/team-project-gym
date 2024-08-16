/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { PaperProps, Paper } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer } from '../../components/FormContainer';
import { isPasswordInputsCorrect } from '../../utils/passwordStrengthChecking';
import notification from '../../utils/notification';
import { PasswordForm } from '../../components/PasswordForm/PasswordForm';
import { ButtonsForm } from '../../components/ButtonsForm/ButtonsForm';
import {
  checkResetToken,
  sendPassword,
} from '../../services/forgotResetService';
import { AxiosError } from 'axios';
import Centered from '../../components/ui/Centered';
import { useTranslation } from 'react-i18next';
import { formPaperProps } from '../../styles/styleProps';

/**
 * @function ResetPasswordPage
 * @description This component of page is used to show reset password page. It's when user forgot password and clicked on reset password link from email, it can enter new password and confirm it.
 * @param props - interface PaperProps for Paper component
 * @see {@link FormContainer} component
 * @see {@link PasswordForm} component
 * @see {@link ButtonsForm} component
 * @returns ResetPasswordPage component
 */
const ResetPasswordPage = (props: PaperProps) => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const resetToken = useParams();
  const token = resetToken.token;
  const navigation = useNavigate();
  const { t } = useTranslation();

  /**
   * @function checkToken
   * @description Checks if token is valid. If it's not valid, it sets isTokenValid state to false.
   * @see {@link checkResetToken} function from forgotResetService
   * @returns void - sets isTokenValid state
   */
  const checkToken = async () => {
    try {
      await checkResetToken(token);
    } catch (e) {
      setIsTokenValid(false);
    }
  };
  useEffect(() => {
    checkToken();
  }, [token]);

  /**
   * @description Sends password to server. If password is not valid, it shows error message. If it's successful, it shows success message and redirects to login page. And if it's all ok - redirecting to login page to sign in.
   * @param {string} password - password from form
   * @param {string} confirmPassword - confirm password from form
   * @see {@link sendPassword} function from forgotResetService
   * @see {@link notification} component from utils
   * @returns void - sends password to server
   * @throws error notification - if password is not sent
   */
  const handleSubmit = async (password: string, confirmPassword: string) => {
    if (!isPasswordInputsCorrect(password, confirmPassword)) {
      return;
    }
    try {
      setIsLoading(true);
      await sendPassword(password, token);
      notification({
        type: 'success',
        message: `${t('resetPasswordPage.Redirecting')}`,
      });
      setTimeout(() => {
        navigation('/login');
      }, 2000);
    } catch (e) {
      if (e instanceof AxiosError) {
        return notification({
          type: 'error',
          message: `${t(`notification.${e.response?.data.message}` as any)}`,
        });
      }
      notification({
        type: 'error',
        message: `${t('resetPasswordPage.ResetPasswordError')}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Centered>
      {isTokenValid ? (
        <FormContainer
          paperProps={props}
          title={t('resetPasswordPage.Title')}
          subtitle={t('resetPasswordPage.Subtitle')}
        >
          <Paper {...formPaperProps}>
            <PasswordForm
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              type="reset"
            />
          </Paper>
        </FormContainer>
      ) : (
        <FormContainer
          paperProps={props}
          title={t('resetPasswordPage.Ooops')}
          subtitle={t('resetPasswordPage.InvalidToken')}
        >
          <ButtonsForm
            link1="/login"
            link2="/forgot-password"
            text1={t('resetPasswordPage.SignIn')}
            text2={t('resetPasswordPage.SendAgain')}
          />
        </FormContainer>
      )}
    </Centered>
  );
};

export default ResetPasswordPage;
