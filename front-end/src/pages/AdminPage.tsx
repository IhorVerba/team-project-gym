import { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Flex, Pagination } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { User } from '../types/User';
import UserRole from '../types/UserRole';
import notification from '../utils/notification';
import searchUser from '../utils/search';
import {
  createUserWithRole,
  getAllUsers,
  getDisabledUsers,
} from '../services/userService';
import usePagination from '../hooks/usePagination';
import { UserPageModal } from '../components/UserPageModal';
import { UserPageHeader } from '../components/UserPageHeader/UserPageHeader';
import { UsersList } from '../components/UsersList';
import { sectionProps } from '../styles/styleProps';
import { useFilterContext } from '../context/FilterContext';
import UserFilter from '../types/UserFilter';
import { useTranslation } from 'react-i18next';
import TopScrollButton from '../components/ui/TopScrollButton';

/**
 * @function AdminPage
 * @description This component of page is used to show admin page. It's used to show all (active and disabled) users and create new user.
 * @see {@link UserPageModal} component
 * @see {@link UserPageHeader} component
 * @see {@link UsersList} component
 * @see {@link Loader} component
 * @returns AdminPage component
 */
const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  const { t } = useTranslation();

  const { searchValue, setSearchValue, selectedFilter, setSelectedFilter } =
    useFilterContext();

  const filteredUsers = searchUser(users, searchValue);

  const {
    currentPage,
    currentItems: currentUsers,
    totalPages,
    handleChangePage,
    setCurrentPage,
  } = usePagination(filteredUsers, searchValue);

  const clearFilters = () => {
    setSelectedFilter(UserFilter.AllUsers);
    setSearchValue('');
  };

  useLayoutEffect(() => {
    clearFilters();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);

  const [opened, { open, close }] = useDisclosure(false);

  // #region Get all users
  /**
   * @description Fetches all users based on selected filter. If selected filter is AllUsers, fetches all users. If selected filter is Disabled, fetches disabled users. If fetch is successful, sets users state.
   * @see {@link getAllUsers} function from userService
   * @see {@link getDisabledUsers} function from userService
   * @see {@link notification} function from utils
   * @returns void - sets users state
   * @throws error notification - if cannot fetch users
   */

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const users =
        selectedFilter === UserFilter.AllUsers
          ? await getAllUsers()
          : selectedFilter === UserFilter.Disabled
            ? await getDisabledUsers()
            : [];

      setUsers(users);
    } catch (error) {
      notification({
        type: 'error',
        message: t('adminDetailsPage.cannotFetch'),
      });
    } finally {
      setUsersLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchUsers();
  }, [selectedFilter]);
  // #endregion
  // #region Create user
  /**
   * @description Creates new user. If successful, shows success notification and closes modal. If unsuccessful, shows error notification. Sets loading state of modal button.
   * @param {User} user - user object with email, firstName, lastName, role and phoneNumber
   * @see {@link createUserWithRole} function from userService
   * @see {@link notification} function from utils
   * @returns void - creates user
   * @throws error notification - if cannot create user
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
      await createUserWithRole(newUser);
      notification({
        type: 'success',
        message: t('notification.UserSuccessfullyCreated'),
      });
      fetchUsers();
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
    <Container size="responsive" maw="1440px" mah="100vh" p={0}>
      <UserPageModal
        onCreate={handleCreateUser}
        opened={opened}
        close={close}
        text={t('adminDetailsPage.createUser')}
        userRole={UserRole.Admin}
        isCreate
        loading={modalLoading}
      />
      <Flex direction="column" justify="start">
        <UserPageHeader
          pageTitle={t('adminDetailsPage.users')}
          buttonTitle={t('adminDetailsPage.createUser')}
          sectionProps={sectionProps}
          open={open}
          userRole={UserRole.Admin}
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
              mb={70}
              mx={0}
              gap={5}
            />
          </Flex>
        </Container>
      </Flex>
      <TopScrollButton />
    </Container>
  );
};

export default AdminPage;
