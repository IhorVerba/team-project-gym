import {
  Button,
  Container,
  Modal,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { MultiSelectWithAvatar } from '../MultiSelectWithAvatar/MultiSelectWithAvatar';
import { useState } from 'react';
import { User } from '../../types/User';
import UserRole from '../../types/UserRole';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

/**
 * @interface SendMailTemplateModalProps - The interface for the SendMailTemplateModal component.
 * @property {(userMails: string[], subject: string) => void} sendMailTemplate - The function to send the mail template.
 * @property {boolean} opened - The state of the modal.
 * @property {() => void} close - The function to close the modal.
 * @property {User[]} users - The users to send the mail to.
 * @property {boolean} isSending - The state of the mail sending.
 */
interface SendMailTemplateModalProps {
  sendMailTemplate: (userMails: string[], subject: string) => void;
  opened: boolean;
  close: () => void;
  users: User[];
  isSending: boolean;
}

/**
 * @enum SelectOption The enum for the select option.
 * @property {string} SelectAll - The select all option.
 * @property {string} SelectAdmins - The select admins option.
 * @property {string} SelectTrainers - The select trainers option.
 * @property {string} SelectClients - The select clients option.
 */
enum SelectOption {
  SelectAll = 'Select all',
  SelectAdmins = 'Select admins',
  SelectTrainers = 'Select trainers',
  SelectClients = 'Select clients',
  ClearAll = 'Clear all',
}

/**
 * @function SendMailTemplateModal - A component that displays the send mail template modal.
 * @param {SendMailTemplateModalProps} props - The props to pass to the component.
 * @returns The SendMailTemplateModal component.
 * @see {@link SendMailTemplateModalProps} - The props for the SendMailTemplateModal component.
 * @see {@link MultiSelectWithAvatar} - The multi select with avatar component.
 */
const SendMailTemplateModal = ({
  sendMailTemplate,
  opened,
  close,
  users,
  isSending,
}: SendMailTemplateModalProps) => {
  const { t } = useTranslation();
  const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);

  const initialValues = {
    mailSubject: '',
    selectedUserEmailsLength: selectedUserEmails.length,
  };

  const form = useForm({
    initialValues,
    validate: {
      mailSubject: (value) =>
        value.length < 3
          ? t('sendMailTemplateModal.Subject must contain at least 3 letters')
          : null,
      selectedUserEmailsLength: () =>
        selectedUserEmails.length === 0
          ? t('sendMailTemplateModal.Select at least 1 user')
          : null,
    },
  });

  const [selectOptions] = useState<SelectOption[]>([
    SelectOption.SelectAll,
    SelectOption.SelectAdmins,
    SelectOption.SelectTrainers,
    SelectOption.SelectClients,
    SelectOption.ClearAll,
  ]);
  const [, setSelectOption] = useState<SelectOption | null>();

  const multiSelectWithAvatarOptions = users.map((user) => ({
    value: user.email as string,
    label: `${user.firstName} ${user.lastName} [${user.role.toUpperCase()}]`,
    photoUrl: user.photoUrl ?? '',
  }));

  /**
   * @function selectRoleOption - A function that selects the role option.
   * @param {SelectOption | null} option - The option to select.
   * @returns The selected role option.
   * @see {@link SelectOption} - The select option enum.
   * @see {@link UserRole} - The user role enum.
   */
  const selectRoleOption = (option: SelectOption | null) => {
    setSelectedUserEmails(
      users
        .filter((u) => {
          switch (option) {
            case SelectOption.ClearAll:
              return false;
            case SelectOption.SelectAdmins:
              return u.role.toLowerCase() === UserRole.Admin;
            case SelectOption.SelectTrainers:
              return u.role.toLowerCase() === UserRole.Trainer;
            case SelectOption.SelectClients:
              return u.role.toLowerCase() === UserRole.Client;
            case SelectOption.SelectAll:
              return true;
            default:
              return false;
          }
        })
        .map((u) => u.email as string),
    );
    setSelectOption(option);
  };
  const closeModalHandler = () => {
    setSelectedUserEmails([]);
    form.setValues(initialValues);
    close();
  };

  /**
   * @function handleSubmit - A function that handles the form submission.
   * @param {string} mailSubject - The mail subject.
   * @returns The result of the form submission.
   * @see {@link sendMailTemplate}
   */
  const handleSubmit = (mailSubject: string) => {
    sendMailTemplate(selectedUserEmails, mailSubject);
  };

  return (
    <Modal
      title={t('mailTemplateActionButton.Send mail')}
      opened={opened}
      onClose={closeModalHandler}
      size="600px"
    >
      <Container p="0">
        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values.mailSubject);
            closeModalHandler();
          })}
        >
          <TextInput
            styles={{ label: { fontSize: '24px' } }}
            label={t('sendMailTemplateModal.Mail Subject')}
            description={t('sendMailTemplateModal.Short mail summary')}
            placeholder={t('sendMailTemplateModal.Mail Subject')}
            {...form.getInputProps('mailSubject')}
          />

          <MultiSelectWithAvatar
            label={t('sendMailTemplateModal.Send to')}
            placeholder={t('sendMailTemplateModal.Select users')}
            options={multiSelectWithAvatarOptions}
            value={selectedUserEmails}
            error={form.getInputProps('selectedUserEmailsLength').error}
            setValue={(value) => {
              form.setFieldError('selectedUserEmailsLength', null);
              setSelectedUserEmails(value);
            }}
          ></MultiSelectWithAvatar>

          <Stack w="200px">
            <Select
              label={t('sendMailTemplateModal.Select users by role')}
              description={t('sendMailTemplateModal.SelectRole')}
              placeholder={t('sendMailTemplateModal.Pick users')}
              onChange={(value) =>
                selectRoleOption(value as SelectOption | null)
              }
              data={selectOptions}
            />
            <Button mt="20px" type="submit" loading={isSending}>
              {t('sendMailTemplateModal.SendMail', {
                count: selectedUserEmails.length,
              })}
            </Button>
          </Stack>
        </form>
      </Container>
    </Modal>
  );
};

export default SendMailTemplateModal;
