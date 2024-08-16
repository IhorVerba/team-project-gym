import React from 'react';
import { buttonProps } from '../../styles/styleProps';
import { Button, Skeleton } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

/**
 * @interface Props - The props for the MobileCreateButton component.
 * @param {() => void} open - The function to open the modal.
 * @param {string} buttonTitle - The title of the button.
 */
type Props = {
  open: () => void;
  buttonTitle: string;
  loading?: boolean;
  mobileBreakPoint?: number;
  disabled?: boolean;
  mobileIcon?: 'plus' | 'minus';
};

/**
 * @function MobileCreateButton - A component that displays a button to create an item on mobile.
 * @description A component that displays a button with an icon to create an item on mobile.
 * @param {Props} props - The props to pass to the component.
 * @returns The MobileCreateButton component.
 */
const MobileCreateButton: React.FC<Props> = ({
  open,
  buttonTitle,
  loading,
  mobileBreakPoint,
  disabled = false,
  mobileIcon = 'plus',
}) => {
  const isMobile = useMediaQuery(`(width <= ${mobileBreakPoint || 1000}px)`);

  return (
    <>
      {isMobile ? (
        !loading ? (
          <Button
            onClick={open}
            {...buttonProps}
            h="2.5rem"
            w="2.5rem"
            p={0}
            disabled={disabled}
          >
            {mobileIcon === 'plus' ? (
              <IconPlus size={20} />
            ) : (
              <IconMinus size={20} />
            )}
          </Button>
        ) : (
          <Skeleton height="2.5rem" width="2.5rem" />
        )
      ) : !loading ? (
        <Button
          onClick={open}
          color="primary-color.9"
          {...buttonProps}
          disabled={disabled}
        >
          {buttonTitle}
        </Button>
      ) : (
        <Skeleton
          width="11rem"
          height="2.5rem"
          flex={{ base: 1, sm: 'auto' }}
        />
      )}
    </>
  );
};

export default MobileCreateButton;
