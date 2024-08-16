import {
  Box,
  Input,
  LoadingOverlay,
  MantineProvider,
  NumberInput,
  createTheme,
  Switch,
} from '@mantine/core';
import { generateColors } from '@mantine/colors-generator';
import { Notifications } from '@mantine/notifications';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import useColors from './hooks/useColors';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import classes from './App.module.scss';
import Loader from './components/ui/Loader/Loader';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { DatesProvider } from '@mantine/dates';
import { LANGUAGES, LOCALS } from './i18n/constants';
import 'dayjs/locale/uk';

/**
 * @description Main application component
 * @returns {JSX.Element | null} The JSX code for the App component
 */
function App(): JSX.Element | null {
  const { colors, isColorsLoaded } = useColors();
  const { isUserLoading } = useAuthContext();

  if (!isColorsLoaded) {
    return null;
  }

  /** @type {object} theme - The theme object for the application */
  const theme: object = createTheme({
    fontFamily: 'e-Ukraine, Helvetica, sans-serif',
    fontFamilyMonospace: 'Roboto Mono',
    fontSizes: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '2rem',
    },
    fontSmoothing: true,
    autoContrast: true,
    luminanceThreshold: 0.3,
    primaryColor: 'primary-color',
    primaryShade: 9,
    colors: {
      'primary-color': generateColors(colors.primaryColor),
      'secondary-color': generateColors(colors.secondaryColor),
      'background-color': generateColors(colors.backgroundColor),
    },
    components: {
      Input: Input.extend({
        classNames: {
          input: classes.input,
        },
      }),
      NumberInput: NumberInput.extend({
        defaultProps: {
          inputMode: 'numeric',
        },
      }),
      Switch: Switch.extend({
        styles: {
          track: {
            backgroundColor: 'var(--mantine-color-primary-color-9)',
            border: '2px solid var(--mantine-color-primary-color-9)',
          },
        },
      }),
    },
  });

  return (
    <MantineProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <DatesProvider
          settings={{
            locale: i18n.language === LOCALS[LANGUAGES.EN] ? 'en' : 'uk',
            firstDayOfWeek: 1,
            timezone: 'Europe/Kiev',
          }}
        >
          <Notifications />
          <AuthProvider>
            <Box pos="relative">
              <LoadingOverlay
                visible={isUserLoading}
                loaderProps={{ children: <Loader /> }}
                overlayProps={{
                  radius: 'md',
                  blur: 4,
                  color: 'secondary-color',
                  backgroundOpacity: 0.4,
                }}
                zIndex={1000}
              />
              <AppRouter />
            </Box>
          </AuthProvider>
        </DatesProvider>
      </I18nextProvider>
    </MantineProvider>
  );
}

export default App;
