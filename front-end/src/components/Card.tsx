import { Text, Paper, Flex } from '@mantine/core';
import { User } from '../types/User';
import UserRole from '../types/UserRole';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Avatar from './ui/Avatar';
import '../styles/pointer.scss';
import {
  cardPaperProps,
  cardFlexProps,
  cardTitleProps,
} from '../styles/styleProps';
import truncate from '../utils/truncate';
import wrapEmail from '../utils/wrapEmail';

/**
 * @function Props - Card component props
 * @param {User} user - user object
 * @see {@link User} for user object
 */
interface Props {
  user: User;
}

/**
 * @function Card
 * @description Card component that displays user information
 * @param {Props} props - Card component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for Card component props
 * @see {@link User} for user object
 */
export const Card: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const { user: LoggedUser } = useAuthContext();
  const { _id, email, firstName, lastName, role, photoUrl } = user;

  /**
   * @function handleDetailRedirect
   * @description Function that redirects to user detail page based on user role after card click
   * @returns {void} result of navigation
   */
  const handleDetailRedirect = () => {
    switch (LoggedUser?.role) {
      case UserRole.Admin: {
        if (role === UserRole.Trainer || role === UserRole.Admin) {
          return navigate(`/admin/users/${_id}`);
        }
        break;
      }
      case UserRole.Trainer: {
        return navigate(`/clients/${_id}`);
      }
    }
  };

  return (
    <>
      <Paper
        {...cardPaperProps}
        onClick={handleDetailRedirect}
        style={{
          cursor:
            LoggedUser?.role === UserRole.Admin && role === UserRole.Client
              ? 'default'
              : 'pointer',
        }}
      >
        <Flex direction="column" {...cardFlexProps}>
          <Avatar
            photoUrl={photoUrl as string}
            firstName={firstName}
            lastName={lastName}
            size={120}
          />
          <Text ta="center" {...cardTitleProps}>
            {`${truncate(firstName, 8)} ${truncate(lastName, 8)}`}
          </Text>
          <Text ta="center" c="dimmed" fz="md">
            {`${wrapEmail(email)} • ${role}`}
          </Text>
        </Flex>
      </Paper>
    </>
  );
};
