import { useAuthContext } from '../context/AuthContext';
import UserRole from '../types/UserRole';
import { NavbarLink } from '../types/NavbarLink';
import i18n from '../i18n';
import {
  IconClipboardText,
  IconStretching2,
  IconUser,
  IconUsers,
  IconHomeEdit,
  IconMail,
  IconReportAnalytics,
} from '@tabler/icons-react';

/**
 * @constant isMobile - Check if the screen width is less than 768px
 */
const isMobile = window.innerWidth < 768;

/**
 * @function generateTrainerNavLinks - Generate navigation links for trainers
 * @returns {Array<NavbarLink>} Array of NavbarLink objects
 * @see {@link NavbarLink} for more information
 */
const generateTrainerNavLinks = (): NavbarLink[] => {
  return [
    { link: '/me', label: i18n.t('navbar.Profile'), icon: IconUser },
    { link: '/clients', label: i18n.t('navbar.Clients'), icon: IconUsers },
    {
      link: '/trainings',
      label: i18n.t('navbar.Trainings'),
      icon: IconClipboardText,
    },
    {
      link: '/exercises',
      label: i18n.t('navbar.Exercises'),
      icon: IconStretching2,
    },
    {
      link: '/user-report',
      label: i18n.t('navbar.UserReport'),
      icon: IconReportAnalytics,
    },
  ];
};

/**
 * @function generateAdminNavLinks - Generate navigation links for admins
 * @returns {Array<NavbarLink>} Array of NavbarLink objects
 * @see {@link NavbarLink} for more information
 */
const generateAdminNavLinks = (): NavbarLink[] => {
  return [
    { link: '/admin/me', label: i18n.t('navbar.Profile'), icon: IconUser },
    { link: '/admin/users', label: i18n.t('navbar.Users'), icon: IconUsers },
    {
      link: '/admin/company',
      label: i18n.t('navbar.WebsiteEditor'),
      icon: IconHomeEdit,
    },
    !isMobile
      ? {
        link: '/admin/mail-constructor',
        label: i18n.t('navbar.EmailConstructor'),
        icon: IconMail,
      }
      : {
        link: '',
      },
  ];
};

/**
 * @function generateNavLinks - Generate navigation links based on the user's role
 * @returns {Array<NavbarLink>} Array of NavbarLink objects
 * @see {@link NavbarLink} for more information
 * @see {@link generateAdminNavLinks} for more information
 * @see {@link generateTrainerNavLinks} for more information
 */
export const generateNavLinks = () => {
  const { user } = useAuthContext();

  switch (user?.role) {
    case UserRole.Admin:
      return generateAdminNavLinks();

    case UserRole.Trainer:
      return generateTrainerNavLinks();
  }
};
