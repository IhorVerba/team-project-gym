import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../types/User';
import { Center, Stack, Title, Divider, Container } from '@mantine/core';
import Avatar from '../components/ui/Avatar';
import { getUserFromToken } from '../services/userService';
import notification from '../utils/notification';
import { UserReportDesign } from '../components/UserReportDesign/UserReportDesign';
import Loader from '../components/ui/Loader/Loader';
import ErrorPage from './ErrorPage/ErrorPage';
import useTrainingsCharts from '../hooks/useTrainingCharts';
import dayjs from 'dayjs';
import { getSelectedCharts } from '../services/reportService';
import { ChartSelection } from '../types/TrainingChartData';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/uk';
import i18n from '../i18n';

/**
 * @function MonthReportPage
 * @description This component of page is used to show month report page. It's used to show report of user for selected month.
 * @see {@link Avatar} component
 * @see {@link Loader} component
 * @see {@link UserReportDesign} component
 * @returns MonthReportPage component
 */
export const MonthReportPage = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedChart, setSelectedChart] = useState<ChartSelection | null>(
    null,
  );
  const [correctDate, setCorrectDate] = useState('');
  const [userLoading, setUserLoading] = useState(false);
  const { t } = useTranslation();

  useTrainingsCharts(user as User, dates);

  /**
   * @description Fetches user from token (from url). Fetches selected charts. Sets user, selected chart, date states. Sets user loading state.
   * @see {@link getUserFromToken} function from userService
   * @see {@link getSelectedCharts} function from reportService
   * @see {@link notification} component from utils
   * @returns void - sets user, selected chart states
   * @throws error notification - if fetching user or selected charts is not successful
   */
  const getUserId = async () => {
    setUserLoading(true);

    const queryString = location.search;

    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const dates = urlParams.get('date');
    const chartsId = urlParams.get('chartsId');
    if (dates) {
      const [startDate, endDate] = dates.split(',');
      setDates([new Date(startDate), new Date(endDate)]);
    } else {
      setDates([null, null]);
    }

    setCorrectDate(
      dates
        ? `${t('monthReportPage.from')} ${dayjs(dates.split(',')[0])
          .locale(i18n.language === 'en' ? 'en' : 'uk')
          .format('DD MMMM')} ${t('monthReportPage.to')} ${dayjs(
          dates.split(',')[1],
        )
          .locale(i18n.language === 'en' ? 'en' : 'uk')
          .format('DD MMMM')}`
        : '',
    );

    try {
      const user = await getUserFromToken(token as string);
      const charts = await getSelectedCharts(chartsId as string);

      setSelectedChart(charts);
      setUser(user);
    } catch (error) {
      notification({
        type: 'error',
        message: t('monthReportPage.somethingWentWrong'),
      });
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  if (userLoading) {
    return (
      <Center h="80vh">
        <Loader />
      </Center>
    );
  }

  const { firstName, lastName, photoUrl } = user ?? {};

  return !user && !userLoading ? (
    <ErrorPage />
  ) : (
    <Container>
      <Center>
        <Stack align="center" my="md">
          <Title
            size="h3"
            ta="center"
            order={1}
          >{`${t('monthReportPage.titleHello')} ${firstName} ${t('monthReportPage.titleReport')} ${correctDate} ${t('monthReportPage.titleBrand')}`}</Title>
          <Avatar
            size={150}
            photoUrl={photoUrl}
            firstName={firstName}
            lastName={lastName}
          />
        </Stack>
      </Center>
      <Divider my="md" />
      <UserReportDesign
        share
        selectedUser={user as User}
        date={dates}
        isChartSelected={selectedChart as ChartSelection}
      />
    </Container>
  );
};
