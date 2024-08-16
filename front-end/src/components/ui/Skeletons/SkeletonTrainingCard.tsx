import { Flex, Group, Paper, Skeleton } from '@mantine/core';
import { cardFlexProps, cardPaperProps } from '../../../styles/styleProps';

export const SkeletonTrainingCard = () => (
  <Paper {...cardPaperProps} h={163}>
    <Flex {...cardFlexProps} direction="column">
      <Group justify="space-between" w="100%">
        <Skeleton height={28} circle />
        <Skeleton height={28} width={92} radius="xl" />
      </Group>

      <Skeleton height={20} width={100} radius="xl" />

      <Skeleton height={30} width={90} radius="xl" />

      <Skeleton height={18} width={63} radius="xl" />
    </Flex>
  </Paper>
);
