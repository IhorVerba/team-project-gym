import { Box, Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

/**
 * @interface SaveMailTemplateModal - A component that displays the save mail template modal.
 * @param {boolean} opened - A boolean that indicates if the modal is opened.
 * @param {() => void} close - A function that closes the modal.
 * @param {(name: string) => void} saveTemplate - A function that saves the template.
 * @param {boolean} isSaving - A boolean that indicates if the template is saving.
 */
interface SaveMailTemplateModalProps {
  opened: boolean;
  close: () => void;
  saveTemplate: (name: string) => void;
  isSaving: boolean;
}

/**
 * @function SaveMailTemplateModal - A component that displays the save mail template modal.
 * @param {SaveMailTemplateModalProps} props - props for the SaveMailTemplateModal component.
 * @returns The SaveMailTemplateModal component.
 * @see {@link SaveMailTemplateModalProps} - The props interface for the SaveMailTemplateModal component.
 */
const SaveMailTemplateModal = ({
  opened,
  close,
  saveTemplate,
  isSaving,
}: SaveMailTemplateModalProps) => {
  const { t } = useTranslation();
  const initialValues = {
    name: '',
  };
  const form = useForm({
    initialValues,
    validate: {
      name: (value) =>
        value.length < 3
          ? t('saveMailTemplateModal.Name must contain at least 3 letters')
          : null,
    },
  });

  const closeModalHandler = () => {
    form.setValues(initialValues);
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={closeModalHandler}
      title={t('loadMailTemplateModal.Save mail template')}
      centered
    >
      <Box maw={340} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            saveTemplate(values.name);
            closeModalHandler();
          })}
        >
          <TextInput
            withAsterisk
            label={t('saveMailTemplateModal.Template name')}
            placeholder={t('saveMailTemplateModal.Name')}
            {...form.getInputProps('name')}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={isSaving}>
              {t('saveMailTemplateModal.Save')}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default SaveMailTemplateModal;
