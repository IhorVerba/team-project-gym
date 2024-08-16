import { Grid, rem } from '@mantine/core';
import UserDetailTrainingCard from './UserDetailTrainingCard';
import UserDetailTrainerCard from './UserDetilTrainerCard';
import Training from '../types/Training';
import { User } from '../types/User';

/**
 * @interface Props - UserDetailsList component props
 * @property {Training[] | User[]} visibleItems - visible items array
 * @property {function} setSelectedTrainer - function to set selected trainer
 * @property {function} open - function to open modal
 * @see {@link Training} for training object
 * @see {@link User} for user object
 */
interface Props {
  visibleItems: Training[] | User[];
  setSelectedTrainer?: (trainer: User) => void;
  open?: () => void;
}

/**
 * @function UserDetailsList
 * @description UserDetailsList component to display user details list with trainers or trainings cards depending on where it is used
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 * @see {@link UserDetailTrainingCard} for UserDetailTrainingCard component
 * @see {@link UserDetailTrainerCard} for UserDetailTrainerCard component
 */
const UserDetailsList: React.FC<Props> = ({
  visibleItems,
  setSelectedTrainer,
  open,
}) => {
  const iconStyleObj = {
    width: rem(16),
    height: rem(16),
    marginRight: rem(4),
  };
  return (
    <Grid
      style={{
        width: '100%',
      }}
    >
      {visibleItems.map((item) => (
        <Grid.Col
          span={{
            base: 12,
            s: 12,
            xs: 6,
            sm: 4,
            md: 4,
            lg: 3,
          }}
          key={item._id}
        >
          {'role' in item ? (
            <UserDetailTrainerCard
              trainer={item}
              setSelectedTrainer={setSelectedTrainer ?? setSelectedTrainer}
              iconStyleObj={iconStyleObj}
              open={open ?? open}
            />
          ) : (
            <UserDetailTrainingCard
              iconStyleObj={iconStyleObj}
              training={item}
            />
          )}
        </Grid.Col>
      ))}
    </Grid>
  );
};
export default UserDetailsList;
