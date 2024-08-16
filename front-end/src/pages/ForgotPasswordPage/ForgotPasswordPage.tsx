/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PaperProps,
  Button,
  TextInput,
  Paper,
  Group,
  Text,
  Center,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { NavLink } from 'react-router-dom';
import { FormContainer } from '../../components/FormContainer';
import notification from '../../utils/notification';
import { IconArrowLeft } from '@tabler/icons-react';
import { sendEmail as sendPasswordEmail } from '../../services/forgotResetService';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { buttonProps, formPaperProps } from '../../styles/styleProps';
import Centered from '../../components/ui/Centered';
import { useTranslation } from 'react-i18next';

/**
 * @function ForgotPasswordPage
 * @description This component of page is used to show forgot password page. It's when user forgot password it can click on forgot password and enter email to get reset password link, which is sent to his/her email.
 * @param props - interface PaperProps for Paper component
 * @see {@link FormContainer} component
 * @returns ForgotPasswordPage component
 */
const ForgotPasswordPage = (props: PaperProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  /**
   * @constant form
   * @description Form hook for form validation. It validates email field with ReGex and return error if it's not valid.
   * @see {@link useForm} hook from @mantine/form
   * @returns {string} email value - if email is valid
   * @returns email error - if email is not valid
   */
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (val) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
          ? null
          : `${t('forgotPasswordPage.InvalidEmail')}`,
    },
  });

  /**
   * @description Sends email to user with reset password link. Shows message if it's successful or error message if it's not. Can send server error message if it's from backend. Turns on loader when sending email and turns off when it's done.
   * @param {string} email - email of user from form
   * @see {@link sendPasswordEmail} function from forgotResetService
   * @see {@link notification} component from utils
   * @returns void - sends email to user
   * @throws error notification - if email is not sent
   */
  const sendEmail = async (email: string) => {
    try {
      setLoading(true);
      await sendPasswordEmail(email);
      form.values.email = '';
      notification({
        type: 'success',
        message: `${t('forgotPasswordPage.EmailSent')}`,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        return notification({
          type: 'error',
          message: `${t(`notification.${e.response?.data.message}` as any)}`,
        });
      }
      notification({
        type: 'error',
        message: `${t('forgotPasswordPage.EmailSentError')}`,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Centered>
      <FormContainer
        title={t('forgotPasswordPage.Title')}
        subtitle={t('forgotPasswordPage.Description')}
        paperProps={props}
      >
        <Paper {...formPaperProps}>
          <form
            onSubmit={form.onSubmit((values: { email: string }) => {
              sendEmail(values.email);
            })}
          >
            <TextInput
              label={t('forgotPasswordPage.Email')}
              placeholder="example@email.com"
              required
              {...form.getInputProps('email')}
              inputMode="email"
            />
            <Group justify="space-between" mt="lg" align="center">
              <NavLink to="/login">
                <Text c="dimmed" size="sm" component="div">
                  <Center>
                    <IconArrowLeft
                      style={{
                        width: rem(12),
                        height: rem(12),
                        marginRight: rem(5),
                      }}
                      stroke={1.5}
                    />
                    {t('forgotPasswordPage.BackToLogin')}
                  </Center>
                </Text>
              </NavLink>
              <Button
                type="submit"
                loading={loading}
                {...buttonProps}
                w="fit-content"
              >
                {t('forgotPasswordPage.Submit')}
              </Button>
            </Group>
          </form>
        </Paper>
      </FormContainer>
    </Centered>
  );
};

export default ForgotPasswordPage;
