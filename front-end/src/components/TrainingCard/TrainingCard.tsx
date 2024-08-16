import { Text, Paper, Flex, Avatar, Group } from '@mantine/core';
import Training from '../../types/Training';
import { IconUser, IconUsersGroup } from '@tabler/icons-react';
import dayjs from 'dayjs';
import '../../styles/pointer.scss';
import {
  cardPaperProps,
  cardFlexProps,
  cardTitleProps,
} from '../../styles/styleProps';
import InitialsAvatar from '../ui/Avatar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../context/AuthContext';

/**
 * @interface Props - The interface for the TrainingCard component.
 * @property {Training} training - The training.
 */
interface Props {
  training: Training;
}

/**
 * @function TrainingCard - A component that displays the training card.
 * @param {Props} props - The props to pass to the component.
 * @returns The TrainingCard component.
 * @see {@link Props} - The props for the TrainingCard component.
 * @see {@link Training} - The training type.
 * @see {@link InitialsAvatar} - The initials avatar component.
 */
export const TrainingCard: React.FC<Props> = ({ training }) => {
  const { t } = useTranslation();
  const { _id, name, userIds, createdAt, isFinished, trainerId } = training;
  const { user: LoggedInUser } = useAuthContext();

  const navigate = useNavigate();

  /**
   * @function handleCardClick - Handles the click of the card.
   * @description Navigates to the training creation page if the training is not finished. Otherwise, navigates to the training page.
   * @returns The result of the card click.
   */
  const handleCardClick = () => {
    if (!isFinished && LoggedInUser?._id === trainerId?._id) {
      navigate(`/training-creation/${_id}`);
      return;
    }
    navigate(`/trainings/${_id}`);
  };

  const dateObject = dayjs(createdAt);
  const formattedDate = dayjs(dateObject).format('YYYY-MM-DD');

  return (
    <>
      <Paper {...cardPaperProps} onClick={handleCardClick}>
        <Flex direction="column" {...cardFlexProps}>
          <Flex direction="row" justify="space-between" align="center" w="100%">
            {userIds && userIds.length <= 1 ? <IconUser /> : <IconUsersGroup />}

            <Paper
              radius="lg"
              p="5px"
              bg={`${isFinished ? 'secondary-color.9' : 'primary-color.9'}`}
              fz="xs"
              c="white"
            >
              {`${isFinished ? t('trainingCard.PAST') : t('trainingCard.IN PROGRESS')}`}
            </Paper>
          </Flex>

          <Text ta="center" tt="capitalize" {...cardTitleProps}>
            {name}
          </Text>

          <Group justify="space-between">
            {training.trainerId && (
              <InitialsAvatar
                photoUrl={training.trainerId?.photoUrl}
                firstName={training.trainerId?.firstName}
                lastName={training.trainerId?.lastName}
                size={30}
                fontSize={12}
                isVertical
                isInitials
              />
            )}

            {training.userIds.length > 0 ? (
              <Avatar.Group spacing="xs">
                {training.userIds.slice(0, 2).map((user) => (
                  <InitialsAvatar
                    key={user._id}
                    photoUrl={user.photoUrl as string}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    size={30}
                    fontSize={12}
                    isVertical
                    isInitials
                  />
                ))}

                {training.userIds.length > 2 && (
                  <Avatar radius="xl" size={30}>
                    {`+${training.userIds.length - 2}`}
                  </Avatar>
                )}
              </Avatar.Group>
            ) : (
              <Text ta="center" c="dimmed" fz="sm">
                {t('trainingCard.No сlients added')}
              </Text>
            )}
          </Group>

          <Text ta="center" c="dimmed" fz="sm">
            {formattedDate}
          </Text>
        </Flex>
      </Paper>
    </>
  );
};
