import { useEffect, useRef, useState } from 'react';
import {
  Container,
  Flex,
  Title,
  Select,
  Divider,
  Button,
  CloseButton,
  Checkbox,
  Group,
} from '@mantine/core';
import TopScrollButton from '../../components/ui/TopScrollButton';
import {
  buttonProps,
  headingElementsProps,
  iconButtonProps,
} from '../../styles/styleProps';
import notification from '../../utils/notification';
import { fetchClients, sendMountReports } from '../../services/userService';
import { User } from '../../types/User';
import {
  IconCalendar,
  IconMailForward,
  IconSend,
  IconUserSearch,
} from '@tabler/icons-react';
import { AxiosError } from 'axios';
import optionsFilter from '../../utils/optionsFilter';
import { randomId, useListState, useMediaQuery } from '@mantine/hooks';
import { sendReportEmail } from '../../services/reportService';
import { UserReportDesign } from '../../components/UserReportDesign/UserReportDesign';
import { useTranslation } from 'react-i18next';
import { DatePickerInput } from '@mantine/dates';

/**
 * @function UserReportPage
 * @description This component of page is used to show user report page. It's used to see (fetch) clients trainings data and send report to them.
 * @see {@link UserReportDesign} component
 * @returns UserReportPage component
 */
const UserReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(width < 770px)');
  const ref = useRef<HTMLButtonElement>(null);

  // #region Fetching users
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  /**
   * @function fetchUsers
   * @description Fetches all users. Sets users state.
   * @see {@link fetchClients} function from userService
   * @see {@link notification} component from utils
   * @returns void - sets users state
   * @throws error notification - if user fetch is not successful
   */
  const fetchUsers = async () => {
    try {
      const data = await fetchClients();
      setUsers(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        notification({
          type: 'error',
          message: t('notification.ErrorFetchUser'),
        });
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // #endregion

  // #region Chart selection
  const initialValues = [
    {
      label: 'Exercise types',
      checked: false,
      key: randomId(),
    },
    {
      label: 'All exercises',
      checked: false,
      key: randomId(),
    },
    {
      label: 'Strength exercises',
      checked: false,
      key: randomId(),
    },
    {
      label: 'Cardio exercises',
      checked: false,
      key: randomId(),
    },
    {
      label: 'Crossfit exercises',
      checked: false,
      key: randomId(),
    },
  ];
  const [selectedChart, setSelectedChart] = useListState(initialValues);
  const allChecked = selectedChart.every((value) => value.checked);
  const indeterminate =
    selectedChart.some((value) => value.checked) && !allChecked;
  /**
   * @description Selects chart from checkboxes. It sets checked state of selected chart. If it's checked it will be unchecked and vice versa. It's used to select chart for report.
   * @param {number} index - index of selected chart
   */
  const selectHandler = (index: number) => {
    setSelectedChart.setItemProp(
      index,
      'checked',
      !selectedChart[index].checked,
    );
  };
  // #endregion

  // #region Send report
  /**
   * @description Sends report to selected user. It sends email to selected user with selected charts and selected date range. Also sets loading state for button.
   * @see {@link sendReportEmail} function from reportService
   * @see {@link notification} function from utils
   * @returns void - sends report to selected user
   * @throws error notification - if date range or chart is not selected, or if report is not sent
   */
  const sendReportHandler = () => {
    const selectedCharts = selectedChart
      .filter((value) => value.checked)
      .map((value) => value.label);

    if (!date[0] || !date[1]) {
      notification({
        type: 'error',
        message: t('notification.SelectDateRangeReport'),
      });
      return;
    }

    if (selectedCharts.length === 0) {
      notification({
        type: 'error',
        message: t('notification.SelectChart'),
      });
      return;
    }

    setLoading(true);
    try {
      sendReportEmail(selectedUser?.email as string, selectedCharts, date);
      notification({
        type: 'success',
        message: t('notification.ReportSent'),
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        notification({
          type: 'error',
          message: t('notification.ErrorReport'),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Sends report to all users. It sends email to all users with selected charts and selected date range. Also sets loading state for button.
   * @see {@link sendMountReports} function from userService
   * @see {@link notification} function from utils
   * @returns void - sends report to all users
   * @throws error notification - if date range or chart is not selected, or if report is not sent
   */
  const handleSendReports = () => {
    setReportsLoading(true);
    try {
      const selectedCharts = selectedChart
        ?.filter((value) => value.checked)
        .map((value) => value.label);
      if (selectedCharts?.length === 0 || !selectedCharts) {
        notification({
          type: 'error',
          message: t('notification.SelectChart'),
        });
        return;
      }
      if (!date[0] || !date[1]) {
        notification({
          type: 'error',
          message: t('notification.SelectDateRangeReport'),
        });
        return;
      }
      sendMountReports(selectedCharts, date);

      notification({
        type: 'success',
        message: t('notification.Reports successfully sended'),
      });
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.Cannot send reports'),
      });
    } finally {
      setReportsLoading(false);
    }
  };
  // #endregion

  return (
    <Container size="responsive" maw="1440px" mah="100vh" p={0}>
      <Flex
        gap="sm"
        direction={{
          base: 'column',
          xs: 'column',
          sm: 'column',
          md: 'column',
          xl: 'row',
        }}
        align="center"
        justify="space-between"
      >
        <Title order={1} textWrap="wrap" ta={{ base: 'center', sm: 'start' }}>
          {t('reportConfigurationPage.reportHeadingTitle')}
        </Title>
        <Flex direction="column" gap={15}>
          <Group justify="center" wrap="nowrap">
            <Select
              data={users.map((user) => user.firstName + ' ' + user.lastName)}
              placeholder={t('reportConfigurationPage.clientSearchPlaceholder')}
              searchable
              defaultValue={''}
              onChange={(value) => {
                setSelectedUser(
                  users.find(
                    (user) => user.firstName + ' ' + user.lastName === value,
                  ) || null,
                );
              }}
              nothingFoundMessage={t(
                'reportConfigurationPage.clientSearchNotFound',
              )}
              checkIconPosition="right"
              filter={optionsFilter}
              maxDropdownHeight={200}
              comboboxProps={{
                transitionProps: { transition: 'pop-top-left', duration: 200 },
                dropdownPadding: 0,
                shadow: 'md',
              }}
              rightSectionPointerEvents="none"
              rightSection={<IconUserSearch stroke={2} />}
              {...headingElementsProps}
              w="16rem"
            />
            {isMobile && (
              <Button
                {...iconButtonProps}
                style={{ minWidth: '40px' }}
                onClick={() => {
                  if (ref.current) {
                    ref.current.click();
                  }
                }}
              >
                <IconCalendar stroke={2} />
              </Button>
            )}
            <DatePickerInput
              w="16rem"
              h="2.5rem"
              size="md"
              fz="md"
              dropdownType="modal"
              placeholder={t('reportConfigurationPage.selectDate')}
              type="range"
              valueFormat="DD.MM.YY"
              clearable
              pointer
              value={date}
              onChange={setDate}
              ref={ref}
              style={{ display: isMobile ? 'none' : undefined }}
              maxDate={new Date()}
              rightSectionPointerEvents="auto"
              rightSectionWidth={40}
              rightSection={
                <>
                  {date && date[0] === null && date[1] === null && (
                    <IconCalendar
                      size={20}
                      onClick={() => {
                        if (ref.current) {
                          ref.current.click();
                        }
                      }}
                    />
                  )}
                  {date && date[0] !== null && (
                    <CloseButton
                      aria-label={t('userPageHeader.Clear input')}
                      onClick={() => setDate && setDate([null, null])}
                    />
                  )}
                </>
              }
            />
          </Group>
          <Group justify="center" wrap="nowrap">
            <Checkbox
              label={t('userReportDesign.selectAll')}
              checked={allChecked}
              indeterminate={indeterminate}
              onChange={() =>
                setSelectedChart &&
                setSelectedChart.setState((current) =>
                  current.map((value) => ({
                    ...value,
                    checked: !allChecked,
                  })),
                )
              }
              size="md"
              wrapperProps={{
                onClick: () =>
                  setSelectedChart &&
                  setSelectedChart.setState((current) =>
                    current.map((value) => ({
                      ...value,
                      checked: !allChecked,
                    })),
                  ),
              }}
              className="checkbox"
              {...buttonProps}
              color="transparent"
              iconColor={allChecked ? 'background-color.0' : 'primary-color.9'}
              w="16rem"
            />
            {!selectedUser ? (
              isMobile ? (
                <Button
                  onClick={handleSendReports}
                  loading={reportsLoading}
                  {...iconButtonProps}
                  style={{ minWidth: '40px' }}
                >
                  <IconMailForward stroke={2} />
                </Button>
              ) : (
                <Button
                  onClick={handleSendReports}
                  loading={reportsLoading}
                  {...buttonProps}
                  w="16rem"
                >
                  {t('reportConfigurationPage.sendToAllClients')}
                </Button>
              )
            ) : isMobile ? (
              <Button
                onClick={sendReportHandler}
                loading={loading}
                {...iconButtonProps}
                style={{ minWidth: '40px' }}
              >
                <IconSend size={20} />
              </Button>
            ) : (
              <Button
                {...buttonProps}
                onClick={sendReportHandler}
                loading={loading}
                w="16rem"
              >
                {t('userReportDesign.send')}
              </Button>
            )}
          </Group>
        </Flex>
      </Flex>
      <Divider my="md" />
      <Flex
        direction="column"
        gap="sm"
        justify="center"
        align="center"
        w="100%"
      >
        {(date[0] === null || date[1] === null || !selectedUser) && (
          <Flex direction="column" align="center" justify="center" maw={800}>
            <Title ta="center" order={6} fw={300} textWrap="wrap">
              {t('reportConfigurationPage.fakeData')}
            </Title>
          </Flex>
        )}
        <UserReportDesign
          selectedUser={selectedUser as User}
          select
          selectedChart={selectedChart}
          setSelectedChart={setSelectedChart}
          selectHandler={selectHandler}
          date={date}
          isChartSelected={{
            cardioChart: 'cardio',
            crossfitChart: 'crossfit',
            exerciseChart: 'exercises',
            strengthChart: 'strength',
            typeChart: 'types',
          }}
        />
      </Flex>
      <TopScrollButton />
    </Container>
  );
};

export default UserReportPage;
