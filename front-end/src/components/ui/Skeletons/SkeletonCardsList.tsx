import { Grid } from '@mantine/core';
import { SkeletonCard } from './SkeletonCard';
import { SkeletonTrainingCard } from './SkeletonTrainingCard';

type Props = {
  type: string;
  cardCount: number;
  cardHeight?: number;
  avatarHeight?: number;
  titleWidth?: number;
  titleHeight?: number;
  subtitleWidth?: number;
  subtitleHeight?: number;
};

export const SkeletonCardsList: React.FC<Props> = ({
  type,
  cardCount,
  cardHeight,
  avatarHeight,
  titleWidth,
  titleHeight,
  subtitleWidth,
  subtitleHeight,
}) => (
  <>
    {[...Array(cardCount)].map((_, index) => (
      <Grid.Col
        key={index}
        span={{
          base: type === 'clients' ? 12 : 6,
          xs: 6,
          sm: 6,
          md: 4,
          lg: 3,
        }}
        m={{ base: 0, sm: 'auto', lg: 0, md: 0, xs: 'auto' }}
      >
        {type === 'trainings' ? (
          <SkeletonTrainingCard />
        ) : (
          <SkeletonCard
            cardHeight={cardHeight as number}
            avatarHeight={avatarHeight as number}
            titleWidth={titleWidth as number}
            titleHeight={titleHeight as number}
            subtitleWidth={subtitleWidth as number}
            subtitleHeight={subtitleHeight as number}
          />
        )}
      </Grid.Col>
    ))}
  </>
);
