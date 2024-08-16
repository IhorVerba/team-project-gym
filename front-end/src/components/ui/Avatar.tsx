import { Avatar, Text } from '@mantine/core';

/**
 * @interface Props - The props for the InitialsAvatar component.
 * @param {string} [photoUrl] - The URL of the photo to display.
 * @param {string} [firstName] - The first name of the user.
 * @param {string} [lastName] - The last name of the user.
 * @param {number} size - The size of the avatar.
 * @param {number | string} [radius] - The radius of the avatar.
 * @param {number} [fontSize] - The font size of the avatar.
 * @param {boolean} [isVertical] - The orientation of the avatar.
 * @param {boolean} [isInitials] - The initials of the avatar.
 */
type Props = {
  photoUrl?: string;
  firstName?: string;
  lastName?: string;
  size: number;
  radius?: number | string;
  fontSize?: number;
  isVertical?: boolean;
  isInitials?: boolean;
};

/**
 * @function InitialsAvatar - A component that displays an avatar.
 * @description A component that displays an avatar with initials based on the user's first and last name.
 * @param {Props} props - The props to pass to the component.
 * @returns The InitialsAvatar component.
 * @see {@link Props} - The props for the InitialsAvatar component.
 */
const InitialsAvatar: React.FC<Props> = ({
  firstName,
  lastName,
  photoUrl,
  size,
  radius,
  fontSize,
  isVertical,
  isInitials,
}) => {
  return (
    <>
      {photoUrl ? (
        <Avatar
          src={photoUrl}
          alt="user avatar"
          size={size}
          radius={radius}
          mx="auto"
          bg="secondary-color.1"
          color="secondary-color.1"
        />
      ) : (
        <Avatar
          size={size}
          radius={radius}
          bg="secondary-color.9"
          color="secondary-color.1"
        >
          <Text ta="center" fz={fontSize ? fontSize : '1.75rem'} fw={500}>
            {isVertical ? (
              <>
                {isInitials ? (
                  <>
                    {firstName && firstName[0].toUpperCase()}
                    {lastName && lastName[0].toUpperCase()}
                  </>
                ) : (
                  <>
                    {firstName && firstName.slice(0, 5)}
                    {lastName ? lastName[0].toUpperCase() : ''}
                  </>
                )}
              </>
            ) : (
              <>
                {firstName?.slice(0, 5)}
                <br />
                {lastName ? lastName[0].toUpperCase() : ''}.
              </>
            )}
          </Text>
        </Avatar>
      )}
    </>
  );
};

export default InitialsAvatar;
