import React, { useState } from 'react';
import {
  Button,
  Container,
  Title,
  Flex,
  Text,
  Paper,
  Checkbox,
  Group,
  Stack,
  Center,
  Switch,
  Card,
} from '@mantine/core';
import DonutChart from '../ui/charts/DonutChart';
import LineChart from '../ui/charts/LineChart';
import BarChart from '../ui/charts/BarChart';
import './UserReportDesign.scss';
import { useTranslation } from 'react-i18next';
import { Legend } from '@tremor/react';
import useColors from '../../hooks/useColors';
import useTrainingsCharts from '../../hooks/useTrainingCharts';
import { User } from '../../types/User';
import {
  cardFlexProps,
  cardPaperProps,
  chartProps,
  iconButtonProps,
} from '../../styles/styleProps';
import { UseListStateHandlers } from '@mantine/hooks';
import './UserReportDesign.scss';
import { ChartSelection } from '../../types/TrainingChartData';
import Loader from '../ui/Loader/Loader';
import {
  datahero1,
  datahero2,
  dataline,
  databar,
  datahero1Legend,
  datahero2Legend,
  databarLegend,
} from './mockData';
import { downloadHtmlAsImage } from '../../utils/htmlToImageUtils';
import { IconDownload } from '@tabler/icons-react';
import { useAuthContext } from '../../context/AuthContext';

const cardProps = {
  flex: '1',
  shadow: 'md',
  radius: 'md',
  position: 'relative',
  withBorder: true,
  p: 0,
  pb: '30px',
  style: { display: 'flex', justifyContent: 'space-between' },
};

const reportCardProps = {
  shadow: 'none',
  withBorder: false,
};

/**
 * @interface ChartInitialValues - interface for ChartInitialValues
 * @property {string} label - label for chart
 * @property {boolean} checked - checked state for chart
 * @property {string} key - key for chart
 */
type ChartInitialValues = {
  label: string;
  checked: boolean;
  key: string;
};

/**
 * @interface Props - interface for UserReportDesign component
 * @property {boolean} select - select state
 * @property {boolean} share - share state
 * @property {User} selectedUser - selected user
 * @property {ChartInitialValues[]} selectedChart - selected chart
 * @property {UseListStateHandlers<ChartInitialValues>} setSelectedChart - setSelectedChart state
 * @property {(index: number) => void} selectHandler - selectHandler function
 * @property {boolean} allChecked - allChecked state
 * @property {boolean} indeterminate - indeterminate state
 * @property {() => void} sendReportHandler - sendReportHandler function
 * @property {boolean} sendLoading - sendLoading state
 * @property {React.Dispatch<React.SetStateAction<[Date | null, Date | null]>} setDate - setDate state
 * @property {[Date | null, Date | null]} date - date state
 * @property {ChartSelection} isChartSelected - isChartSelected state
 * @see {@link ChartInitialValues} for ChartInitialValues interface
 * @see {@link User} for User interface
 * @see {@link ChartSelection} for ChartSelection interface
 */
type Props = {
  select?: boolean;
  share?: boolean;
  selectedUser?: User;
  selectedChart?: ChartInitialValues[];
  setSelectedChart?: UseListStateHandlers<ChartInitialValues>;
  selectHandler?: (index: number) => void;
  allChecked?: boolean;
  indeterminate?: boolean;
  sendReportHandler?: () => void;
  sendLoading?: boolean;
  setDate?: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
  date?: [Date | null, Date | null];
  isChartSelected?: ChartSelection;
};

/**
 * @function UserReportDesign
 * @description - This component renders a user report design with charts for user training data
 * @param {Props} props
 * @returns {React.ReactElement} - Rendered UserReportDesign component
 * @see {@link Props} for Props interface
 * @see {@link User} for User interface
 * @see {@link ChartSelection} for ChartSelection interface
 * @see {@link DonutChart} for DonutChart component
 * @see {@link LineChart} for LineChart component
 * @see {@link BarChart} for BarChart component
 * @see {@link Legend} for Legend component
 * @see {@link useColors} for useColors hook
 * @see {@link useTrainingsCharts} for useTrainingsCharts hook
 */
export const UserReportDesign: React.FC<Props> = ({
  selectedUser,
  select,
  selectedChart,
  setSelectedChart,
  selectHandler,
  // share,
  date,
  isChartSelected,
}): React.ReactElement => {
  const {
    typesChartLegend,
    typesChartData,
    namesChartLegend,
    namesChartData,
    strengthChartData,
    strengthChartNames,
    cardioChartDataEnergy,
    cardioChartDataDistance,
    cardioChartNames,
    crossfitChartDataRepeats,
    crossfitChartDataWeight,
    crossfitChartNames,
    loading: trainingLoading,
  } = useTrainingsCharts(selectedUser as User, date);

  const [switchChart, setSwitchChart] = useState({
    energy: true,
    distance: false,
    reps: true,
    weight: false,
  });

  const { t } = useTranslation();
  const { user: loggedInUser } = useAuthContext();

  // #region Colors
  const { transformColors } = useColors();
  const colors = transformColors();
  // #endregion

  // #region Handlers
  /**
   * @function shareHandler
   * @description - Function to handle sharing of the report image
   * @returns {Promise<void>} - Promise that resolves when image is shared
   * @throws an error notification if something went wrong and image was not shared
   * @see {@link notification} for notification function
   */
  // this feature doesn't working in many browsers and OS
  // const shareHandler = async () => {
  //   try {
  //     setLoading(true);

  //     const chartsIds = [
  //       'typeChart',
  //       'exerciseChart',
  //       'strengthChart',
  //       'cardioChart',
  //       'crossfitChart',
  //     ];
  //     const filesArray: File[] = [];

  //     const loadChart = async (id: string) => {
  //       const chart = document.getElementById(id);
  //       if (chart) {
  //         const dataUrl = await htmlToImage.toPng(chart);
  //         const blob = await fetch(dataUrl).then((res) => res.blob());
  //         filesArray.push(new File([blob], `${id}.png`, { type: 'image/png' }));
  //       }
  //     };

  //     for (const id of chartsIds) {
  //       if (id === chartsIds[0]) {
  //         await new Promise((resolve) => setTimeout(resolve, 1000));
  //       }

  //       await loadChart(id);
  //     }

  //     const shareDataWithFiles = { files: filesArray };

  //     if (navigator.canShare && navigator.canShare(shareDataWithFiles)) {
  //       await navigator.share(shareDataWithFiles);
  //     } else {
  //       for (const file of filesArray) {
  //         const url = URL.createObjectURL(file);
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.download = file.name;
  //         link.click();
  //         URL.revokeObjectURL(url);
  //       }
  //     }
  //   } catch (e) {
  //     notification({
  //       type: 'error',
  //       message: t('notification.FailedToShare'),
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // #endregion

  // #region Conditions
  const selectUserAndDatesCondition = selectedUser && date?.[0] && date?.[1];

  const typeChartRenderCondition = {
    clientNoData: !loggedInUser && !typesChartData,
    trainerNoSelectNoDataType:
      loggedInUser?.role === 'trainer' &&
      !typesChartData &&
      !selectUserAndDatesCondition,
    trainerSelectNoDataType:
      loggedInUser?.role === 'trainer' &&
      !typesChartData &&
      selectUserAndDatesCondition,
    trainerSelectDataType: loggedInUser?.role === 'trainer' && typesChartData,
  };

  const exercisesChartRenderCondition = {
    clientNoData: !loggedInUser && !namesChartData,
    trainerNoSelectNoDataType:
      loggedInUser?.role === 'trainer' &&
      !namesChartData &&
      !selectUserAndDatesCondition,
    trainerSelectNoDataType:
      loggedInUser?.role === 'trainer' &&
      !namesChartData &&
      selectUserAndDatesCondition,
    trainerSelectDataType: loggedInUser?.role === 'trainer' && namesChartData,
  };

  const strengthChartRenderCondition = {
    clientNoData: !loggedInUser && !strengthChartData,
    trainerNoSelectNoDataType:
      loggedInUser?.role === 'trainer' &&
      !strengthChartData &&
      !selectUserAndDatesCondition,
    trainerSelectNoDataType:
      loggedInUser?.role === 'trainer' &&
      !strengthChartData &&
      selectUserAndDatesCondition,
    trainerSelectDataType:
      loggedInUser?.role === 'trainer' && strengthChartData,
  };

  const cardioChartRenderCondition = {
    clientNoDataEnergy: !loggedInUser && !cardioChartDataEnergy,
    clientNoDataDistance: !loggedInUser && !cardioChartDataDistance,
    trainerNoSelectNoDataEnergy:
      loggedInUser?.role === 'trainer' &&
      !cardioChartDataEnergy &&
      !selectUserAndDatesCondition,
    trainerNoSelectNoDataDistance:
      loggedInUser?.role === 'trainer' &&
      !cardioChartDataDistance &&
      !selectUserAndDatesCondition,
    trainerSelectNoDataEnergy:
      loggedInUser?.role === 'trainer' &&
      !cardioChartDataEnergy &&
      selectUserAndDatesCondition,
    trainerSelectNoDataDistance:
      loggedInUser?.role === 'trainer' &&
      !cardioChartDataDistance &&
      selectUserAndDatesCondition,
    trainerSelectDataEnergy:
      loggedInUser?.role === 'trainer' && cardioChartDataEnergy,
    trainerSelectDataDistance:
      loggedInUser?.role === 'trainer' && cardioChartDataDistance,
  };

  const crossfitChartRenderCondition = {
    clientNoDataRepeats: !loggedInUser && !crossfitChartDataRepeats,
    clientNoDataWeight: !loggedInUser && !crossfitChartDataWeight,
    trainerNoSelectNoDataRepeats:
      loggedInUser?.role === 'trainer' &&
      !crossfitChartDataRepeats &&
      !selectUserAndDatesCondition,
    trainerNoSelectNoDataWeight:
      loggedInUser?.role === 'trainer' &&
      !crossfitChartDataWeight &&
      !selectUserAndDatesCondition,
    trainerSelectNoDataRepeats:
      loggedInUser?.role === 'trainer' &&
      !crossfitChartDataRepeats &&
      selectUserAndDatesCondition,
    trainerSelectNoDataWeight:
      loggedInUser?.role === 'trainer' &&
      !crossfitChartDataWeight &&
      selectUserAndDatesCondition,
    trainerSelectDataRepeats:
      loggedInUser?.role === 'trainer' && crossfitChartDataRepeats,
    trainerSelectDataWeight:
      loggedInUser?.role === 'trainer' && crossfitChartDataWeight,
  };
  // #endregion

  if (trainingLoading) {
    return (
      <Center h="80vh">
        <Loader />
      </Center>
    );
  }

  return (
    <Container
      size="responsive"
      w="100%"
      maw="1440px"
      p={0}
      id="charts-container"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="sm"
        w="100%"
        my="sm"
      >
        {isChartSelected?.typeChart ? (
          <Card {...cardProps}>
            <Paper
              {...cardPaperProps}
              {...chartProps}
              {...reportCardProps}
              onClick={() => selectHandler && selectHandler(0)}
              id="typeChart"
            >
              {select && (
                <Checkbox
                  key={selectedChart && selectedChart[0].key}
                  checked={selectedChart && selectedChart[0].checked}
                  onChange={(event) =>
                    setSelectedChart &&
                    setSelectedChart.setItemProp(
                      0,
                      'checked',
                      event.currentTarget.checked,
                    )
                  }
                />
              )}
              <Stack align="center" gap={0} mb={20}>
                <Title order={4}>{t('userReportDesign.type')}</Title>
                <Text ta="center" c="dimmed" fz="sm" px="sm">
                  {typeChartRenderCondition.clientNoData ||
                  (selectUserAndDatesCondition && !typesChartData)
                    ? t('userReportDesign.noTypeDataClient')
                    : typeChartRenderCondition.trainerSelectNoDataType
                      ? t('userReportDesign.noTypeDataTrainer')
                      : t('userReportDesign.typeDescription')}
                </Text>
              </Stack>
              <Flex {...cardFlexProps}>
                {typeChartRenderCondition.clientNoData ||
                (selectUserAndDatesCondition &&
                  !typesChartData) ? null : typeChartRenderCondition.trainerNoSelectNoDataType ? (
                    <>
                      <DonutChart
                        data={typesChartData || datahero1}
                        variant="pie"
                        colors={colors}
                        showTooltip
                      />
                      <Legend
                        categories={typesChartLegend || datahero1Legend}
                        colors={colors}
                        className="h-1/2 w-1/2"
                      />
                    </>
                  ) : typeChartRenderCondition.trainerSelectNoDataType ? null : (
                    <>
                      <DonutChart
                        data={typesChartData || datahero1}
                        variant="pie"
                        colors={colors}
                        showTooltip
                      />
                      <Legend
                        categories={typesChartLegend || datahero1Legend}
                        colors={colors}
                        className="h-1/2 w-1/2"
                      />
                    </>
                  )}
              </Flex>
            </Paper>
            {!loggedInUser && (
              <Button
                onClick={() => downloadHtmlAsImage('typeChart', 'type')}
                {...iconButtonProps}
                w={30}
                h={30}
                style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '10px',
                }}
              >
                <IconDownload size={18} />
              </Button>
            )}
          </Card>
        ) : null}
        {isChartSelected?.exerciseChart ? (
          <Card {...cardProps}>
            <Paper
              {...cardPaperProps}
              {...chartProps}
              {...reportCardProps}
              onClick={() => selectHandler && selectHandler(1)}
              id="exerciseChart"
            >
              {select && (
                <Checkbox
                  key={selectedChart && selectedChart[1].key}
                  checked={selectedChart && selectedChart[1].checked}
                  onChange={(event) =>
                    setSelectedChart &&
                    setSelectedChart.setItemProp(
                      1,
                      'checked',
                      event.currentTarget.checked,
                    )
                  }
                />
              )}
              <Stack align="center" gap={0} mb={20}>
                <Title order={4}>{t('userReportDesign.exercises')}</Title>
                <Text ta="center" c="dimmed" fz="sm" px="sm">
                  {exercisesChartRenderCondition.clientNoData ||
                  (selectUserAndDatesCondition && !namesChartData)
                    ? t('userReportDesign.noExercisesDataClient')
                    : exercisesChartRenderCondition.trainerSelectNoDataType
                      ? t('userReportDesign.noExercisesDataTrainer')
                      : t('userReportDesign.exercisesDescription')}
                </Text>
              </Stack>
              <Flex {...cardFlexProps}>
                {exercisesChartRenderCondition.clientNoData ||
                (selectUserAndDatesCondition &&
                  !namesChartData) ? null : exercisesChartRenderCondition.trainerNoSelectNoDataType ? (
                    <>
                      <DonutChart
                        data={namesChartData || datahero2}
                        variant="pie"
                        colors={colors}
                        showTooltip
                      />
                      <Legend
                        categories={namesChartLegend || datahero2Legend}
                        colors={colors}
                        className="h-1/2 w-1/2"
                      />
                    </>
                  ) : exercisesChartRenderCondition.trainerSelectNoDataType ? null : (
                    <>
                      <DonutChart
                        data={namesChartData || datahero2}
                        variant="pie"
                        colors={colors}
                        showTooltip
                      />
                      <Legend
                        categories={namesChartLegend || datahero2Legend}
                        colors={colors}
                        className="h-1/2 w-1/2"
                      />
                    </>
                  )}
              </Flex>
            </Paper>
            {!loggedInUser && (
              <Button
                onClick={() => downloadHtmlAsImage('exerciseChart', 'exercise')}
                {...iconButtonProps}
                w={30}
                h={30}
                style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '10px',
                }}
              >
                <IconDownload size={18} />
              </Button>
            )}
          </Card>
        ) : null}
        {isChartSelected?.strengthChart ? (
          <Card {...cardProps}>
            <Paper
              {...cardPaperProps}
              {...chartProps}
              {...reportCardProps}
              onClick={() => selectHandler && selectHandler(2)}
              id="strengthChart"
            >
              {select && (
                <Checkbox
                  key={selectedChart && selectedChart[2].key}
                  checked={selectedChart && selectedChart[2].checked}
                  onChange={(event) =>
                    setSelectedChart &&
                    setSelectedChart.setItemProp(
                      2,
                      'checked',
                      event.currentTarget.checked,
                    )
                  }
                />
              )}
              <Title size="h4" style={{ textAlign: 'center' }}>
                {t('userReportDesign.strength')}
              </Title>
              <Text ta="center" mt="sm" c="dimmed" fz="sm" px="sm">
                {strengthChartRenderCondition.clientNoData ||
                (selectUserAndDatesCondition &&
                  strengthChartData?.data.length <= 0)
                  ? t('userReportDesign.noStrengthDataClient')
                  : strengthChartRenderCondition.trainerSelectNoDataType
                    ? t('userReportDesign.noStrengthDataTrainer')
                    : t('userReportDesign.strengthDescription')}
              </Text>
              {strengthChartRenderCondition.clientNoData ||
              (selectUserAndDatesCondition &&
                strengthChartData?.data.length <=
                  0) ? null : strengthChartRenderCondition.trainerNoSelectNoDataType ? (
                  <>
                    <LineChart
                      data={
                        strengthChartData?.data.length > 0
                          ? strengthChartData?.data
                          : dataline
                      }
                      categories={
                        Array.from(strengthChartNames).length > 0
                          ? Array.from(strengthChartNames)
                          : ['Pull-up', 'Bench Press', 'Dead lift']
                      }
                      index="date"
                      colors={colors}
                      yAxisWidth={50}
                      connectNulls
                    />
                  </>
                ) : strengthChartRenderCondition.trainerSelectNoDataType ? null : (
                  <>
                    <LineChart
                      data={
                        strengthChartData?.data.length > 0
                          ? strengthChartData?.data
                          : dataline
                      }
                      categories={
                        Array.from(strengthChartNames).length > 0
                          ? Array.from(strengthChartNames)
                          : ['Pull-up', 'Bench Press', 'Dead lift']
                      }
                      index="date"
                      colors={colors}
                      yAxisWidth={50}
                      connectNulls
                    />
                  </>
                )}
            </Paper>
            {!loggedInUser && (
              <Button
                onClick={() => downloadHtmlAsImage('strengthChart', 'strength')}
                {...iconButtonProps}
                w={30}
                h={30}
                style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '10px',
                }}
              >
                <IconDownload size={18} />
              </Button>
            )}
          </Card>
        ) : null}
        {isChartSelected?.cardioChart ? (
          <Card {...cardProps}>
            <Paper
              {...cardPaperProps}
              {...chartProps}
              {...reportCardProps}
              onClick={() => selectHandler && selectHandler(3)}
              id="cardioChart"
            >
              <Group w="100%" justify="space-between">
                <Checkbox
                  key={selectedChart && selectedChart[3].key}
                  checked={selectedChart && selectedChart[3].checked}
                  onChange={(event) =>
                    setSelectedChart &&
                    setSelectedChart.setItemProp(
                      3,
                      'checked',
                      event.currentTarget.checked,
                    )
                  }
                  style={{ visibility: select ? 'visible' : 'hidden' }}
                />
                <Switch
                  onChange={() =>
                    setSwitchChart((prev) => ({
                      ...prev,
                      energy: !prev.energy,
                    }))
                  }
                  checked={switchChart.energy}
                  label={
                    switchChart.energy
                      ? t('userReportDesign.energyTitle')
                      : t('userReportDesign.distanceTitle')
                  }
                  labelPosition="left"
                />
              </Group>
              <Title size="h4" style={{ textAlign: 'center' }}>
                {t('userReportDesign.cardio')}
              </Title>
              {switchChart.energy ? (
                <>
                  <Title size="h6" style={{ textAlign: 'center' }}>
                    {t('userReportDesign.energyTitle')}
                  </Title>
                  <Text ta="center" mt="sm" c="dimmed" fz="sm" px="sm">
                    {cardioChartRenderCondition.clientNoDataEnergy ||
                    (selectUserAndDatesCondition &&
                      cardioChartDataEnergy?.data.length <= 0)
                      ? t('userReportDesign.noCardioEnergyDataClient')
                      : cardioChartRenderCondition.trainerSelectNoDataEnergy
                        ? t('userReportDesign.noCardioEnergyDataTrainer')
                        : t('userReportDesign.cardioEnergyDescription')}
                  </Text>
                  {cardioChartRenderCondition.clientNoDataEnergy ||
                  (selectUserAndDatesCondition &&
                    cardioChartDataEnergy?.data.length <=
                      0) ? null : cardioChartRenderCondition.trainerNoSelectNoDataEnergy ? (
                      <>
                        <BarChart
                          data={
                            cardioChartDataEnergy?.data.length > 0
                              ? cardioChartDataEnergy?.data
                              : databar
                          }
                          categories={
                            Array.from(cardioChartNames).length > 0
                              ? Array.from(cardioChartNames)
                              : ['Cardio', 'Crossfit', 'Strength']
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    ) : cardioChartRenderCondition.trainerSelectNoDataEnergy ? null : (
                      <>
                        <BarChart
                          data={
                            cardioChartDataEnergy?.data.length > 0
                              ? cardioChartDataEnergy?.data
                              : databar
                          }
                          categories={
                            Array.from(cardioChartNames).length > 0
                              ? Array.from(cardioChartNames)
                              : ['Cardio', 'Crossfit', 'Strength']
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    )}
                </>
              ) : (
                <>
                  <Title size="h6" style={{ textAlign: 'center' }}>
                    {t('userReportDesign.distanceTitle')}
                  </Title>
                  <Text ta="center" mt="sm" c="dimmed" fz="sm" px="sm">
                    {cardioChartRenderCondition.clientNoDataDistance ||
                    (selectUserAndDatesCondition &&
                      cardioChartDataDistance?.data.length <= 0)
                      ? t('userReportDesign.noCardioDistanceDataClient')
                      : cardioChartRenderCondition.trainerSelectNoDataDistance
                        ? t('userReportDesign.noCardioDistanceDataTrainer')
                        : t('userReportDesign.cardioDistanceDescription')}
                  </Text>
                  {cardioChartRenderCondition.clientNoDataDistance ||
                  (selectUserAndDatesCondition &&
                    cardioChartDataDistance?.data.length <=
                      0) ? null : cardioChartRenderCondition.trainerNoSelectNoDataDistance ? (
                      <>
                        <BarChart
                          data={
                            cardioChartDataDistance?.data.length > 0
                              ? cardioChartDataDistance?.data
                              : databar
                          }
                          categories={
                            Array.from(cardioChartNames).length > 0
                              ? Array.from(cardioChartNames)
                              : ['Cardio', 'Crossfit', 'Strength']
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    ) : cardioChartRenderCondition.trainerSelectNoDataDistance ? null : (
                      <>
                        <BarChart
                          data={
                            cardioChartDataDistance?.data.length > 0
                              ? cardioChartDataDistance?.data
                              : databar
                          }
                          categories={
                            Array.from(cardioChartNames).length > 0
                              ? Array.from(cardioChartNames)
                              : ['Cardio', 'Crossfit', 'Strength']
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    )}
                </>
              )}
            </Paper>
            {!loggedInUser && (
              <Button
                onClick={() => downloadHtmlAsImage('cardioChart', 'cardio')}
                {...iconButtonProps}
                w={30}
                h={30}
                style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '10px',
                }}
              >
                <IconDownload size={18} />
              </Button>
            )}
          </Card>
        ) : null}
        {isChartSelected?.crossfitChart ? (
          <Card {...cardProps}>
            <Paper
              {...cardPaperProps}
              {...chartProps}
              {...reportCardProps}
              onClick={() => selectHandler && selectHandler(4)}
              id="crossfitChart"
            >
              <Group w="100%" justify="space-between">
                <Checkbox
                  key={selectedChart && selectedChart[4].key}
                  checked={selectedChart && selectedChart[4].checked}
                  onChange={(event) =>
                    setSelectedChart &&
                    setSelectedChart.setItemProp(
                      4,
                      'checked',
                      event.currentTarget.checked,
                    )
                  }
                  style={{ visibility: select ? 'visible' : 'hidden' }}
                />
                <Switch
                  onChange={() =>
                    setSwitchChart((prev) => ({
                      ...prev,
                      reps: !prev.reps,
                    }))
                  }
                  checked={switchChart.reps}
                  label={
                    switchChart.reps
                      ? t('userReportDesign.repeatsTitle')
                      : t('userReportDesign.weightTitle')
                  }
                  labelPosition="left"
                />
              </Group>
              <Title size="h4" style={{ textAlign: 'center' }}>
                {t('userReportDesign.crossFit')}
              </Title>
              {switchChart.reps ? (
                <>
                  <Title size="h6" style={{ textAlign: 'center' }}>
                    {t('userReportDesign.repeatsTitle')}
                  </Title>
                  <Text ta="center" mt="sm" c="dimmed" fz="sm" px="sm">
                    {crossfitChartRenderCondition.clientNoDataRepeats ||
                    (selectUserAndDatesCondition &&
                      crossfitChartDataRepeats?.data.length <= 0)
                      ? t('userReportDesign.noCrossFitRepeatsDataClient')
                      : crossfitChartRenderCondition.trainerSelectNoDataRepeats
                        ? t('userReportDesign.noCrossFitRepeatsDataTrainer')
                        : t('userReportDesign.crossFitRepeatsDescription')}
                  </Text>
                  {crossfitChartRenderCondition.clientNoDataRepeats ||
                  (selectUserAndDatesCondition &&
                    crossfitChartDataRepeats?.data.length <=
                      0) ? null : crossfitChartRenderCondition.trainerNoSelectNoDataRepeats ? (
                      <>
                        <BarChart
                          data={
                            crossfitChartDataRepeats?.data.length > 0
                              ? crossfitChartDataRepeats?.data
                              : databar
                          }
                          categories={
                            Array.from(crossfitChartNames).length > 0
                              ? Array.from(crossfitChartNames)
                              : databarLegend
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    ) : crossfitChartRenderCondition.trainerSelectNoDataRepeats ? null : (
                      <>
                        <BarChart
                          data={
                            crossfitChartDataRepeats?.data.length > 0
                              ? crossfitChartDataRepeats?.data
                              : databar
                          }
                          categories={
                            Array.from(crossfitChartNames).length > 0
                              ? Array.from(crossfitChartNames)
                              : databarLegend
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    )}
                </>
              ) : (
                <>
                  <Title size="h6" style={{ textAlign: 'center' }}>
                    {t('userReportDesign.weightTitle')}
                  </Title>
                  <Text ta="center" mt="sm" c="dimmed" fz="sm" px="sm">
                    {crossfitChartRenderCondition.clientNoDataWeight ||
                    (selectUserAndDatesCondition &&
                      crossfitChartDataWeight?.data.length <= 0)
                      ? t('userReportDesign.noCrossFitWeightDataClient')
                      : crossfitChartRenderCondition.trainerSelectNoDataWeight
                        ? t('userReportDesign.noCrossFitWeightDataTrainer')
                        : t('userReportDesign.crossFitWeightDescription')}
                  </Text>
                  {crossfitChartRenderCondition.clientNoDataWeight ||
                  (selectUserAndDatesCondition &&
                    crossfitChartDataWeight?.data.length <=
                      0) ? null : crossfitChartRenderCondition.trainerNoSelectNoDataWeight ? (
                      <>
                        <BarChart
                          data={
                            crossfitChartDataWeight?.data.length > 0
                              ? crossfitChartDataWeight?.data
                              : databar
                          }
                          categories={
                            Array.from(crossfitChartNames).length > 0
                              ? Array.from(crossfitChartNames)
                              : databarLegend
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    ) : crossfitChartRenderCondition.trainerSelectNoDataWeight ? null : (
                      <>
                        <BarChart
                          data={
                            crossfitChartDataWeight?.data.length > 0
                              ? crossfitChartDataWeight?.data
                              : databar
                          }
                          categories={
                            Array.from(crossfitChartNames).length > 0
                              ? Array.from(crossfitChartNames)
                              : databarLegend
                          }
                          index="date"
                          colors={colors}
                          yAxisWidth={50}
                        />
                      </>
                    )}
                </>
              )}
            </Paper>
            {!loggedInUser && (
              <Button
                onClick={() => downloadHtmlAsImage('crossfitChart', 'crossfit')}
                {...iconButtonProps}
                w={30}
                h={30}
                style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '10px',
                }}
              >
                <IconDownload size={18} />
              </Button>
            )}
          </Card>
        ) : null}
      </Flex>
      {/* {share && data.length !== 0 && (
        <Flex align="center" direction="column" mb="sm">
          <Button
            loading={loading}
            {...buttonProps}
            onClick={shareHandler}
            id="shareBtn"
          >
            {t('userReportDesign.share')}
          </Button>
        </Flex>
      )} */}
    </Container>
  );
};
