import axiosService from './axiosService';
import { Colors } from '../types/Theme';

/**
 * @function getAllColors - This service is used to get all colors for the theme.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<Colors>} The result of the get all colors request.
 */
export const getAllColors = async () => {
  const res = await axiosService.get('/theme');
  return res.data;
};

/**
 * @function setAllColors - This service is used to set all colors for the theme.
 * @async
 * @param {Colors} colors - The colors to set.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the set all colors request.
 */
export const setAllColors = async (colors: Colors) => {
  return await axiosService.post('/theme', {
    colors,
  });
};
