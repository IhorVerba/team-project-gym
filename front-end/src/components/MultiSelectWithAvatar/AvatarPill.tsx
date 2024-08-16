import { CloseButton } from '@mantine/core';
import classes from './AvatarPill.module.css';
import Avatar from '../ui/Avatar';
import { MouseEventHandler } from 'react';

/**
 * @type Options - The options for the AvatarPill component.
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 */
type Options = {
  value: string;
  label: string;
};

/**
 * @interface AvatarPillProps - The interface for the AvatarPill component.
 * @property {string} value - The value of the avatar pill.
 * @property {string} photoUrl - The photo URL of the avatar pill.
 * @property {string} firstName - The first name of the avatar pill.
 * @property {string} lastName - The last name of the avatar pill.
 * @property {Options[]} options - The options of the avatar pill.
 * @property {MouseEventHandler<HTMLButtonElement>} onRemove - The function to remove the avatar pill.
 * @see {@link Options} - The options for the AvatarPill component.
 */
interface AvatarPillProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  options: Options[];
  onRemove?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * @function AvatarPill - A component that displays the avatar pill.
 * @param {AvatarPillProps} props - The props to pass to the component.
 * @returns The AvatarPill component.
 * @see {@link AvatarPillProps} - The props for the AvatarPill component.
 * @see {@link Avatar} - The avatar component.
 */
export function AvatarPill({
  value,
  onRemove,
  photoUrl,
  firstName,
  lastName,
  options,
  ...others
}: AvatarPillProps) {
  const searchedOption = options.find((item) => item.value === value);

  return (
    <div className={classes.avatarPill} {...others}>
      <div className={classes.avatar}>
        <Avatar
          photoUrl={photoUrl as string}
          firstName={firstName}
          lastName={lastName}
          size={40}
        />
      </div>
      <div className={classes.label}>{searchedOption?.label}</div>
      <CloseButton
        onMouseDown={onRemove}
        variant="transparent"
        color="gray"
        size={22}
        iconSize={14}
        tabIndex={-1}
      />
    </div>
  );
}
