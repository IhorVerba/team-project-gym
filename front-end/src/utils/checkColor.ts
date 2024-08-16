import { Colors } from '../types/Theme';

/**
 * @function checkColor - This function is used to check if the color is valid in HEX format.
 * @param {string} color
 * @returns {boolean} The result of the check color request.
 */
export const checkColor = (color: string) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * @function checkAllColors - This function is used to check if all colors are valid in HEX format.
 * @param {Colors} colors object
 * @returns {boolean} The result of the check all colors request.
 */
const checkAllColors = (colors: Colors) => {
  return Object.values(colors).every(checkColor);
};

export default checkAllColors;
