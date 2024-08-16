import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Flex, Pagination } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { User } from '../../types/User';
import notification from '../../utils/notification';
import searchUser from '../../utils/search';
import { UserPageModal } from '../../components/UserPageModal';
import { UserPageHeader } from '../../components/UserPageHeader/UserPageHeader';
import { UsersList } from '../../components/UsersList';
import { useAuthContext } from '../../context/AuthContext';
import {
  fetchClients,
  createUserWithRole,
  fetchDisabledClients,
} from '../../services/userService';
import UserRole from '../../types/UserRole';
import usePagination from '../../hooks/usePagination';
import { sectionProps } from '../../styles/styleProps';
import { useFilterContext } from '../../context/FilterContext';
import UserFilter from '../../types/UserFilter';
import { useTranslation } from 'react-i18next';
import TopScrollButton from '../../components/ui/TopScrollButton';

/**
 * @function TrainerPage
 * @description This component of page is used to show trainer page. It's used to show all clients or client of trainer and create new client.
 * @see {@link UserPageModal} component
 * @see {@link UserPageHeader} component
 * @see {@link UsersList} component
 * @see {@link Loader} component
 * @returns TrainerPage component
 */
const TrainerPage: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const { user, fetchUser } = useAuthContext();
  const trainerId = user?._id ?? '';

  const { searchValue, setSearchValue, selectedFilter, setSelectedFilter } =
    useFilterContext();

  const filteredUsers = searchUser(users, searchValue);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);

  const clearFilters = () => {
    setSelectedFilter(UserFilter.OwnUsers);
    setSearchValue('');
  };

  const {
    currentPage,
    currentItems: currentUsers,
    totalPages,
    handleChangePage,
    setCurrentPage,
  } = usePagination(visibleUsers, searchValue);

  useEffect(() => {
    clearFilters();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);

  const [opened, { open, close }] = useDisclosure(false);

  // #region CRUD
  /**
   * @description Fetches all users and sets users state. Shows error message if it's not successful.
   * @see {@link fetchClients} function from userService
   * @see {@link notification} component from utils
   * @returns void - sets users state
   * @throws error notification - if fetching users is not successful
   */
  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      let users: User[] = [];

      if (selectedFilter === UserFilter.DisabledClients) {
        users = await fetchDisabledClients();
      } else {
        users = await fetchClients();
      }

      setUsers(users);
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CanNotFetchUsers'),
      });
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedFilter]);

  useLayoutEffect(() => {
    let filtered: User[] = [];

    switch (selectedFilter) {
      case UserFilter.OwnUsers:
        filtered = filteredUsers.filter((user) =>
          user?.trainerIds?.includes(trainerId as string),
        );
        break;
      case UserFilter.AllUsers:
        filtered = filteredUsers;
        break;
      case UserFilter.DisabledClients:
        filtered = filteredUsers;
        break;
    }

    setVisibleUsers(filtered);
    setCurrentPage(1);
  }, [selectedFilter, searchValue, users]);

  /**
   * @description Creates new user. Shows success message if it's successful, error message if it's not. Shows loader when creating user.
   * @param user - user to create (email, firstName, lastName, role, phoneNumber)
   * @see {@link createUserWithRole} function from userService
   * @see {@link handleUpdateTrainer} function from this component
   * @see {@link notification} component from utils
   * @returns void - creates user
   * @throws error notification - if creating user is not successful
   */
  const handleCreateUser = async ({
    email,
    firstName,
    lastName,
    role,
    phoneNumber,
  }: User) => {
    setModalLoading(true);

    const newUser = {
      email,
      firstName,
      lastName,
      role,
      phoneNumber,
    };

    try {
      //now when trainer create client, it automatically pushClientId to his clientIds
      await createUserWithRole(newUser);
      await fetchUser();
      await fetchUsers();
      notification({
        type: 'success',
        message: t('notification.UserSuccessfullyCreated'),
      });
      close();
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.CannotCreateUser'),
      });
    } finally {
      setModalLoading(false);
    }
  };

  // #endregion

  return (
    <>
      <UserPageModal
        onCreate={handleCreateUser}
        trainerId={trainerId}
        opened={opened}
        close={close}
        userRole={UserRole.Client}
        text={t('trainerPage.createClient')}
        isCreate={true}
        loading={modalLoading}
        phoneNumberIsNotRequired={true}
      />
      <Container size="responsive" maw="1440px" p={0}>
        <UserPageHeader
          pageTitle={t('trainerPage.clients')}
          buttonTitle={t('trainerPage.createClient')}
          sectionProps={sectionProps}
          open={open}
          userRole={UserRole.Trainer}
          loading={usersLoading}
        />

        <Container {...sectionProps} p={0}>
          <Flex direction="column" align="center" gap="md">
            <UsersList visibleUsers={currentUsers} loading={usersLoading} />

            <Pagination
              value={currentPage}
              total={totalPages}
              onChange={handleChangePage}
              boundaries={1}
              siblings={1}
              mb={50}
              mx={0}
              gap={5}
            />
          </Flex>
        </Container>
        <TopScrollButton />
      </Container>
    </>
  );
};

export default TrainerPage;
