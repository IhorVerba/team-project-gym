import notification from './notification';
import i18n from '../i18n/index';

/**
 * @description Requirements for password strength
 * @type {Array<{re: RegExp, label: string}>}
 */
export const requirements: Array<{ re: RegExp; label: string }> = [
  { re: /[0-9]/, label: i18n.t('passwordRequirements.IncludesNumber') },
  {
    re: /\p{Ll}/u,
    label: i18n.t('passwordRequirements.IncludesLowercaseLetter'),
  },
];

/**
 * @function getStrength - Get the strength of a password
 * @param {string} password - The password to check
 * @returns {number} The strength of the password
 */
export function getStrength(password: string): number {
  let multiplier = password.length > 5 ? 0 : 1;
  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });
  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

/**
 * @function isPasswordInputsCorrect - Check if the password inputs are correct
 * @param {string} password - The password input
 * @param {string} confirmedPassword - The confirmed password input
 * @returns {boolean} Whether the password inputs are correct or not
 */
export const isPasswordInputsCorrect = (
  password: string,
  confirmedPassword: string,
): boolean => {
  const isPasswordMatched = password === confirmedPassword;
  const strength = getStrength(password);
  if (!isPasswordMatched) {
    notification({
      type: 'error',
      message: i18n.t('notification.PasswordNotMatch'),
    });
    return false;
  }
  if (strength !== 100) {
    notification({
      type: 'error',
      message: i18n.t('notification.PasswordNotReliable'),
    });
    return false;
  }
  return true;
};
