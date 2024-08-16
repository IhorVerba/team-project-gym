import colors from './colors';
/**
 * @interface ColorShade
 * @property {string} key - The key of the color shade.
 * @property {string} value - The value of the color shade.
 */
interface ColorShade {
  [key: number]: string;
}
/**
 * @function mapHexToTailwindColor - This function is used to map a HEX color to the closest Tailwind CSS color.
 * @param {string} hexColor - The HEX color to map.
 * @returns {string} The closest Tailwind CSS color.
 * @throws error if no matching color is found in Tailwind colors.
 */
export const mapHexToTailwindColor = (hexColor: string): string => {
  let closestMatch: string | null = null;
  let closestDistance = Infinity;

  for (const colorName in colors) {
    const shades: ColorShade = colors[colorName];
    for (const shade in shades) {
      const distance = colorDistance(hexColor, shades[parseInt(shade)]);
      if (!isNaN(distance) && distance < closestDistance) {
        closestDistance = distance;
        closestMatch = `${colorName}-${shade}`;
      }
    }
  }

  if (closestMatch === null) {
    throw new Error('No matching color found in tailwind colors.');
  }

  return closestMatch;
};

/**
 * @function colorDistance - This function is used to calculate the distance between two colors.
 * @param {string} hexColor1 - The first HEX color.
 * @param {string} hexColor2 - The second HEX color.
 * @returns {number} The distance between the two colors.
 */
const colorDistance = (hexColor1: string, hexColor2: string): number => {
  const rgb1 = hexToRgb(hexColor1);
  const rgb2 = hexToRgb(hexColor2);

  if (!rgb1 || !rgb2) {
    return NaN;
  }

  return Math.sqrt(
    Math.pow(rgb2.r - rgb1.r, 2) +
      Math.pow(rgb2.g - rgb1.g, 2) +
      Math.pow(rgb2.b - rgb1.b, 2),
  );
};

/**
 * @function hexToRgb - This function is used to convert a HEX color to an RGB color.
 * @param {string} hex - The HEX color to convert.
 * @returns {object} The RGB color object.
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }
  const shorthandResult = shorthandRegex.exec(hex);
  if (shorthandResult) {
    return {
      r: parseInt(shorthandResult[1] + shorthandResult[1], 16),
      g: parseInt(shorthandResult[2] + shorthandResult[2], 16),
      b: parseInt(shorthandResult[3] + shorthandResult[3], 16),
    };
  }

  return null;
};
