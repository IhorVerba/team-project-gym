import {
  Button,
  Center,
  Group,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import { PasswordRequirement } from '../PasswordRequirement/PasswordRequirement';
import {
  getStrength,
  requirements,
} from '../../utils/passwordStrengthChecking';
import { useState } from 'react';
import { buttonProps, formButtonProps } from '../../styles/styleProps';
import { useTranslation } from 'react-i18next';

/**
 * @interface PasswordFormProps - The interface for the PasswordForm component.
 * @property {(password: string, confirmPassword: string) => void} handleSubmit - The function to handle the submit of the password form.
 * @property {boolean} isLoading - The state of the loading.
 * @property {'setup' | 'reset' | 'change'} type - The type of the password form.
 */
interface PasswordFormProps {
  handleSubmit?: (password: string, confirmPassword: string) => void;
  isLoading: boolean;
  type: 'setup' | 'reset' | 'change';
}

/**
 * @function PasswordForm - A component that displays the password form.
 * @param {PasswordFormProps} props - The props to pass to the component.
 * @returns The PasswordForm component.
 * @see {@link PasswordFormProps} - The props for the PasswordForm component.
 * @see {@link PasswordRequirement} - The password requirement component.
 */
export const PasswordForm: React.FC<PasswordFormProps> = ({
  handleSubmit,
  isLoading,
  type,
}) => {
  const { t } = useTranslation();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * @constant passwordRequirementChecks - The password requirement checks.
   * @type {JSX.Element[]} - The password requirement checks.
   * @returns The password requirement checks component.
   * @see {@link PasswordRequirement} - The password requirement component.
   */
  const passwordRequirementChecks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  /**
   * @function getButtonByType - Gets the button by the type.
   * @param {'setup' | 'reset' | 'change'} type - The type of the button.
   * @returns The button by the type.
   */
  const getButtonByType = (type: 'setup' | 'reset' | 'change') => {
    if (type === 'change' || type === 'setup') {
      return (
        <Button
          type="submit"
          loading={isLoading}
          {...formButtonProps}
          w="fit-content"
        >
          {t('passwordForm.Submit')}
        </Button>
      );
    } else if (type === 'reset') {
      return (
        <>
          <Group justify="space-between">
            <Stack gap="sm" align="start">
              <NavLink to="/forgot-password">
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
                    {t('passwordForm.SendEmailAgain')}
                  </Center>
                </Text>
              </NavLink>
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
                    {t('passwordForm.SignIn')}
                  </Center>
                </Text>
              </NavLink>
            </Stack>
            <Button
              type="submit"
              loading={isLoading}
              {...buttonProps}
              w="fir-content"
            >
              {t('passwordForm.Submit')}
            </Button>
          </Group>
        </>
      );
    }
  };

  const passwordStrength = getStrength(password);
  const color =
    passwordStrength === 100
      ? 'teal'
      : passwordStrength > 50
        ? 'yellow'
        : 'red';

  /**
   * @function submit - Submits the form.
   * @param {React.FormEvent<HTMLFormElement>} event - The form event.
   * @returns The result of the form submission.
   */
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleSubmit) {
      handleSubmit(password, confirmPassword);
    }
  };

  return (
    <form onSubmit={submit}>
      <Stack gap={'sm'}>
        <Popover
          opened={popoverOpened}
          position="bottom"
          width="target"
          transitionProps={{ transition: 'pop' }}
        >
          <Popover.Target>
            <PasswordInput
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
              required
              label={t('passwordForm.Password')}
              placeholder={t('passwordForm.PasswordPlaceholder')}
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </Popover.Target>
          <PasswordInput
            required
            label={t('passwordForm.ConfirmPassword')}
            placeholder={t('passwordForm.ConfirmPasswordPlaceholder')}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.currentTarget.value);
            }}
          />
          {getButtonByType(type)}
          <Popover.Dropdown>
            <Progress color={color} value={passwordStrength} size={5} mb="xs" />
            <PasswordRequirement
              label={t('passwordRequirements.Includes6Characters')}
              meets={password.length > 5}
            />
            {passwordRequirementChecks}
          </Popover.Dropdown>
        </Popover>
      </Stack>
    </form>
  );
};
