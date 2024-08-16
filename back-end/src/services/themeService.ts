/* eslint-disable @typescript-eslint/no-explicit-any */
import Theme from '../models/Theme';

/**
 * @type The colors object type
 * @property {string} primaryColor - the primary color
 * @property {string} secondaryColor - the secondary color
 * @property {string} backgroundColor - the background color
 */
type ColorsType = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
};

/**
 * @class The Colors class
 * @property {ColorsType} colors - the colors object
 * @constructor Creates an instance of the Colors class
 */
class Colors {
  colors: ColorsType;
  constructor(colors: ColorsType) {
    this.colors = colors;
  }
}

/**
 * @function getColorsService
 * @description Get the colors from the database
 * @returns {Promise<ColorsType>} a promise that resolves with the colors object
 * @throws {Error} - if the theme is not found
 */
export const getColorsService = async () => {
  const theme = await Theme.findOne();
  if (!theme) {
    throw new Error('Theme not found');
  }
  return {
    primaryColor: theme.primaryColor,
    secondaryColor: theme.secondaryColor,
    backgroundColor: theme.backgroundColor,
  };
};

/**
 * @function setColorsService
 * @description Set the colors in the database
 * @param {ColorsType} colors - the colors object
 * @returns {Promise<void>} a promise that resolves when the colors are set
 * @throws {Error} - if the color format is invalid
 */
export const setColorsService = async ({
  primaryColor,
  secondaryColor,
  backgroundColor,
}: ColorsType) => {
  const colors = new Colors({ primaryColor, secondaryColor, backgroundColor });
  if (!checkColors(colors.colors)) {
    throw new Error('Invalid color format');
  }

  try {
    const theme = await Theme.findOne();
    if (!theme) {
      const newTheme = new Theme(colors.colors);
      await newTheme.save();
    } else {
      await Theme.updateOne({}, colors.colors);
    }
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

/**
 * @function checkColor
 * @description Check if the color is valid
 * @param {string} color - the color
 * @returns {boolean} true if the color is valid, false otherwise
 */
const checkColor = (color: string) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * @function checkColors
 * @description Check if the colors are valid
 * @param {ColorsType} colors - the colors object
 * @returns {boolean} true if the colors are valid, false otherwise
 */
const checkColors = (colors: ColorsType) => {
  return Object.values(colors).every(checkColor);
};
