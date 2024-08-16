/**
 * @function capitalizeFirstLetter - Capitalizes the first letter of a string.
 * @param {string} inputString - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (inputString: string): string => {
  return `${inputString.charAt(0).toUpperCase()}${inputString.slice(1)}`;
};
