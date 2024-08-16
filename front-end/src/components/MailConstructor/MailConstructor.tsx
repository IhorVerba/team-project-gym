import { useRef, useState } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import { Center, Container, Stack } from '@mantine/core';
import notification from '../../utils/notification';
import { useDisclosure } from '@mantine/hooks';
import SaveMailTemplateModal from '../MailConstructorModals/SaveMailTemplateModal';
import {
  getMailTemplateNamesService,
  loadMailTemplateByNameService,
  saveMailTemplateService,
  sendMailTemplateService,
} from '../../services/mailTemplateService';
import { getAllUsers } from '../../services/userService';
import LoadMailTemplateModal from '../MailConstructorModals/LoadMailTemplateModal';
import SendMailTemplateModal from '../MailConstructorModals/SendMailTemplateModal';
import MailTemplateActionButton from '../MailConstructorActionButton/MailTemplateActionButton';
import { User } from '../../types/User';
import { AxiosError } from 'axios';
import Loader from '../ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { LANGUAGES, LOCALS } from '../../i18n/constants';

/**
 * @function MailConstructor - A component that displays the mail constructor.
 * @returns The MailConstructor component.
 * @see {@link SaveMailTemplateModal} - The modal to save the mail template.
 * @see {@link LoadMailTemplateModal} - The modal to load the mail template.
 * @see {@link SendMailTemplateModal} - The modal to send the mail template.
 * @see {@link MailTemplateActionButton} - The action button for the mail template.
 * @see {@link Loader} - The loader component.
 * @see {@link notification} - The notification component.
 */
const MailConstructor = () => {
  const { t } = useTranslation();
  const editorRef = useRef<EditorRef>(null);
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const [templates, setTemplates] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isMailSending, setIsMailSending] = useState(false);
  const [isMailSaving, setIsMailSaving] = useState(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);

  const [
    openedSaveTemplate,
    { open: openSaveTemplate, close: closeSaveTemplate },
  ] = useDisclosure(false);
  const [
    openedLoadTemplate,
    { open: openLoadTemplate, close: closeLoadTemplate },
  ] = useDisclosure(false);
  const [
    openedSendTemplate,
    { open: openSendTemplate, close: closeSendTemplate },
  ] = useDisclosure(false);

  const onReady: EmailEditorProps['onReady'] = () => {
    setIsEditorLoading(false);
  };

  const openSendMailTemplateModal = async () => {
    const users = await getAllUsers();
    setUsers(users);
    openSendTemplate();
  };

  const openLoadMailTemplateModal = async () => {
    const templateNames = await getMailTemplateNamesService();
    setTemplates(templateNames);
    openLoadTemplate();
  };

  const openSaveMailTemplateModal = () => {
    return new Promise<void>((resolve, reject) => {
      try {
        openSaveTemplate();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * @function sendMailTemplate - A function that sends the mail template.
   * @param {string[]} userMails - The user mails to send the mail template.
   * @param {string} subject - The subject of the mail template.
   * @returns The result of the send mail template function.
   * @throws The error when the mail was not sent.
   * @see {@link sendMailTemplateService} - The service to send the mail template.
   * @see {@link notification} - The notification component.
   */
  const sendMailTemplate = (userMails: string[], subject: string) => {
    editorRef.current?.editor?.exportHtml(async (data) => {
      try {
        setIsMailSending(true);
        await sendMailTemplateService(userMails, subject, data.html);
        notification({
          type: 'success',
          message: t('notification.Mail was successfully sent'),
        });
      } catch (e) {
        notification({
          type: 'error',
          message: t('notification.Can not send mail'),
        });
      } finally {
        setIsMailSending(false);
      }
    });
  };

  /**
   * @function saveMailTemplate - A function that saves the mail template.
   * @param {string} name - The name of the mail template.
   * @returns The result of the save mail template function.
   * @throws The error when the mail template was not saved.
   * @see {@link saveMailTemplateService}
   * @see {@link notification}
   */
  const saveMailTemplate = (name: string) => {
    editorRef.current?.editor?.exportHtml(async (data) => {
      try {
        setIsMailSaving(true);
        await saveMailTemplateService(name, data.design);
        notification({
          type: 'success',
          message: t('notification.Mail template was successfully saved'),
        });
      } catch (e) {
        if (e instanceof AxiosError) {
          return notification({
            type: 'error',
            message: e.response?.data.message,
          });
        }
        notification({
          type: 'error',
          message: t('notification.Can not save mail template'),
        });
      } finally {
        setIsMailSaving(false);
      }
    });
  };

  /**
   * @function loadMailTemplate - A function that loads the mail template.
   * @param {string} name - The name of the mail template.
   * @returns The result of the load mail template function.
   * @throws The error when the mail template was not loaded.
   * @see {@link loadMailTemplateByNameService}
   * @see {@link notification}
   */
  const loadMailTemplate = async (name: string) => {
    try {
      setIsTemplateLoading(true);
      const template = await loadMailTemplateByNameService(name);
      editorRef.current?.editor?.loadDesign(template);
      notification({
        type: 'success',
        message: 'Mail Template was successfully loaded',
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        return notification({
          type: 'error',
          message: e.response?.data.message,
        });
      }
      notification({
        type: 'error',
        message: 'Can not load mail template',
      });
    } finally {
      setIsTemplateLoading(false);
    }
  };

  return (
    <Container size="responsive" maw="1440px" mah="100vh">
      <SaveMailTemplateModal
        opened={openedSaveTemplate}
        close={closeSaveTemplate}
        saveTemplate={saveMailTemplate}
        isSaving={isMailSaving}
      ></SaveMailTemplateModal>

      <LoadMailTemplateModal
        opened={openedLoadTemplate}
        close={closeLoadTemplate}
        loadTemplate={loadMailTemplate}
        templates={templates}
        isTemplateLoading={isTemplateLoading}
      ></LoadMailTemplateModal>
      <SendMailTemplateModal
        sendMailTemplate={sendMailTemplate}
        close={closeSendTemplate}
        opened={openedSendTemplate}
        users={users}
        isSending={isMailSending}
      ></SendMailTemplateModal>
      {isEditorLoading ? (
        <Center h="100vh">
          <Loader />
        </Center>
      ) : (
        <Center>
          <Stack mb="10px" p="0" w="400px" align="center" justify="center">
            <MailTemplateActionButton
              actionType="load"
              openModal={openLoadMailTemplateModal}
            />
            <MailTemplateActionButton
              actionType="save"
              openModal={openSaveMailTemplateModal}
            />
            <MailTemplateActionButton
              actionType="send"
              openModal={openSendMailTemplateModal}
            />
          </Stack>
        </Center>
      )}

      <EmailEditor
        ref={editorRef}
        onReady={onReady}
        minHeight={isEditorLoading ? '0px' : '700px'}
        projectId={220609}
        style={{ display: isEditorLoading ? 'none' : 'block' }}
        options={{
          locale: i18n.language === LOCALS[LANGUAGES.EN] ? 'en-US' : 'uk-UA',
          appearance: {
            theme: 'light',
            panels: {
              tools: {
                collapsible: true,
                dock: 'right',
                tabs: { body: { visible: true } },
              },
            },
            features: { preview: true },
          },
        }}
      />
    </Container>
  );
};

export default MailConstructor;
