import { Flex, Paper, Skeleton } from '@mantine/core';
import { cardFlexProps, cardPaperProps } from '../../../styles/styleProps';

type Props = {
  cardHeight: number;
  avatarHeight?: number;
  titleHeight: number;
  titleWidth: number;
  subtitleWidth: number;
  subtitleHeight: number;
};

export const SkeletonCard: React.FC<Props> = ({
  cardHeight,
  avatarHeight,
  titleWidth,
  titleHeight,
  subtitleWidth,
  subtitleHeight,
}) => (
  <Paper {...cardPaperProps} h={cardHeight}>
    <Flex {...cardFlexProps} direction="column">
      <Skeleton height={avatarHeight} circle />
      <Skeleton height={titleHeight} width={titleWidth} radius="xl" />
      <Skeleton height={subtitleHeight} width={subtitleWidth} radius="xl" />
    </Flex>
  </Paper>
);
