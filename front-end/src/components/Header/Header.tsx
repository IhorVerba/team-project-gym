import {
  AppShell,
  Burger,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { useAuthContext } from '../../context/AuthContext';
import UserRole from '../../types/UserRole';
import { LanguagePicker } from '../ui/LanguagePicker/LanguagePicker';
import { useMediaQuery } from '@mantine/hooks';

/**
 * @function Header - A component that displays the header of the application.
 * @param {boolean} opened - The opened state of the header.
 * @param {() => void} toggle - The function to toggle the header.
 * @returns The Header component.
 * @see {@link Burger} - The burger component.
 * @see {@link Avatar} - The avatar component.
 * @see {@link LanguagePicker} - The language picker component.
 */
const Header = ({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) => {
  const isMobile = useMediaQuery('(width < 768px)');

  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: 'pop-top-right' }}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              onClick={() =>
                navigate(user?.role === UserRole.Admin ? 'admin/me' : 'me')
              }
            >
              <Group gap={7}>
                <Avatar
                  photoUrl={user?.photoUrl as string}
                  firstName={user?.firstName[0] as string}
                  lastName={user?.lastName[0] as string}
                  size={30}
                  fontSize={12}
                  isVertical
                />
                <Text fw={500} size="md" ml={5} lh={1} mr={3}>
                  {isMobile
                    ? `${user?.firstName.slice(0, 5)} ${user?.lastName[0].toUpperCase()}.`
                    : `${user?.firstName} ${user?.lastName}`}
                </Text>
              </Group>
            </UnstyledButton>
          </Menu.Target>
        </Menu>
        <LanguagePicker />
      </Group>
    </AppShell.Header>
  );
};

export default Header;
