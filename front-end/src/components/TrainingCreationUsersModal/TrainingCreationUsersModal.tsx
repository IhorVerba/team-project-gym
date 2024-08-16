import { Button, Center, Modal, Stack } from '@mantine/core';
import { MultiSelectWithAvatar } from '../MultiSelectWithAvatar/MultiSelectWithAvatar';
import { User } from '../../types/User';
import { useForm } from '@mantine/form';
import Training from '../../types/Training';
import { useEffect, useState } from 'react';
import { fetchClientsMainInfo } from '../../services/userService';
import notification from '../../utils/notification';
import Loader from '../ui/Loader/Loader';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props of TrainingCreationUsersModal component that is used to create a new training
 * @param {Function} onSubmit - function that is called when the form is submitted with the new user ids and new exercises ids as arguments
 * @param {boolean} opened - boolean that indicates if the modal is opened
 * @param {Function} close - function that is called when the modal is closed
 * @param {Training} defaultValues - default values for the form
 * @param {string} title - title of the modal
 * @param {boolean} loading - boolean that indicates if the form is loading
 */
type Props = {
  onSubmit: ({
    newUserIds,
    newExercisesIds,
  }: {
    newUserIds?: string[];
    newExercisesIds?: string[];
  }) => Promise<void>;
  opened: boolean;
  close: () => void;
  defaultValues: Training;
  title: string;
  loading: boolean;
};

/**
 * TrainingCreationUsersModal component that displays the training creation users modal
 * @param {Props} props - the props to pass to the component
 * @returns the TrainingCreationUsersModal component
 * @see {@link Props} - the props for the TrainingCreationUsersModal component
 * @see {@link User} - the user type
 * @see {@link MultiSelectWithAvatar} - the multi select with avatar component
 * @see {@link Loader} - the loader component
 */
export const TrainingCreationUsersModal: React.FC<Props> = ({
  onSubmit,
  opened,
  close,
  defaultValues,
  title,
  loading,
}) => {
  const { t } = useTranslation();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  /**
   * @function fetchUsers - function that fetches all users
   * @returns {Promise<void>} - a promise that resolves when the users are fetched
   * @throws an error if the users cannot be fetched
   * @see {@link fetchClientsMainInfo} - function that fetches all users
   * @see {@link notification} - function that displays a notification
   */
  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      const users = await fetchClientsMainInfo();
      setAllUsers(users);
    } catch (error) {
      notification({
        type: 'error',
        message: 'Something went wrong! Cannot fetch users.',
      });
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (opened) {
      fetchUsers();
    }
  }, [opened]);

  const initialValues = {
    userIds: defaultValues
      ? defaultValues.userIds.map((user) => user._id as string)
      : ([] as string[]),
  };

  const form = useForm({
    initialValues,
  });

  const closeModalHandler = () => {
    close();
    form.setValues(initialValues);
  };

  const handleSelectChange = (value: string[]) => {
    form.setFieldValue('userIds', value);
  };

  const multiSelectWithAvatarOptions = allUsers.map((user) => ({
    value: user._id as string,
    label: `${user.firstName} ${user.lastName}`,
    photoUrl: user.photoUrl ?? '',
  }));

  return (
    <Modal opened={opened} onClose={closeModalHandler} centered title={title}>
      {usersLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <form
          onSubmit={form.onSubmit(() =>
            onSubmit({ newUserIds: form.values.userIds }),
          )}
        >
          <Stack>
            <MultiSelectWithAvatar
              options={multiSelectWithAvatarOptions}
              value={form.values.userIds}
              setValue={handleSelectChange}
              placeholder={t('trainingCreationUsersModal.selectUsers')}
              label={t('trainingCreationUsersModal.selectUsers')}
            />
          </Stack>
          <Center>
            <Button mt="md" type="submit" loading={loading}>
              {t('trainingCreationUsersModal.changeUsersBtn')}
            </Button>
          </Center>
        </form>
      )}
    </Modal>
  );
};
