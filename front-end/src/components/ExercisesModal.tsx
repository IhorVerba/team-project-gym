import {
  Modal,
  Stack,
  Input,
  TextInput,
  NativeSelect,
  Button,
  Text,
} from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { useForm } from '@mantine/form';
import { Exercise, basicTypes } from '../types/Exercise';
import { HandleUpdate } from '../types/HandleUpdate';
import { HandleCreate } from '../types/HandleCreate';
import { useEditor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { HandleDelete } from '../types/HandleDelete';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ConfirmModal } from './ui/ConfirmModal';
import { buttonProps, titleProps } from '../styles/styleProps';
import { Group } from '@mantine/core';
import DeleteButton from './ui/DeleteButton';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props - ExerciseModal component props
 * @property {HandleUpdate<Exercise>} onUpdate - function to update exercise
 * @property {HandleCreate<Exercise>} onCreate - function to create exercise
 * @property {HandleDelete} onDelete - function to delete exercise
 * @property {string} _id - exercise id
 * @property {function} setLoading - function to set loading state
 * @property {boolean} loading - loading state
 * @property {function} close - function to close modal
 * @property {boolean} opened - modal opened state
 * @property {string[]} workoutTypes - workout types
 * @property {string} formAction - form action
 * @property {Exercise} defaultModalValues - default modal values
 * @see {@link Exercise} for exercise object
 * @see {@link HandleUpdate} for update function
 * @see {@link HandleCreate} for create function
 * @see {@link HandleDelete} for delete function
 */
type Props = {
  onUpdate?: HandleUpdate<Exercise>;
  onCreate?: HandleCreate<Exercise>;
  onDelete?: HandleDelete;
  _id?: string;
  setLoading?: (value: boolean) => void;
  loading: boolean;
  close: () => void;
  opened: boolean;
  workoutTypes: string[];
  formAction: string;
  defaultModalValues?: Exercise;
};

/**
 * @function ExerciseModal
 * @description ExerciseModal component to create, update and delete exercises with form
 * @param {Props} props - ExerciseModal component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for ExerciseModal component props
 * @see {@link ConfirmModal} for ConfirmModal component
 * @see {@link DeleteButton} for DeleteButton component
 */
const ExerciseModal: React.FC<Props> = ({
  onUpdate,
  onCreate,
  onDelete,
  _id,
  setLoading,
  loading,
  close,
  opened,
  workoutTypes,
  formAction,
  defaultModalValues,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const isMobile = useMediaQuery('(width < 768px)');
  const { t } = useTranslation();

  const initialValues = {
    name: defaultModalValues?.name || '',
    type: defaultModalValues?.type || basicTypes[0],
    ...(defaultModalValues ? defaultModalValues : {}),
  };

  const form = useForm({
    initialValues,
  });

  const typeSelectionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== basicTypes[3]) {
      form.setFieldValue('type', e.target.value);
    }
  };

  /**
   * @function handleSubmit
   * @description Handles form submit event to create or update exercise
   * @param {Exercise} values - exercise object
   * @returns {void} result of onCreate or onUpdate function
   * @see {@link Exercise} for exercise object
   */
  const handleSubmit = (values: Exercise) => {
    onCreate &&
      onCreate({
        ...values,
      });
    onUpdate &&
      onUpdate(
        _id as string,
        {
          ...values,
        },
        setLoading as (value: boolean) => void,
        close,
      );
  };

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: form.values.description,
    onUpdate: ({ editor }) => {
      form.setFieldValue('description', editor.getHTML());
    },
  });

  const onDeleteWrapper = async () => {
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
        text={t('exerciseModal.areYouSureDelete')}
        buttonText={t('confirmModal.Delete')}
        confirmedAction={onDeleteWrapper}
        opened={openedDelete}
        close={closeDelete}
        loading={deleteLoading}
        closeParentModal={close}
      />
      <form
        action=""
        onSubmit={form.onSubmit((values: Exercise) => {
          handleSubmit(values);
        })}
      >
        <Stack gap="md" style={{ paddingTop: isMobile ? '50px' : 0 }}>
          <Text {...titleProps}>
            {formAction === 'create'
              ? `${t('exerciseModal.create')}`
              : `${t('exerciseModal.update')}`}{' '}
            {t('exerciseModal.exercise')}
          </Text>
          <TextInput
            label={t('exerciseModal.exerciseName')}
            placeholder={t('exerciseModal.exerciseName')}
            value={form.values.name}
            onChange={(e) => form.setFieldValue('name', e.target.value)}
          />
          <NativeSelect
            onChange={typeSelectionHandler}
            data={workoutTypes}
            label={t('exerciseModal.workoutType')}
            defaultValue={workoutTypes.find(
              (type) => type.toLowerCase() === form.values.type.toLowerCase(),
            )}
          />
          <Input.Wrapper label={t('exerciseModal.exerciseDescription')}>
            <RichTextEditor editor={editor}>
              {editor && (
                <BubbleMenu editor={editor}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Link />
                  </RichTextEditor.ControlsGroup>
                </BubbleMenu>
              )}
              <RichTextEditor.Content fz="sm" lh={3} />
            </RichTextEditor>
          </Input.Wrapper>
        </Stack>
        <Group mt="md" justify="space-between">
          <Button type="submit" loading={loading} {...buttonProps}>
            {formAction === 'create'
              ? `${t('exerciseModal.create')}`
              : `${t('exerciseModal.update')}`}
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
export default ExerciseModal;
