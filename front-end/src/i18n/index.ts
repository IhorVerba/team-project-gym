import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANGUAGES, LOCALS } from './constants';
import { navbarTranslations } from './translation/components/navbar';
import { rolesTranslations } from './translation/utils/roles';
import { notificationTranslations } from './translation/utils/notification';
import { profileFormTranslations } from './translation/components/profileForm';
import { changePasswordModalTranslations } from './translation/components/changePasswordModal';
import { changePasswordFormTranslations } from './translation/components/changePasswordForm';
import { passwordFormTranslations } from './translation/components/passwordForm';
import { passwordRequirementsTranslations } from './translation/components/passwordRequirements';
import { userReportDesignTranslations } from './translation/components/userReportDesign';
import { monthReportPageTranslations } from './translation/pages/MonthReportPage';
import { reportConfigurationPageTranslation } from './translation/pages/ReportConfigurationPage';
import { ForgotPasswordPageTranslation } from './translation/pages/ForgotPasswordPage';
import { ResetPasswordPageTranslation } from './translation/pages/ResetPasswordPage';
import { TrainingDetailsPageTranslation } from './translation/pages/TrainingDetailsPage';
import { loginFormTranslation } from './translation/components/loginForm';
import { backendTranslation } from './translation/utils/backend';
import { userPageModalTranslations } from './translation/components/userPageModal';
import { confirmModalTranslations } from './translation/components/confirmModal';
import { trainerPageTranslations } from './translation/pages/trainerPage';
import { userPageHeaderTranslations } from './translation/components/userPageHeader';
import { clientFiltersTranslations } from './translation/utils/clientFilters';
import { userExerciseFormTranslations } from './translation/components/userExerciseForm';
import { userExerciseModalTranslations } from './translation/components/userExerciseModal';
import { trainingCreationPageTranslations } from './translation/pages/trainingCreationPage';
import { trainingCreationUsersModalTranslations } from './translation/components/trainingCreationUsersModal';
import { trainingCreationExerciseModalTranslations } from './translation/components/trainingCreationExerciseModal';
import { trainingPageModalTranslations } from './translation/components/trainingPageModal';
import { exercisesListTranslations } from './translation/components/exercisesList';
import { imageUploaderTranslations } from './translation/components/imageUploader';
import { trainingListTranslations } from './translation/components/trainingList';
import { userDetailsTrainingCardTranslations } from './translation/components/userDetailsTrainingCard';
import { userDetailsTrainerCardTranslations } from './translation/components/userDetailsTrainerCard';
import { hooksTranslations } from './translation/hooks/hooks';
import { companyPageTranslations } from './translation/pages/companyPage';
import { adminPageTranslations } from './translation/pages/adminPage';
import { exercisePageTranslations } from './translation/pages/exercisePage';
import { exerciseDetailsPageTranslations } from './translation/pages/exerciseDetailsPage';
import { trainingPageTranslations } from './translation/pages/trainingPage';
import { userDetailsPageTranslations } from './translation/pages/userDetailsPage';
import { exerciseModalTranslations } from './translation/components/exerciseModal';
import { mailTemplateActionButtonTranslation } from './translation/components/mailTemplateActionButton';
import { loadMailTemplateModalTranslation } from './translation/components/loadMailTemplateModal';
import { saveMailTemplateModalTranslation } from './translation/components/saveMailTemplateModal';
import { sendMailTemplateModalTranslation } from './translation/components/sendMailTemplateModal';
import { multiSelectWithAvatarTranslations } from './translation/components/multiSelectWithAvatar';
import { trainingCardTranslations } from './translation/components/trainingCard';
import { verificationPasswordTranslations } from './translation/components/verificationPassword';
import { ErrorPageTranslations } from './translation/pages/ErrorPage';
import { NoResultsTranslations } from './translation/components/noResults';
import { latestExerciseResultsTranslations } from './translation/components/latestExerciseResults';
import { clientStatisticsTranslations } from './translation/components/clientStatistics';
import { minutesSecondsInputTranslations } from './translation/components/minutesSecondsInput';

/**
 * @description The translation object for the English language
 * @type {object}
 * @property {object} translation - The translation object
 */
const enTranslation = {
  ...navbarTranslations.en,
  ...rolesTranslations.en,
  ...notificationTranslations.en,
  ...profileFormTranslations.en,
  ...changePasswordModalTranslations.en,
  ...changePasswordFormTranslations.en,
  ...passwordFormTranslations.en,
  ...passwordRequirementsTranslations.en,
  ...userReportDesignTranslations.en,
  ...monthReportPageTranslations.en,
  ...reportConfigurationPageTranslation.en,
  ...loginFormTranslation.en,
  ...ForgotPasswordPageTranslation.en,
  ...userExerciseFormTranslations.en,
  ...userExerciseModalTranslations.en,
  ...trainingCreationPageTranslations.en,
  ...trainingCreationUsersModalTranslations.en,
  ...trainingCreationExerciseModalTranslations.en,
  ...ResetPasswordPageTranslation.en,
  ...backendTranslation.en,
  ...TrainingDetailsPageTranslation.en,
  ...trainerPageTranslations.en,
  ...userPageModalTranslations.en,
  ...confirmModalTranslations.en,
  ...userPageHeaderTranslations.en,
  ...clientFiltersTranslations.en,
  ...trainingPageModalTranslations.en,
  ...exercisesListTranslations.en,
  ...imageUploaderTranslations.en,
  ...trainingListTranslations.en,
  ...userDetailsTrainingCardTranslations.en,
  ...userDetailsTrainerCardTranslations.en,
  ...hooksTranslations.en,
  ...companyPageTranslations.en,
  ...adminPageTranslations.en,
  ...exercisePageTranslations.en,
  ...exerciseDetailsPageTranslations.en,
  ...trainingPageTranslations.en,
  ...userDetailsPageTranslations.en,
  ...exerciseModalTranslations.en,
  ...mailTemplateActionButtonTranslation.en,
  ...loadMailTemplateModalTranslation.en,
  ...saveMailTemplateModalTranslation.en,
  ...sendMailTemplateModalTranslation.en,
  ...multiSelectWithAvatarTranslations.en,
  ...trainingCardTranslations.en,
  ...verificationPasswordTranslations.en,
  ...ErrorPageTranslations.en,
  ...NoResultsTranslations.en,
  ...latestExerciseResultsTranslations.en,
  ...clientStatisticsTranslations.en,
  ...minutesSecondsInputTranslations.en,
};

/**
 * @description The translation object for the Ukrainian language
 * @type {object}
 * @property {object} translation - The translation object
 */
const uaTranslation = {
  ...navbarTranslations.ua,
  ...rolesTranslations.ua,
  ...notificationTranslations.ua,
  ...profileFormTranslations.ua,
  ...changePasswordModalTranslations.ua,
  ...changePasswordFormTranslations.ua,
  ...passwordFormTranslations.ua,
  ...passwordRequirementsTranslations.ua,
  ...userReportDesignTranslations.ua,
  ...monthReportPageTranslations.ua,
  ...reportConfigurationPageTranslation.ua,
  ...loginFormTranslation.ua,
  ...ForgotPasswordPageTranslation.ua,
  ...userExerciseFormTranslations.ua,
  ...userExerciseModalTranslations.ua,
  ...trainingCreationPageTranslations.ua,
  ...trainingCreationUsersModalTranslations.ua,
  ...trainingCreationExerciseModalTranslations.ua,
  ...ResetPasswordPageTranslation.ua,
  ...backendTranslation.ua,
  ...TrainingDetailsPageTranslation.ua,
  ...trainerPageTranslations.ua,
  ...userPageModalTranslations.ua,
  ...confirmModalTranslations.ua,
  ...userPageHeaderTranslations.ua,
  ...clientFiltersTranslations.ua,
  ...trainingPageModalTranslations.ua,
  ...exercisesListTranslations.ua,
  ...imageUploaderTranslations.ua,
  ...trainingListTranslations.ua,
  ...userDetailsTrainingCardTranslations.ua,
  ...userDetailsTrainerCardTranslations.ua,
  ...hooksTranslations.ua,
  ...companyPageTranslations.ua,
  ...adminPageTranslations.ua,
  ...exercisePageTranslations.ua,
  ...exerciseDetailsPageTranslations.ua,
  ...trainingPageTranslations.ua,
  ...userDetailsPageTranslations.ua,
  ...exerciseModalTranslations.ua,
  ...mailTemplateActionButtonTranslation.ua,
  ...loadMailTemplateModalTranslation.ua,
  ...saveMailTemplateModalTranslation.ua,
  ...sendMailTemplateModalTranslation.ua,
  ...multiSelectWithAvatarTranslations.ua,
  ...trainingCardTranslations.ua,
  ...verificationPasswordTranslations.ua,
  ...ErrorPageTranslations.ua,
  ...NoResultsTranslations.ua,
  ...latestExerciseResultsTranslations.ua,
  ...clientStatisticsTranslations.ua,
  ...minutesSecondsInputTranslations.ua,
};

/**
 * @description The resources object for the i18next library
 * @type {object}
 * @property {object} en - The English translation object
 * @property {object} ua - The Ukrainian translation object
 */
const resources = {
  [LOCALS[LANGUAGES.EN]]: {
    translation: enTranslation,
  },
  [LOCALS[LANGUAGES.UK]]: {
    translation: uaTranslation,
  },
};

const enResource = resources[LOCALS[LANGUAGES.EN]];
export type resourcesType = typeof enResource;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    fallbackLng: LOCALS[LANGUAGES.UK],

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
