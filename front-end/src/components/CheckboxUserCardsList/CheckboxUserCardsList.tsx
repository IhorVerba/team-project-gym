import { ScrollArea, Flex } from '@mantine/core';
import { User } from '../../types/User';
import NoResults from '../ui/NoResults/NoResults';
import { CheckboxUserCard } from '../CheckboxUserCard/CheckboxUserCard';
import { useMediaQuery } from '@mantine/hooks';

/**
 * @type The props of the CheckboxUserCardsList component.
 * @property {User[]} users - The users array.
 * @property {string | null} selectedUser - The selected user.
 * @property {(value: string) => void} handleSelectUser - The function to handle the select user.
 */
type Props = {
  users: User[];
  selectedUser: string | null;
  handleSelectUser: (value: string) => void;
};

/**
 * @function CheckboxUserCardsList - A component that displays the list of checkbox user cards.
 * @param {Props} props - The props to be passed into the component.
 * @returns The CheckboxUserCardsList component.
 * @see {@link Props} - The props for the CheckboxUserCardsList component.
 * @see {@link User} - The user object.
 * @see {@link CheckboxUserCard} - The checkbox user card component.
 */
export const CheckboxUserCardsList: React.FC<Props> = ({
  users,
  handleSelectUser,
  selectedUser,
}: Props) => {
  const isMobile = useMediaQuery('(width < 1200px)');

  return (
    <ScrollArea
      style={{
        width: '100%',
        overflowX: 'auto',
      }}
      mih={!isMobile ? 295 : 135}
      mt="md"
      px={10}
    >
      <Flex
        style={{
          flexWrap: 'nowrap',
        }}
        gap="md"
        px={5}
        pb={5}
      >
        {users.length > 0 ? (
          users.map((user: User) =>
            user ? (
              <CheckboxUserCard
                user={user}
                checked={selectedUser === user._id}
                handleSelectUser={handleSelectUser}
                key={user._id}
              />
            ) : null,
          )
        ) : (
          <NoResults text="No exercises" />
        )}
      </Flex>
    </ScrollArea>
  );
};
