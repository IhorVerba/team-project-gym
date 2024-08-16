import { Grid } from '@mantine/core';
import { TrainingCard } from './TrainingCard/TrainingCard';
import Training from '../types/Training';
import NoResults from './ui/NoResults/NoResults';
import { useTranslation } from 'react-i18next';
import { SkeletonCardsList } from './ui/Skeletons/SkeletonCardsList';
import UserFilterTabs from './UserFilterTabs/UserFilterTabs';
import { SkeletonFilterTabs } from './ui/Skeletons/SkeletonFilterTabs';

/**
 * @interface Props - TrainingsList component props
 * @property {Training[]} visibleTrainings - visible trainings array
 * @property {boolean} loading - loading state
 * @see {@link Training} for training object
 */
type Props = {
  visibleTrainings: Training[];
  loading: boolean;
};

/**
 * @function TrainingsList
 * @description TrainingsList component to display trainings list
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 * @see {@link TrainingCard} for TrainingCard component
 * @see {@link NoResults} for NoResults component
 */
export const TrainingsList: React.FC<Props> = ({
  visibleTrainings,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {!loading ? (
        <UserFilterTabs isTraining={true} />
      ) : (
        <SkeletonFilterTabs tabCount={2} />
      )}

      <Grid w="100%" p={0}>
        {!loading ? (
          visibleTrainings.length !== 0 ? (
            visibleTrainings.map((training) => (
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                  lg: 3,
                }}
                key={training._id}
                p={5}
              >
                <TrainingCard training={training} />
              </Grid.Col>
            ))
          ) : (
            <NoResults text={t('noResults.noTrainigs')} />
          )
        ) : (
          <SkeletonCardsList
            type="trainings"
            cardCount={4}
            cardHeight={163}
            avatarHeight={120}
            titleWidth={165}
            titleHeight={30}
            subtitleWidth={195}
            subtitleHeight={40}
          />
        )}
      </Grid>
    </>
  );
};
