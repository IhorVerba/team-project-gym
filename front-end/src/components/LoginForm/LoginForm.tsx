/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@mantine/form';
import { UserLoginDTO } from '../../types/UserLoginDTO';
import {
  TextInput,
  PasswordInput,
  Text,
  PaperProps,
  Stack,
  Button,
  Alert,
  Group,
  Paper,
  rem,
  Center,
} from '@mantine/core';
import useLogin from '../../hooks/useLogin';
import { NavLink } from 'react-router-dom';
import { FormContainer } from '../FormContainer';
import { IconArrowLeft } from '@tabler/icons-react';
import { buttonProps, formPaperProps } from '../../styles/styleProps';
import Centered from '../ui/Centered';
import { useTranslation } from 'react-i18next';

/**
 * @function LoginForm - A component that displays the login form.
 * @description A form that allows the user to login.
 * @param {PaperProps} props - props for paper component.
 * @returns The LoginForm component.
 * @see {@link useLogin} - The hook that handles the login.
 * @see {@link FormContainer} - The form container component.
 */
const LoginForm = (props: PaperProps) => {
  const { login, isLoading, error } = useLogin();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
          ? null
          : `${t('loginForm.InvalidEmail')}`,
      password: (val) =>
        val.length < 6 ? `${t('loginForm.IncludeChar')}` : null,
    },
  });

  /**
   * @function loginUser - A function that logs in the user.
   * @param {UserLoginDTO} user - The user to login.
   * @returns The result of the login function.
   * @see {@link login} - The login function.
   * @see {@link UserLoginDTO} - The user login data transfer object.
   */
  const loginUser = async (user: UserLoginDTO) => {
    await login(user);
  };

  return (
    <Centered>
      <FormContainer
        title={t('loginForm.Title')}
        subtitle={t('loginForm.Subtitle')}
        paperProps={props}
      >
        <Paper {...formPaperProps}>
          <form
            onSubmit={form.onSubmit((values: UserLoginDTO) => {
              loginUser(values);
            })}
          >
            <Stack gap={'sm'}>
              <TextInput
                required
                label={t('loginForm.Email')}
                placeholder="example@email.com"
                {...form.getInputProps('email')}
                inputMode="email"
              />

              <PasswordInput
                required
                label={t('loginForm.Password')}
                placeholder={t('loginForm.YourPassword')}
                {...form.getInputProps('password')}
              />
            </Stack>
            {error && (
              <Alert color="red" variant="outline" mt="md">
                {t(`backend.${error}` as any)}
              </Alert>
            )}
            <Group justify="space-between" mt="lg" align="center">
              <NavLink to="/forgot-password">
                <Text c="dimmed" size="sm" component="div">
                  <Center>
                    <IconArrowLeft
                      style={{
                        width: rem(12),
                        height: rem(12),
                        marginRight: rem(5),
                      }}
                    />
                    {t('loginForm.ForgotPassword')}
                  </Center>
                </Text>
              </NavLink>
              <Button
                type="submit"
                loading={isLoading}
                {...buttonProps}
                w="fit-content"
              >
                {t('loginForm.Title')}
              </Button>
            </Group>
          </form>
        </Paper>
      </FormContainer>
    </Centered>
  );
};

export default LoginForm;
