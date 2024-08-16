import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

/**
 * @function Layout - A component that displays the layout of the application.
 * @returns The Layout component.
 * @see {@link AppShell} - The app shell component.
 * @see {@link Header} - The header component.
 * @see {@link Navbar} - The navbar component.
 * @see {@link Outlet} - The outlet component.
 */
const Layout = () => {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Header opened={opened} toggle={toggle} />
      <Navbar close={close} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
