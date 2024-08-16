import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Input,
  Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthContext } from '../../context/AuthContext';
import { updateUser } from '../../services/userService';
import { useState } from 'react';
import { User } from '../../types/User';
import notification from '../../utils/notification';
import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal';
import { IMaskInput } from 'react-imask';
import { buttonProps, titleProps } from '../../styles/styleProps';
import { useTranslation } from 'react-i18next';

/**
 * @function UserProfileForm
 * @description - This component renders a form for user profile information editing
 * @returns {JSX.Element} - Rendered UserProfileForm component
 * @see {@link User} for User type
 * @see {@link ChangePasswordModal} for ChangePasswordModal component
 */
function UserProfileForm() {
  const { t } = useTranslation();

  const { user, fetchUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isUserUpdating, setIsUserUpdating] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber || '',
    },
    validate: {
      phoneNumber: (value) => {
        if (value.length < 10) {
          return t('profileForm.shortPhone');
        }
      },
    },
  });

  /**
   * @function updateCurrentUser
   * @description - Function to update current user information in the database
   * @param {object} fieldsToUpdate - object with fields to update in the user object (firstName, lastName, email, phoneNumber)
   * @returns {Promise<void>} - Promise that resolves when user is updated
   * @throws an error if something went wrong and update was unsuccessful
   * @see {@link User} for User type
   * @see {@link updateUser} for updateUser function
   * @see {@link fetchUser} for fetchUser function
   * @see {@link notification} for notification function
   */
  async function updateCurrentUser(fieldsToUpdate: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string | undefined;
  }) {
    const { _id, ...userWithRequiredFields } = user as User;
    const userToUpdate = {
      ...userWithRequiredFields,
      ...fieldsToUpdate,
    };
    try {
      setIsUserUpdating(true);
      await updateUser(userToUpdate, _id as string);
      await fetchUser();
      notification({
        type: 'success',
        message: t('notification.UserSuccessfullyUpdated'),
      });
    } catch (e) {
      notification({
        type: 'error',
        message: t('notification.SomethingWentWrong'),
      });
    } finally {
      setIsUserUpdating(false);
      setIsEditing(false);
    }
  }

  return (
    <Flex direction="column" mt="md">
      <Text {...titleProps} fz="md">
        {t('profileForm.generalInformation')}
      </Text>

      <form
        onSubmit={form.onSubmit(async (values) => {
          await updateCurrentUser(values);
        })}
      >
        <Stack gap={'sm'}>
          <TextInput
            disabled={!isEditing}
            label={t('profileForm.firstName')}
            placeholder={t('profileForm.firstNamePlaceholder')}
            {...form.getInputProps('firstName')}
            radius="sm"
          />

          <TextInput
            disabled={!isEditing}
            label={t('profileForm.lastName')}
            placeholder={t('profileForm.lastNamePlaceholder')}
            {...form.getInputProps('lastName')}
            radius="sm"
          />

          <TextInput
            label={t('profileForm.email')}
            placeholder={t('profileForm.emailPlaceholder')}
            disabled={true}
            {...form.getInputProps('email')}
            radius="sm"
            inputMode="email"
          />
          <Input.Wrapper
            label={t('profileForm.phone')}
            error={form.errors.phoneNumber}
          >
            <Input
              placeholder={t('profileForm.phonePlaceholder')}
              radius="sm"
              disabled={!isEditing}
              component={IMaskInput}
              mask="+38 (000) 000-00-00"
              value={form.values.phoneNumber}
              {...form.getInputProps('phoneNumber')}
              type="phoneNumber"
              inputMode="tel"
            />
          </Input.Wrapper>

          {isEditing ? (
            <Group justify="space-between" mt="lg" align="center">
              <Button
                type="submit"
                loading={isUserUpdating}
                {...buttonProps}
                w="fit-content"
              >
                {t('profileForm.updateProfile')}
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                }}
                {...buttonProps}
                bg="secondary-color.9"
                w="fit-content"
              >
                {t('profileForm.cancel')}
              </Button>
            </Group>
          ) : (
            <Group
              justify="space-between"
              mt="lg"
              align="center"
              style={{ overflow: 'hidden' }}
            >
              <Button onClick={open} {...buttonProps} w="fit-content">
                {t('profileForm.changePassword')}
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
                {...buttonProps}
                w="140px"
              >
                {t('profileForm.edit')}
              </Button>
            </Group>
          )}
        </Stack>
      </form>
      <ChangePasswordModal opened={opened} close={close} />
    </Flex>
  );
}

export default UserProfileForm;
