import { Center, Modal, Stack, Title, Text } from '@mantine/core';
import InitialsAvatar from './ui/Avatar';
import { User } from '../types/User';

/**
 * @interface Props - TrainerModal component props
 * @property {boolean} opened - modal opened state
 * @property {function} close - function to close modal
 * @property {User} trainer - trainer object
 * @see {@link User} for user object
 */
interface Props {
  opened: boolean;
  close: () => void;
  trainer: User;
}

/**
 * @function TrainerModal
 * @description TrainerModal component to display trainer information
 * @param {Props} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link Props} for component props
 * @see {@link User} for user object
 * @see {@link InitialsAvatar} for InitialsAvatar component
 */
const TrainerModal: React.FC<Props> = ({ opened, close, trainer }) => {
  return (
    <Modal opened={opened} radius={30} onClose={close}>
      <Center>
        <Stack p="lg" justify="center" align="center">
          <InitialsAvatar
            firstName={trainer?.firstName}
            lastName={trainer?.lastName}
            photoUrl={trainer?.photoUrl}
            fontSize={20}
            isVertical={true}
            size={100}
            radius={120}
          />
          <Title order={4} tt="capitalize" ta="center">
            {trainer?.firstName} {trainer?.lastName}
          </Title>
          <Text ta="center">{trainer?.phoneNumber}</Text>
          <Text ta="center">{trainer?.email}</Text>
        </Stack>
      </Center>
    </Modal>
  );
};
export default TrainerModal;
