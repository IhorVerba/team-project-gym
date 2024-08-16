import UserFilter from '../types/UserFilter';
import UserRole from '../types/UserRole';
import i18n from '../i18n';

/**
 * @function getAdminFilterTabs - This function is used to get the filter tabs for the admin.
 * @returns {Array} The array of filtered tabs for the admin.
 * @see {@link UserFilter} for more information on user filters.
 */
const getAdminFilterTabs = () => {
  return [
    { label: i18n.t('clientFilters.AllUsers'), value: UserFilter.AllUsers },
    { label: i18n.t('clientFilters.Disabled'), value: UserFilter.Disabled },
  ];
};

const getTrainerFilterTabs = () => {
  return [
    { label: i18n.t('clientFilters.OwnUsers'), value: UserFilter.OwnUsers },
    { label: i18n.t('clientFilters.AllUsers'), value: UserFilter.AllUsers },
    { label: i18n.t('clientFilters.Disabled'), value: UserFilter.DisabledClients },
  ];
};

/**
 * @function getTrainerFilterTabs - This function is used to get the filter tabs for the trainer.
 * @returns {Array} The array of filtered tabs for the trainer.
 * @see {@link UserFilter} for more information on user filters.
 */
const getTrainingFilterTabs = () => {
  return [
    { label: i18n.t('clientFilters.OwnTrainings'), value: UserFilter.OwnTrainigns },
    { label: i18n.t('clientFilters.AllTrainings'), value: UserFilter.AllTrainigns },
  ];
};

/**
 * @function generateTabs - This function is used to generate the tabs based on the user role.
 * @param {UserRole} role - The role of the user. This will determine the tabs to be generated.
 * @returns {Array} The array of filtered tabs based on the user role.
 * @see {@link UserRole} for more information on user roles.
 * @see {@link getAdminFilterTabs} for more information on admin filter tabs.
 * @see {@link getTrainerFilterTabs} for more information on trainer filter tabs.
 */
export const generateTabs = (
  role: UserRole | undefined,
  isTraining?: boolean,
) => {
  if (role === UserRole.Admin) return getAdminFilterTabs();
  else if (role === UserRole.Trainer && isTraining)
    return getTrainingFilterTabs();
  else if (role === UserRole.Trainer) return getTrainerFilterTabs();
  else return [];
};
