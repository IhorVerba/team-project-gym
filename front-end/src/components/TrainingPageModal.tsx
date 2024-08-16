import { Button, Modal, Stack, TextInput, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import Training from '../types/Training';
import { UserMainInfo } from '../types/UserMainInfo';
import { MultiSelectWithAvatar } from './MultiSelectWithAvatar/MultiSelectWithAvatar';
import { Exercise } from '../types/Exercise';
import { getExerciseIconUrlByType } from '../utils/getExerciseIconUrlByType';
import { HandleUpdate } from '../types/HandleUpdate';
import TrainingToSendInterface from '../types/TrainingToSendInterface';
import { HandleCreate } from '../types/HandleCreate';
import { ConfirmModal } from './ui/ConfirmModal';
import { HandleDelete } from '../types/HandleDelete';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { buttonProps, titleProps } from '../styles/styleProps';
import DeleteButton from './ui/DeleteButton';
import Avatar from './ui/Avatar';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props - TrainingPageModal component props
 * @property {boolean} isPersonalTraining - is personal training
 * @property {HandleCreate<TrainingToSendInterface>} onCreate - function to create training
 * @property {HandleUpdate<TrainingToSendInterface>} onUpdate - function to update training
 * @property {HandleDelete} onDelete - function to delete training
 * @property {boolean} opened - modal opened state
 * @property {function} close - function to close modal
 * @property {UserMainInfo[]} users - users array
 * @property {Exercise[]} exercises - exercises array
 * @property {Training} defaultValues - default training values
 * @property {string} title - modal title
 * @property {boolean} loading - loading state
 * @property {string} _id - training id
 * @property {function} setModalLoading - function to set modal loading state
 * @property {boolean} modalLoading - modal loading state
 * @see {@link TrainingToSendInterface} for training interface
 * @see {@link UserMainInfo} for user interface
 * @see {@link Exercise} for exercise interface
 * @see {@link Training} for training interface
 * @see {@link HandleCreate} for create interface
 * @see {@link HandleUpdate} for update interface
 * @see {@link HandleDelete} for delete interface
 */
type Props = {
  isPersonalTraining?: boolean;
  onCreate?: HandleCreate<TrainingToSendInterface>;
  onUpdate?: HandleUpdate<TrainingToSendInterface>;
  onDelete?: HandleDelete;
  opened: boolean;
  close: () => void;
  users: UserMainInfo[];
  exercises: Exercise[];
  defaultValues?: Training;
  title: string;
  loading: boolean;
  _id?: string;
  setModalLoading?: (value: boolean) => void;
  modalLoading?: boolean;
};

/**
 * @function TrainingPageModal
 * @description Modal component for training page with form to create, update and delete training
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 * @see {@link ConfirmModal} for confirm modal component
 * @see {@link MultiSelectWithAvatar} for multi select with avatar component
 * @see {@link DeleteButton} for delete button component
 * @see {@link Avatar} for avatar component
 */
export const TrainingPageModal: React.FC<Props> = ({
  isPersonalTraining,
  onCreate,
  onUpdate,
  onDelete,
  opened,
  close,
  exercises,
  users,
  defaultValues,
  title,
  loading,
  _id,
  setModalLoading,
}) => {
  const { t } = useTranslation();
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isMobile = useMediaQuery('(width < 768px)');

  const form = useForm({
    initialValues: {
      name: defaultValues ? defaultValues.name : '',
      userIds: defaultValues
        ? defaultValues.userIds.map((user) => user._id as string)
        : ([] as string[]),
      exercisesIds: defaultValues
        ? defaultValues.exercisesIds.map((exercise) => exercise._id as string)
        : ([] as string[]),
    },

    validate: {
      name: (value) =>
        value.length < 3 ? t('trainingPageModal.NameContain3Letters') : null,
      exercisesIds: (value) =>
        value.length > 0
          ? null
          : t('trainingPageModal.Select at least 1 exercise'),
      userIds: (value) =>
        value.length > 0
          ? null
          : t('trainingPageModal.Select at least 1 client'),
    },
  });

  const handleSelectChange = (value: string[]) => {
    form.setFieldValue('userIds', value);
  };

  const handleExercisesSelectChange = (value: string[]) => {
    form.setFieldValue('exercisesIds', value);
  };

  const multiSelectWithAvatarOptions = users.map((user) => ({
    value: user._id as string,
    label: `${user.firstName} ${user.lastName}`,
    photoUrl: user.photoUrl ?? '',
  }));

  const multiSelectWithAvatarExercisesOptions = exercises.map((exercise) => ({
    value: exercise._id as string,
    label: exercise.name,
    photoUrl: getExerciseIconUrlByType(exercise.type),
  }));

  const handleSubmit = (values: TrainingToSendInterface) => {
    onCreate && onCreate(values);
    onUpdate &&
      onUpdate(
        _id as string,
        values,
        setModalLoading as (value: boolean) => void,
        close,
      );
  };

  useEffect(() => {
    if (!opened) {
      form.clearErrors();
    }
  }, [opened]);

  const deleteUserWrapper = async () => {
    onDelete && (await onDelete(_id as string, setDeleteLoading, closeDelete));
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
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
      <ConfirmModal
        text={t('trainingPageModal.delete')}
        buttonText={t('confirmModal.Delete')}
        confirmedAction={deleteUserWrapper}
        opened={openedDelete}
        close={closeDelete}
        loading={deleteLoading}
        closeParentModal={close}
      />
      <form
        onSubmit={form.onSubmit((values: TrainingToSendInterface) =>
          handleSubmit(values),
        )}
      >
        <Stack gap="md" style={{ paddingTop: isMobile ? '30px' : 0 }}>
          <Text ta="center" {...titleProps}>
            {title}
          </Text>
          <TextInput
            required
            label={t('trainingPageModal.name')}
            placeholder={t('trainingPageModal.name')}
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue('name', event.currentTarget.value)
            }
            error={form.errors.name}
          />
          <MultiSelectWithAvatar
            options={multiSelectWithAvatarExercisesOptions}
            value={form.values.exercisesIds}
            setValue={handleExercisesSelectChange}
            placeholder={t('trainingPageModal.selectExercises')}
            label={t('trainingPageModal.selectExercises')}
            error={form.errors.exercisesIds as string}
          />
          {isPersonalTraining ? (
            <Group gap={7}>
              <Avatar
                photoUrl={users[0]?.photoUrl}
                firstName={users[0]?.firstName}
                lastName={users[0]?.lastName}
                size={32}
                fontSize={14}
                radius="xl"
                isVertical
                isInitials
              />
              <span>
                {users[0]?.lastName &&
                  users[0]?.firstName &&
                  `${users[0]?.firstName} ${users[0]?.lastName}`}
              </span>
            </Group>
          ) : (
            <MultiSelectWithAvatar
              options={multiSelectWithAvatarOptions}
              value={form.values.userIds}
              setValue={handleSelectChange}
              placeholder={t('trainingPageModal.selectUsers')}
              label={t('trainingPageModal.selectUsers')}
              error={form.errors.userIds as string}
            />
          )}
        </Stack>
        <Group mt="md" justify="space-between">
          <Button type="submit" {...buttonProps} loading={loading}>
            {title}
          </Button>
          {onUpdate && (
            <DeleteButton
              openDelete={openDelete}
              deleteLoading={deleteLoading}
            />
          )}
        </Group>
      </form>
    </Modal>
  );
};
