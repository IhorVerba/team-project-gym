import { FC, useEffect, useState } from 'react';
import { getClientExercisesByDateRange } from '../../services/exerciseService';
import { Card, Group, Title, ScrollArea, Button, Stack } from '@mantine/core';
import LineChart from '../ui/charts/LineChart';
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';
import ExerciseType from '../../types/ExerciseType';
import { useTranslation } from 'react-i18next';
import { IconDownload } from '@tabler/icons-react';
import { iconButtonProps } from '../../styles/styleProps';
import {
  downloadHtmlAsImage,
  // shareHtmlElementToTelegram,
} from '../../utils/htmlToImageUtils';
import { CurveType, IntervalType } from '@tremor/react';
import { t } from 'i18next';
import { Legend } from '@tremor/react';
import NoResults from '../ui/NoResults/NoResults';

interface ClientExercisesResults {
  name: string;
  type: string;
  results: [
    {
      date: string;
      distance?: number;
      energy?: number;
    },
  ];
  weights: [
    {
      date: string;
      weight: number;
      reps: number;
    },
  ];
  durations: [
    {
      date: string;
      duration: number;
    },
  ];
}

interface Props {
  clientId: string | undefined;
}

const lastMonthStart = dayjs().subtract(1, 'month').startOf('month').toDate();
const today = dayjs().toDate();

const cardProps = {
  flex: '1',
  shadow: 'md',
  radius: 'md',
  mt: 'md',
  mb: 'md',
  w: '20rem',
  withBorder: true,
  style: { display: 'flex', justifyContent: 'space-between' },
};

const stackProps = {
  p: '0',
  m: '0',
  flex: '1',
  style: { backgroundColor: 'white', borderRadius: '10px' },
  justify: 'flex-start',
};

const lineChartProps = {
  enableLegendSlider: true,
  curveType: 'monotone' as CurveType,
  intervalType: 'preserveStartEnd' as IntervalType,
  noDataText: t('clientStats.noData'),
  startEndOnly: true,
  yAxisWidth: 50,
  showLegend: false,
};

const generateStrengthProgressChart = (exercise: ClientExercisesResults) => {
  const existsWeights =
    !!exercise.weights[exercise.weights.length - 1]?.weight &&
    +exercise.weights[exercise.weights.length - 1]?.weight !== 0;
  const existsReps = !!exercise.weights[exercise.weights.length - 1]?.reps;

  const chartClassName = existsWeights && existsReps ? 'h-40' : 'h-80';

  const weightsColor = 'emerald';
  const repsColor = 'violet';

  const getLegendCategories = () => {
    const result: string[] = [];
    if (existsWeights) result.push(t('clientStats.weight'));
    if (existsReps) result.push(t('clientStats.reps'));

    return result;
  };

  const getLegendColors = () => {
    const result: string[] = [];
    if (existsWeights) result.push(weightsColor);
    if (existsReps) result.push(repsColor);

    return result;
  };

  return (
    <>
      <Legend
        className="mt-3 items-center"
        categories={getLegendCategories()}
        colors={getLegendColors()}
      />

      {existsWeights && (
        <LineChart
          data={exercise.weights}
          index={'date'}
          categories={['weight']}
          colors={[weightsColor]}
          className={chartClassName}
          {...lineChartProps}
        />
      )}
      {existsReps && (
        <LineChart
          data={exercise.weights}
          index={'date'}
          categories={['reps']}
          colors={[repsColor]}
          className={chartClassName}
          {...lineChartProps}
        />
      )}
    </>
  );
};

const generateCardioProgressChart = (exercise: ClientExercisesResults) => {
  const existsDuration =
    !!exercise.durations[exercise.durations.length - 1]?.duration;

  const existsDistance =
    !!exercise.results[exercise.results.length - 1]?.distance;
  const existsEnergy = !!exercise.results[exercise.results.length - 1]?.energy;

  const chartClassName =
    existsDuration && (existsDistance || existsEnergy) ? 'h-40' : 'h-80';

  const durationColor = 'emerald';
  const distanceColor = 'red';
  const energyColor = 'cyan';

  const getLegendCategories = () => {
    const result: string[] = [];
    if (existsDuration) result.push(t('clientStats.duration'));
    if (existsDistance) result.push(t('clientStats.distance'));
    if (existsEnergy) result.push(t('clientStats.energy'));

    return result;
  };

  const getLegendColors = () => {
    const result: string[] = [];
    if (existsDuration) result.push(durationColor);
    if (existsDistance) result.push(distanceColor);
    if (existsEnergy) result.push(energyColor);

    return result;
  };

  return (
    <>
      {
        <Legend
          className="mt-3 items-center"
          categories={getLegendCategories()}
          colors={getLegendColors()}
        />
      }

      {existsDuration && (
        <>
          <LineChart
            data={exercise.durations}
            index={'date'}
            categories={['duration']}
            colors={[durationColor]}
            className={chartClassName}
            {...lineChartProps}
          />
        </>
      )}

      {existsDistance && (
        <LineChart
          data={exercise.results}
          index={'date'}
          categories={['distance']}
          colors={[distanceColor]}
          className={chartClassName}
          {...lineChartProps}
        />
      )}

      {existsEnergy && (
        <LineChart
          data={exercise.results}
          index={'date'}
          categories={['energy']}
          colors={[energyColor]}
          className={chartClassName}
          {...lineChartProps}
        />
      )}
    </>
  );
};

const ClientStatistics: FC<Props> = ({ clientId }) => {
  const [clientExercisesResults, setClientExercisesResults] = useState<
    ClientExercisesResults[]
  >([]);

  const [dateFilterValue, setDateFilterValue] = useState<
    [Date | null, Date | null]
  >([lastMonthStart, today]);

  const { t } = useTranslation();

  const fetchClientExerciseResults = async () => {
    const dateFilterFrom = dateFilterValue[0];
    const dateFilterTo = dateFilterValue[1];

    const exercises = await getClientExercisesByDateRange(
      clientId || '',
      dateFilterFrom || lastMonthStart,
      dateFilterTo || today,
    );
    setClientExercisesResults(exercises);
  };

  useEffect(() => {
    fetchClientExerciseResults();
  }, [clientId, dateFilterValue]);

  return (
    <>
      <Group mt="1rem" justify="space-between">
        <Title order={4}>{t('clientStats.exerciseResults')}</Title>
        <DatePickerInput
          type="range"
          placeholder="Pick dates range"
          value={dateFilterValue}
          onChange={setDateFilterValue}
          valueFormat="DD.MM.YY"
          clearable
          w="14rem"
          h="2.5rem"
          size="md"
          fz="md"
        />
      </Group>

      {(!clientId || !clientExercisesResults.length) && (
        <NoResults text={t('clientStats.noData')} />
      )}

      <ScrollArea type="always">
        <Group gap="md" wrap="nowrap" align="stretch">
          {clientExercisesResults.map((exercise, index) => {
            const hasWeightsOrReps = exercise.weights.some(
              (weightEntry) =>
                weightEntry.weight !== 0 || weightEntry.reps !== 0,
            );

            if (
              (exercise.type === ExerciseType.Strength ||
                exercise.type === ExerciseType.Crossfit) &&
              hasWeightsOrReps
            ) {
              return (
                <Card key={index} {...cardProps}>
                  <Stack id={`chart-${index}`} {...stackProps}>
                    <Title
                      order={5}
                      ta="center"
                      textWrap="pretty"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {exercise.name}
                    </Title>
                    <>
                      <Stack justify="space-between" flex={1}>
                        {generateStrengthProgressChart(exercise)}
                      </Stack>
                    </>
                  </Stack>
                  <Group justify="flex-end">
                    <Button
                      onClick={() => downloadHtmlAsImage(`chart-${index}`, exercise.type)}
                      {...iconButtonProps}
                    >
                      <IconDownload />
                    </Button>
                    {/* <Button
                  onClick={() => shareHtmlElementToTelegram(`chart-${index}`)}
                  {...iconButtonProps}
                >
                  <IconBrandTelegram />
                </Button> */}
                  </Group>
                </Card>
              );
            }

            if (exercise.type === ExerciseType.Cardio) {
              return (
                <Card key={index} {...cardProps}>
                  <Stack id={`chart-${index}`} {...stackProps}>
                    <Title
                      order={5}
                      ta="center"
                      textWrap="pretty"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {exercise.name}
                    </Title>
                    <>
                      <Stack justify="space-between" flex={1}>
                        {generateCardioProgressChart(exercise)}
                      </Stack>
                    </>
                  </Stack>
                  <Group justify="flex-end">
                    <Button
                      onClick={() => downloadHtmlAsImage(`chart-${index}`, exercise.type)}
                      {...iconButtonProps}
                    >
                      <IconDownload />
                    </Button>
                    {/* <Button
                  onClick={() => shareHtmlElementToTelegram(`chart-${index}`)}
                  {...iconButtonProps}
                >
                  <IconBrandTelegram />
                </Button> */}
                  </Group>
                </Card>
              );
            }

            return null;
          })}
        </Group>
      </ScrollArea>
    </>
  );
};

export default ClientStatistics;
