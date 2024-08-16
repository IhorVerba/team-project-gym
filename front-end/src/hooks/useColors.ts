import { useState, useEffect } from 'react';
import notification from '../utils/notification';
import { getAllColors, setAllColors } from '../services/themeService';
import checkAllColors from '../utils/checkColor';
import { Colors } from '../types/Theme';
import { AxiosError } from 'axios';
import { useMantineTheme } from '@mantine/core';
import { mapHexToTailwindColor } from '../utils/colorUtils';
import { useTranslation } from 'react-i18next';

/**
 * @function useColors - A custom hook that handles the colors state and logic.
 * @returns The colors state and the functions to update it.
 * @see {@link useState} - A React hook that allows the use of state in a functional component.
 */
const useColors = () => {
  const [colors, setColors] = useState({
    primaryColor: '',
    secondaryColor: '',
    backgroundColor: '',
  });
  const [isColorsLoaded, setIsColorsLoaded] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  /**
   * @function getColors - Fetches the colors from the server.
   * @description Fetches the colors from the server and sets the colors state.
   * @returns The colors state.
   * @throws An error notification if the request fails.
   * @see {@link getAllColors} - A function that fetches the colors from the server.
   * @see {@link notification} - A component of the notification.
   */
  const getColors = async () => {
    setLoading(true);
    try {
      const { ...colors } = await getAllColors();
      setColors(colors);
      setIsColorsLoaded(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        return notification({
          type: 'error',
          message: error.response?.data.message,
        });
      } else if (error instanceof Error) {
        return notification({
          type: 'error',
          message: error.message,
        });
      }
      notification({ type: 'error', message: t('hooks.getTheme') });
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function submitColors - Submits the colors to the server for updating.
   * @description Submits the colors to the server for updating and sets the colors state.
   * @param {React.FormEvent} e - The event that triggered the submission
   * @param {string} colors - The colors to be submitted
   * @returns The colors state.
   * @throws An error notification if the request fails.
   * @see {@link setAllColors} - A function that sets the colors on the server.
   * @see {@link notification} - A component of the notification.
   */
  const submitColors = async (e: React.FormEvent, colors: Colors) => {
    e.preventDefault();
    if (!checkAllColors(colors)) {
      setError(t('hooks.invalidColorFormat'));
      return;
    }
    try {
      await setAllColors(colors);
      notification({
        type: 'success',
        message: t('hooks.colorsUpdatedSuccessfully'),
      });
      setError('');
    } catch (error) {
      if (error instanceof AxiosError) {
        return notification({
          type: 'error',
          message: error.response?.data.message,
        });
      } else if (error instanceof Error) {
        return notification({
          type: 'error',
          message: error.message,
        });
      }
      notification({ type: 'error', message: t('hooks.setTheme') });
    }
  };

  /**
   * @function transformColors - Get the colors from the theme and map them to Tailwind CSS colors.
   * @returns The array of Tailwind CSS colors
   * @see {@link mapHexToTailwindColor} - A function that maps a hex color to a Tailwind CSS color.
   * @see {@link useMantineTheme} - A hook that returns the current theme.
   * @see {@link ColorEnum} - An enum that contains the colors from the theme.
   */
  const transformColors = () => {
    enum ColorEnum {
      'primary-color',
      'indigo',
      'blue',

      'dark',
      'gray',
      'red',
      'pink',
      'grape',
      'violet',
      'cyan',
      'teal',
      'green',
      'lime',
      'yellow',
      'orange',
    }

    const theme = useMantineTheme();
    const colorsObject = theme.colors;
    const selectedColors: string[] = [];

    for (const color of Object.keys(ColorEnum)) {
      if (colorsObject[color] && colorsObject[color][8]) {
        selectedColors.push(...Object.values(colorsObject[color]).slice(1, 10));
      }
    }

    const colors: string[] = selectedColors.flatMap((hexColor) => [
      mapHexToTailwindColor(hexColor),
    ]);

    return colors;
  };

  useEffect(() => {
    getColors();
  }, []);

  return {
    error,
    colors,
    setColors,
    isColorsLoaded,
    submitColors,
    loading,
    transformColors,
  };
};

export default useColors;
