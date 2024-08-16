import { UserProfileHeader } from '../components/UserProfileHeader/UserProfileHeader';
import { Center, Container } from '@mantine/core';
import { useAuthContext } from '../context/AuthContext';
import UserProfileForm from '../components/UserProfileForm/UserProfileForm';
import Loader from '../components/ui/Loader/Loader';
import { useEffect } from 'react';

/**
 * @function ProfilePage
 * @description This component of page is used to show profile page.
 * @see {@link UserProfileHeader} component
 * @see {@link UserProfileForm} component
 * @see {@link Loader} component
 * @returns ProfilePage component
 */
const ProfilePage = () => {
  const { user } = useAuthContext();
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return !user ? (
    <Center>
      <Loader />
    </Center>
  ) : (
    <Container
      w={{ base: '100%', xs: 500 }}
      p={0}
      style={{ overflowY: 'hidden' }}
    >
      <UserProfileHeader {...user} />
      <UserProfileForm />
    </Container>
  );
};

export default ProfilePage;
