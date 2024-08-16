import { Paper, Flex, Title, Button } from '@mantine/core';
import { IconListDetails } from '@tabler/icons-react';
import InitialsAvatar from './ui/Avatar';
import { User } from '../types/User';
import { useTranslation } from 'react-i18next';
import {
  buttonProps,
  cardFlexProps,
  cardPaperProps,
} from '../styles/styleProps';

/**
 * @interface Props - UserDetailTrainerCard component props
 * @property {User} trainer - trainer object
 * @property {function} setSelectedTrainer - function to set selected trainer
 * @property {object} iconStyleObj - icon style object
 * @property {function} open - function to open modal
 * @see {@link User} for user interface
 */
interface Props {
  trainer: User;
  setSelectedTrainer?: (trainer: User) => void;
  iconStyleObj: object;
  open?: () => void;
}

/**
 * @function UserDetailTrainerCard
 * @description UserDetailTrainerCard component to display card with button to show user trainer details
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 * @see {@link InitialsAvatar} for Avatar component
 */
const UserDetailTrainerCard: React.FC<Props> = ({
  trainer,
  setSelectedTrainer,
  iconStyleObj,
  open,
}) => {
  const { t } = useTranslation();
  return (
    <Paper {...cardPaperProps} key={trainer._id} style={{ cursor: 'default' }}>
      <Flex direction="column" {...cardFlexProps}>
        <InitialsAvatar
          firstName={trainer?.firstName}
          lastName={trainer?.lastName}
          photoUrl={trainer?.photoUrl}
          fontSize={20}
          size={100}
          radius={120}
        />
        <Flex direction="column" align="center" justify="center">
          <Title order={4} m="md" tt="capitalize" ta="center">
            {trainer.firstName} {trainer.lastName}
          </Title>
          <Button
            leftSection={<IconListDetails style={iconStyleObj} stroke={2} />}
            onClick={() => {
              open && open();
              setSelectedTrainer && setSelectedTrainer(trainer);
            }}
            {...buttonProps}
            w="8rem"
            mb="sm"
          >
            {t('userDetailsTrainerCard.details')}
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
};
export default UserDetailTrainerCard;
