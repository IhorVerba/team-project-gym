import { Title, Text, Button, Group, Flex } from '@mantine/core';
import classes from './ErrorPage.module.scss';
import { useNavigate } from 'react-router-dom';
import Centered from '../../components/ui/Centered';
import { useTranslation } from 'react-i18next';

/**
 * @function ErrorPage
 * @description This component of page is used to show 404 page. It shows when user tries to access a page that does not exist.
 * @returns ErrorPage component
 */
const ErrorPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Centered>
      <Flex
        direction="column"
        align="center"
        gap="md"
        mx={10}
        className={classes.root}
      >
        <div className={classes.label}>404</div>
        <Title className={classes.title}>
          {t('ErrorPage.title')}
        </Title>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          {t('ErrorPage.subTitle')}
        </Text>
        <Group justify="center">
          <Button
            variant="subtle"
            size="lg"
            onClick={() => {
              navigate('/');
            }}
          >
            {t('ErrorPage.buttonText')}
          </Button>
        </Group>
      </Flex>
    </Centered>
  );
};

export default ErrorPage;
