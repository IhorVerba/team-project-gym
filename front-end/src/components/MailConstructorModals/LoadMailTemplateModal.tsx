import { Box, Button, Group, Modal, Select } from '@mantine/core';
import { useState } from 'react';
import notification from '../../utils/notification';
import { useTranslation } from 'react-i18next';

/**
 * @interface LoadMailTemplateModalProps - The interface for the LoadMailTemplateModal component.
 * @property {boolean} opened - The state of the modal.
 * @property {() => void} close - The function to close the modal.
 * @property {(name: string) => Promise<void>} loadTemplate - The function to load the template.
 * @property {string[]} templates - The templates to load.
 * @property {boolean} isTemplateLoading - The state of the template loading.
 */
interface LoadMailTemplateModalProps {
  opened: boolean;
  close: () => void;
  loadTemplate: (name: string) => Promise<void>;
  templates: string[];
  isTemplateLoading: boolean;
}

/**
 * @function LoadMailTemplateModal - A component that displays the load mail template modal.
 * @param {LoadMailTemplateModalProps} props - The props to pass to the component.
 * @returns The LoadMailTemplateModal component.
 * @see {@link LoadMailTemplateModalProps} - The props for the LoadMailTemplateModal component.
 * @see {@link notification} - The notification components.
 */
const LoadMailTemplateModal = ({
  opened,
  close,
  loadTemplate,
  templates,
  isTemplateLoading,
}: LoadMailTemplateModalProps) => {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>();

  /**
   * @function handleSubmit - Handles the submission of the form.
   * @returns The result of the form submission.
   * @throws The error when the form can not be submitted.
   * @see {@link notification}
   * @see {@link loadTemplate}
   */
  const handleSubmit = async () => {
    if (!selectedTemplate) {
      return notification({
        type: 'error',
        message: t('notification.Template does not selected'),
      });
    }
    await loadTemplate(selectedTemplate);
    closeModalHandler();
  };

  const closeModalHandler = () => {
    setSelectedTemplate(null);
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
        <Select
          label={t('loadMailTemplateModal.Select template')}
          placeholder={t('loadMailTemplateModal.Pick')}
          onChange={setSelectedTemplate}
          data={templates}
        />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            disabled={!selectedTemplate}
            onClick={handleSubmit}
            loading={isTemplateLoading}
          >
            Select
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default LoadMailTemplateModal;
