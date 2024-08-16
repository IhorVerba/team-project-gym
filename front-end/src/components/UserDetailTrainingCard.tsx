import { Paper, Flex, Title, Text, Button } from '@mantine/core';
import Training from '../types/Training';
import { useNavigate } from 'react-router-dom';
import { IconListDetails } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import {
  buttonProps,
  cardFlexProps,
  cardPaperProps,
} from '../styles/styleProps';
import { useAuthContext } from '../context/AuthContext';

/**
 * @interface Props - UserDetailCard component props
 * @property {Training} training - training object
 * @property {object} iconStyleObj - icon style object
 * @see {@link Training} for training interface
 */
interface Props {
  training: Training;
  iconStyleObj: object;
}

/**
 * @function UserDetailCard
 * @description UserDetailCard component to display card with button to show user training details
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 */
const UserDetailCard: React.FC<Props> = ({ training, iconStyleObj }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user: LoggedInUser } = useAuthContext();

  const handleBtnClick = () => {
    if (!training.isFinished && LoggedInUser?._id === training.trainerId) {
      navigate(`/training-creation/${training._id}`);
      return;
    }
    navigate(`/trainings/${training._id}`);
  };

  return (
    <Paper {...cardPaperProps} key={training._id} style={{ cursor: 'default' }}>
      <Flex direction="column" {...cardFlexProps} gap="md">
        <Title order={4} mt="sm" tt="capitalize" ta="center" textWrap="wrap">
          {training.name}
        </Title>
        <Text ta="center" tt="capitalize">
          {training.exercisesIds.length}{' '}
          {training.exercisesIds.length === 1
            ? t('userDetailsTrainingCard.exercise')
            : t('userDetailsTrainingCard.exercises')}
        </Text>
        <Text ta="center" tt="capitalize">
          {dayjs(training.createdAt).format('DD.MM.YYYY')}
        </Text>
        <Button
          leftSection={<IconListDetails style={iconStyleObj} stroke={2} />}
          onClick={handleBtnClick}
          {...buttonProps}
          w="8rem"
          mb="sm"
        >
          {t('userDetailsTrainingCard.details')}
        </Button>
      </Flex>
    </Paper>
  );
};
export default UserDetailCard;
