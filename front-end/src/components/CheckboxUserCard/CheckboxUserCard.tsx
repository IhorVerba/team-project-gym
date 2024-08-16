import {
  UnstyledButton,
  Text,
  Paper,
  Flex,
  Checkbox,
  useMantineTheme,
} from '@mantine/core';
import Avatar from '../ui/Avatar';
import classes from './CheckboxUserCard.module.scss';
import { User } from '../../types/User';
import { useMediaQuery } from '@mantine/hooks';
import { cardFlexProps, cardPaperProps } from '../../styles/styleProps';
import truncate from '../../utils/truncate';

/**
 * @type The props for the CheckboxUserCard component.
 * @property {User} user - The user object.
 * @property {boolean} checked - The checked state of the checkbox.
 * @property {(value: string) => void} handleSelectUser - The function to handle the select user.
 */
type Props = {
  user: User;
  checked: boolean;
  handleSelectUser: (value: string) => void;
};

/**
 * @function CheckboxUserCard - A component that displays the checkbox user card.
 * @param {Props} props - The props to be passed into the component.
 * @returns The CheckboxUserCard component.
 * @see {@link Props} - The props for the CheckboxUserCard component.
 * @see {@link User} - The user object.
 * @see {@link Avatar} - The avatar component.
 */
export const CheckboxUserCard: React.FC<Props> = ({
  user,
  handleSelectUser,
  checked,
}: Props) => {
  const { _id, email, firstName, lastName, photoUrl } = user;
  const isMobile = useMediaQuery('(width < 992px)');
  const theme = useMantineTheme();

  return (
    <div className={classes.root}>
      {!isMobile ? (
        <>
          <Checkbox
            classNames={{
              root: classes.checkboxWrapper,
              input: classes.checkbox,
            }}
            checked={checked}
            onChange={() => handleSelectUser(_id as string)}
            tabIndex={-1}
            size={isMobile ? 'sm' : 'md'}
            aria-label="Checkbox example"
          />

          <UnstyledButton
            className={classes.control}
            data-checked={checked || undefined}
            onClick={() => handleSelectUser(_id as string)}
            h="100%"
          >
            <Paper {...cardPaperProps} p="lg">
              <Flex {...cardFlexProps} direction="column">
                <div
                  className={classes.avatarWrapper}
                  style={{
                    borderColor: checked
                      ? theme.colors['primary-color'][6]
                      : 'transparent',
                  }}
                >
                  <Avatar
                    photoUrl={photoUrl as string}
                    firstName={firstName}
                    lastName={lastName}
                    size={120}
                    radius={120}
                  />
                </div>
                <Text ta="center" fz="lg" fw={500} mt="md">
                  {`${firstName} ${truncate(lastName, 18)}`}
                </Text>
                <Text ta="center" c="dimmed" fz="sm">
                  {email}
                </Text>
              </Flex>
            </Paper>
          </UnstyledButton>
        </>
      ) : (
        <UnstyledButton
          className={classes.control}
          data-checked={checked || undefined}
          onClick={() => handleSelectUser(_id as string)}
          h="100%"
        >
          <Flex
            direction="column"
            justify="space-between"
            align="center"
            h="100%"
            style={{ gap: '0px' }}
          >
            <div
              className={classes.avatarWrapper}
              style={{
                borderColor: checked
                  ? theme.colors['primary-color'][6]
                  : 'transparent',
              }}
            >
              <Avatar
                photoUrl={photoUrl as string}
                firstName={firstName}
                lastName={lastName}
                size={70}
                fontSize={16}
                radius={120}
              />
            </div>
            <Text ta="center" fz="sm" fw={400}>
              {`${firstName} ${truncate(lastName, 12)}`}
            </Text>
          </Flex>
        </UnstyledButton>
      )}
    </div>
  );
};
