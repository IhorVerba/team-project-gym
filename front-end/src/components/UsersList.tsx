import { Grid } from '@mantine/core';
import { Card } from './Card';
import { User } from '../types/User';
import NoResults from './ui/NoResults/NoResults';
import UserFilterTabs from './UserFilterTabs/UserFilterTabs';
import { SkeletonCardsList } from './ui/Skeletons/SkeletonCardsList';
import { SkeletonFilterTabs } from './ui/Skeletons/SkeletonFilterTabs';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props - UsersList component props
 * @property {User[]} visibleUsers - visible users array
 * @property {function} fetchUsers - function to fetch users
 * @see {@link User} for user object
 */
type Props = {
  visibleUsers: User[];
  loading?: boolean;
};

/**
 * @function UsersList
 * @description UsersList component to display users list
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 * @see {@link Card} for Card component
 * @see {@link NoResults} for NoResults component
 */
export const UsersList: React.FC<Props> = ({ visibleUsers, loading }) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      <>
        <SkeletonFilterTabs tabCount={2} />
        <Grid w="100%" p={0}>
          <SkeletonCardsList
            type="clients"
            cardCount={4}
            cardHeight={244}
            avatarHeight={120}
            titleWidth={165}
            titleHeight={30}
            subtitleWidth={195}
            subtitleHeight={40}
          />
        </Grid>
      </>
    );
  }

  return (
    <>
      <UserFilterTabs />
      <Grid w="100%" p={0}>
        {visibleUsers.length === 0 ? (
          <NoResults text={t('noResults.noUsers')} />
        ) : (
          visibleUsers.map((user: User) => (
            <Grid.Col
              span={{
                base: 12,
                xs: 6,
                sm: 6,
                md: 4,
                lg: 3,
              }}
              key={user._id}
              p={5}
            >
              <Card user={user} />
            </Grid.Col>
          ))
        )}
      </Grid>
    </>
  );
};
