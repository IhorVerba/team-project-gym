import { AppShell, Container, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { NavbarLink } from '../../types/NavbarLink';
import { generateNavLinks } from '../../utils/generateNavLinks';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import classes from './Navbar.module.scss';

/**
 * @function Navbar - A component that displays the navbar.
 * @param {Function} close - The function to close the navbar.
 * @returns The Navbar component.
 * @see {@link NavbarLink} - The navbar link object.
 * @see {@link generateNavLinks} - The function to generate the navbar links.
 */
const Navbar = ({ close }: { close: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { t } = useTranslation();

  /**
   * @function handleLogout - A function that handles the logout.
   * @description The function logs out the user and navigates to the login page.
   * @returns The result of logout function.
   * @see {@link logout} - The logout function.
   * @see {@link navigate} - The navigate function.
   */
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppShell.Navbar p="xs" bg="background-color.0">
      <nav className={classes.navbar}>
        <Container
          className={classes.navbarMain}
          p={0}
          c="primary-color.8"
          fw={400}
        >
          {generateNavLinks()?.map(
            (item: NavbarLink) =>
              item.link !== '' && (
                <NavLink
                  to={item.link}
                  className={classes.link}
                  data-active={
                    location.pathname === item.link ? true : undefined
                  }
                  key={item.label}
                  onClick={close}
                >
                  {item.icon && (
                    <item.icon className={classes.linkIcon} stroke={1.5} />
                  )}
                  <span>{item.label}</span>
                </NavLink>
              ),
          )}
        </Container>

        <div className={classes.footer}>
          <NavLink
            to="/login"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <Text fz="sm" fw={500}>
              {t('navbar.Logout')}
            </Text>
          </NavLink>
        </div>
      </nav>
    </AppShell.Navbar>
  );
};

export default Navbar;
