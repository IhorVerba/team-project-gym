import dayjs from 'dayjs';

/**
 * @function formatDate - format date to string with format 'DD MMMM HH:mm'
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date.
 * @see {@link https://day.js.org/docs/en/display/format | dayjs.format()} for more information on date formatting.
 */
export const formatDate = (date: Date) => {
  return `${dayjs(date).format('DD MMMM HH:mm')}`;
};

/**
 * @function formatDateShort - format date to string with format 'DD MMMM'
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date.
 * @see {@link https://day.js.org/docs/en/display/format | dayjs.format()} for more information on date formatting.
 */
export const formatDateShort = (date: Date) => {
  return `${dayjs(date).format('DD MMMM')}`;
};

/**
 * @function dataFormatter - A function that formats the data. It uses the Intl.NumberFormat to format the number. It
 * @param {number} number - The number to format.
 * @returns the formatted number as a string in the uk-UA format
 */
export const dataFormatter = (number: number) =>
  Intl.NumberFormat('uk-UA').format(number).toString();
