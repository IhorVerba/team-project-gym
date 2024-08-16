import { Text, Group, Container } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from './UserProfileHeader.module.scss';
import UserRole from '../../types/UserRole';
import UserProfileImageUploader from '../UserProfileImageUploader/UserProfileImageUploader';
import { useTranslation } from 'react-i18next';

/**
 * @interface UserProfileHeaderProps - interface for UserProfileHeader component
 * @property {string} photoUrl - user photo URL
 * @property {string} email - user email
 * @property {string} firstName - user first name
 * @property {string} lastName - user last name
 * @property {string} phoneNumber - user phone number
 * @property {UserRole} role - user role
 * @see {@link UserRole} for UserRole enum
 */
interface UserProfileHeaderProps {
  photoUrl?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
}

/**
 * @function UserProfileHeader
 * @description - This component renders a header for user profile
 * @param {UserProfileHeaderProps} props
 * @returns {JSX.Element} - Rendered UserProfileHeader component
 * @see {@link UserProfileHeaderProps} for UserProfileHeaderProps interface
 * @see {@link UserProfileImageUploader} for UserProfileImageUploader component
 */
export function UserProfileHeader({
  email,
  firstName,
  lastName,
  phoneNumber,
  photoUrl,
  role,
}: UserProfileHeaderProps) {
  const { t } = useTranslation();

  return (
    <Container p={0} m={0}>
      <Group wrap="nowrap" justify="center">
        <UserProfileImageUploader
          photoUrl={photoUrl as string}
          firstName={firstName}
          lastName={lastName}
        />
        <div>
          <Text fz="sm" tt="uppercase" fw={700}>
            {t(`role.${role}`)}
          </Text>

          <Text fz="lg" fw={600} className={classes.name}>
            {`${firstName} ${lastName}`}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="sm">{email}</Text>
          </Group>

          {phoneNumber && (
            <Group wrap="nowrap" gap={10} mt={5}>
              <IconPhoneCall
                stroke={1.5}
                size="1rem"
                className={classes.icon}
              />
              <Text fz="sm">{phoneNumber}</Text>
            </Group>
          )}
        </div>
      </Group>
    </Container>
  );
}
