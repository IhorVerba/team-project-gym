import { FC, useEffect, useState } from 'react';
import ExerciseResult from '../../types/ExerciseResult';
import {
  Badge,
  Card,
  Group,
  ScrollArea,
  Stack,
  Title,
  Collapse,
  Table,
  Divider,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useDisclosure } from '@mantine/hooks';
import ExerciseType from '../../types/ExerciseType';
import { getLatestResultsByClientId } from '../../services/exerciseService';
import { useTranslation } from 'react-i18next';
import {
  cardBadgeProps,
  inActiveCardBadgeProps,
} from '../../styles/styleProps';

interface Props {
  clientId: string | undefined;
}

const getBadgeColorProps = (date: Date) => {
  const today = dayjs();
  const exerciseDate = dayjs(date);
  const diffInMonths = today.diff(exerciseDate, 'month');

  if (diffInMonths < 1) {
    return cardBadgeProps;
  } else {
    return inActiveCardBadgeProps;
  }
};

const formatDate = (date: Date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

const getDurationString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
};

const LatestExerciseResults: FC<Props> = ({ clientId }) => {
  const [latestResults, setLatestResults] = useState<ExerciseResult[]>([]);
  const [openedResults, { toggle }] = useDisclosure(false);
  const { t } = useTranslation();

  const fetchLatestResults = async () => {
    if (clientId) {
      const latestResults = await getLatestResultsByClientId(clientId);
      setLatestResults(latestResults);
    }
  };

  useEffect(() => {
    fetchLatestResults();
  }, []);

  if (!clientId || !latestResults.length) {
    return null;
  }

  return (
    <Stack mt="1rem">
      <Title order={4}>{t('latestResults.latestExerciseResults')}</Title>
      <ScrollArea type="always">
        <Group
          gap="md"
          wrap="nowrap"
          align="stretch"
          style={{ boxSizing: 'border-box' }}
        >
          {latestResults.map((exercise, index) => (
            <Card
              key={index}
              flex="1"
              onClick={toggle}
              shadow="md"
              radius="md"
              mt="md"
              mb="md"
              w="14rem"
              withBorder
            >
              <Stack h="5.5rem">
                <Group flex={1} justify="center" align="center">
                  <Title order={4} ta="center">
                    {exercise.name}
                  </Title>
                </Group>
                <Group justify="center">
                  <Badge size="md" {...getBadgeColorProps(exercise.date)}>
                    {formatDate(exercise.date)}
                  </Badge>
                </Group>
              </Stack>

              <Collapse
                in={openedResults}
                transitionDuration={1000}
                p={0}
                w="100%"
              >
                <Divider my="md" />
                <Group w="100%" m="0">
                  <Table w="100%">
                    {exercise.type === ExerciseType.Cardio && (
                      <>
                        <Table.Thead>
                          <Table.Tr h="3rem">
                            {exercise.duration && (
                              <Table.Th ta="center" fz="md">
                                {t('latestResults.duration')}
                              </Table.Th>
                            )}

                            {exercise.result.distance !== 0 && (
                              <Table.Th ta="center" fz="md">
                                {t('latestResults.distance')}
                              </Table.Th>
                            )}
                            {exercise.result.energy !== 0 && (
                              <Table.Th ta="center" fz="md">
                                {t('latestResults.energy')}
                              </Table.Th>
                            )}
                          </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                          <Table.Tr>
                            {exercise.duration && (
                              <Table.Td ta="center" fz="md" ff="mono">
                                {getDurationString(exercise.duration)}
                              </Table.Td>
                            )}

                            {exercise.result.distance !== 0 && (
                              <Table.Td ta="center" fz="md" ff="mono">
                                {exercise.result.distance}
                              </Table.Td>
                            )}

                            {exercise.result.energy !== 0 && (
                              <Table.Td ta="center" fz="md" ff="mono">
                                {exercise.result.energy}
                              </Table.Td>
                            )}
                          </Table.Tr>
                        </Table.Tbody>
                      </>
                    )}
                    {exercise.type === ExerciseType.Strength && (
                      <>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th ta="start" fz="md">
                              {t('latestResults.kg')}
                            </Table.Th>
                            <Table.Th ta="end" fz="md">
                              {t('latestResults.reps')}
                            </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {exercise.sets.map((set, index) => (
                            <Table.Tr key={index}>
                              <Table.Td ta="start" fz="md" ff="mono">
                                {set.weight}
                              </Table.Td>
                              <Table.Td ta="end" fz="md" ff="mono">
                                {set.reps}
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </>
                    )}
                    {exercise.type === ExerciseType.Crossfit && (
                      <>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th ta="start" fz="md">
                              {t('latestResults.kg')}
                            </Table.Th>
                            <Table.Th ta="center" fz="md">
                              {t('latestResults.reps')}
                            </Table.Th>
                            <Table.Th ta="end" fz="md">
                              {t('latestResults.duration')}
                            </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {exercise.sets.map((set, index) => (
                            <Table.Tr key={index}>
                              <Table.Td ta="start" fz="md" ff="mono">
                                {set.weight}
                              </Table.Td>
                              <Table.Td ta="center" fz="md" ff="mono">
                                {set.reps}
                              </Table.Td>
                              <Table.Td ta="end" fz="md" ff="mono">
                                {getDurationString(set.duration || 0)}
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </>
                    )}
                  </Table>
                </Group>
              </Collapse>
            </Card>
          ))}
        </Group>
      </ScrollArea>
    </Stack>
  );
};

export default LatestExerciseResults;
