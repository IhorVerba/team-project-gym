import UserRole from '../../../types/UserRole';

/**
 * @constant rolesTranslations - The translations for the user roles
 * @type {object}
 * @property {object} en - The English translations
 * @property {object} ua - The Ukrainian translations
 * @property {object} role - The role translations
 * @see {@link UserRole} for more information on the UserRole enum
 */
export const rolesTranslations = {
  en: {
    role: {
      [UserRole.Admin]: UserRole.Admin,
      [UserRole.Trainer]: UserRole.Trainer,
      [UserRole.Client]: UserRole.Client,
    },
  },
  ua: {
    role: {
      [UserRole.Admin]: 'Адміністратор',
      [UserRole.Trainer]: 'Тренер',
      [UserRole.Client]: 'Клієнт',
    },
  },
};
