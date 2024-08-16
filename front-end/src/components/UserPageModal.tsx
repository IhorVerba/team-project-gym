import {
  Button,
  Modal,
  Stack,
  TextInput,
  Group,
  Select,
  Text,
  Input,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import UserRole from '../types/UserRole';
import { User } from '../types/User';
import { HandleUpdate } from '../types/HandleUpdate';
import { HandleCreate } from '../types/HandleCreate';
import { useMediaQuery } from '@mantine/hooks';
import { HandleDelete } from '../types/HandleDelete';
import { buttonProps, titleProps } from '../styles/styleProps';
import { IMaskInput } from 'react-imask';
import DeleteButton from './ui/DeleteButton';
import { useTranslation } from 'react-i18next';
import ActivateButton from './ui/ActivateButton';

/**
 * @interface Props - UserPageModal component props
 * @property {HandleUpdate<User>} onUpdate - function to update user
 * @property {HandleCreate<User>} onCreate - function to create user
 * @property {HandleDelete} onDelete - function to delete user
 * @property {string} _id - user id
 * @property {function} setModalLoading - function to set modal loading
 * @property {User} defaultModalValues - default modal values
 * @property {string} trainerId - trainer id
 * @property {boolean} opened - modal opened state
 * @property {function} close - function to close modal
 * @property {UserRole} userRole - user role
 * @property {boolean} isCreate - is create modal
 * @property {string} text - modal text
 * @property {boolean} loading - loading state
 * @see {@link HandleUpdate} for HandleUpdate type
 * @see {@link HandleCreate} for HandleCreate type
 * @see {@link HandleDelete} for HandleDelete type
 * @see {@link User} for User interface
 * @see {@link UserRole} for UserRole interface
 */
type Props = {
  onUpdate?: HandleUpdate<User>;
  onCreate?: HandleCreate<User>;
  onDelete?: HandleDelete;
  _id?: string;
  isUserActive?: boolean;
  setModalLoading?: (value: boolean) => void;
  defaultModalValues?: User;
  trainerId?: string;
  opened: boolean;
  close: () => void;
  userRole: UserRole;
  isCreate: boolean;
  text: string;
  openDelete?: () => void;
  loading: boolean;
  phoneNumberIsNotRequired?: boolean;
};

/**
 * @function UserPageModal
 * @description UserPageModal component to display user modal
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 * @see {@link DeleteButton} for DeleteButton component
 */
export const UserPageModal: React.FC<Props> = ({
  onUpdate,
  onCreate,
  isCreate,
  _id,
  isUserActive,
  setModalLoading,
  defaultModalValues,
  trainerId,
  opened,
  close,
  userRole,
  text,
  openDelete,
  loading,
  phoneNumberIsNotRequired,
}) => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery('(width < 768px)');

  const initialValues = {
    email: defaultModalValues?.email || '',
    firstName: defaultModalValues?.firstName || '',
    lastName: defaultModalValues?.lastName || '',
    role: userRole,
    phoneNumber: defaultModalValues?.phoneNumber || '',
  };

  const form = useForm({
    initialValues,
    validate: {
      email: (value: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : t('userPageModal.InvalidEmail'),
      phoneNumber: (value: string) => {
        if (!phoneNumberIsNotRequired && !value) {
          return t('notification.PhoneNumberIsRequired');
        }
        if (value && value.length < 10) {
          return t('userPageModal.Phone number is too short');
        }
      },
    },
  });
  const closeModalHandler = () => {
    close();
    form.setValues(initialValues);
  };

  /**
   * @function handleSubmit
   * @description Function to handle submit form values and call onUpdate or onCreate function depending on the props
   * @param {User} values - form values
   * @returns {void} result of function call onUpdate or onCreate
   */
  const handleSubmit = (values: User) => {
    onUpdate &&
      onUpdate(
        _id as string,
        {
          ...values,
          trainerIds: [trainerId as string],
        },
        setModalLoading as (value: boolean) => void,
        close,
      );
    onCreate &&
      onCreate({
        ...values,
        trainerIds: [trainerId as string],
      });
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={closeModalHandler}
      fullScreen={isMobile}
      transitionProps={{
        transition: 'fade',
        duration: 100,
      }}
      overlayProps={{
        opacity: 0.8,
        blur: 4,
      }}
      closeOnEscape
      closeOnClickOutside
    >
      <form
        onSubmit={form.onSubmit((values: User) => {
          handleSubmit(values);
        })}
      >
        <Stack gap="md" style={{ paddingTop: isMobile ? '50px' : 0 }}>
          <Text ta="center" {...titleProps}>
            {text}
          </Text>
          <TextInput
            required
            label={t('userPageModal.FirstName')}
            placeholder={t('userPageModal.FirstNamePlaceholder')}
            value={form.values.firstName}
            onChange={(event) =>
              form.setFieldValue('firstName', event.currentTarget.value)
            }
            error={
              form.errors.firstName && t('userPageModal.FirstNameIsRequired')
            }
          />
          <TextInput
            required
            label={t('userPageModal.LastName')}
            placeholder={t('userPageModal.LastNamePlaceholder')}
            value={form.values.lastName}
            onChange={(event) =>
              form.setFieldValue('lastName', event.currentTarget.value)
            }
            error={
              form.errors.lastName && t('userPageModal.LastNameIsRequired')
            }
          />
          <TextInput
            required
            label={t('userPageModal.Email')}
            placeholder={t('userPageModal.EmailPlaceholder')}
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && t('userPageModal.InvalidEmail')}
            type="email"
            inputMode="email"
          />
          <Input.Wrapper
            label={t('userPageModal.Phone number')}
            error={form.errors.phoneNumber}
            withAsterisk
          >
            <Input
              required={!phoneNumberIsNotRequired}
              component={IMaskInput}
              label={t('userPageModal.Phone number')}
              placeholder={t('userPageModal.Phone number')}
              mask="+38 (000) 000-00-00"
              value={form.values.phoneNumber}
              onChange={(event) =>
                form.setFieldValue('phoneNumber', event.currentTarget.value)
              }
              onAccept={(value: string) => {
                if (value.trim() !== '' || phoneNumberIsNotRequired) {
                  form.setFieldValue('phoneNumber', value);
                }
              }}
              overwrite={true}
              type="phoneNumber"
              inputMode="tel"
            />
          </Input.Wrapper>

          {userRole !== UserRole.Client && !onUpdate && (
            <Select
              required
              label={t('userPageModal.ChooseRole')}
              placeholder={t('userPageModal.Role')}
              data={[
                { value: UserRole.Trainer, label: t('role.trainer') },
                { value: UserRole.Admin, label: t('role.admin') },
              ]}
              value={form.values.role}
              defaultValue={UserRole.Trainer}
              onChange={(value: string | null) =>
                form.setFieldValue('role', value as UserRole)
              }
              error={form.errors.role && t('userPageModal.RoleIsRequired')}
            />
          )}
        </Stack>
        <Group mt="md" justify="space-between">
          <Button
            {...buttonProps}
            w="fit-content"
            loading={loading}
            type="submit"
          >
            {text}
          </Button>
          {!isCreate && isUserActive && openDelete ? (
            <DeleteButton openDelete={openDelete} deleteLoading={loading} />
          ) : (
            !isCreate &&
            openDelete && (
              <ActivateButton
                openConfirm={openDelete}
                activateLoading={loading}
              />
            )
          )}
        </Group>
      </form>
    </Modal>
  );
};
