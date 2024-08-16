import { Center } from '@mantine/core';
import React, { useEffect } from 'react';

/**
 * @interface Props - The props for the Centered component.
 * @param {React.ReactNode} children - The children to display.
 */
type Props = {
  children: React.ReactNode;
};

/**
 * @function Centered - A component that centers its children.
 * @description A component that centers its children vertically and horizontally on the page. And adjusts the margin-top based on the screen size.
 * @param {Props} props - The props to pass to the component.
 * @returns The Centered component.
 * @see {@link Props} - The props for the Centered component.
 */
const Centered: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Center
      h="80vh"
      style={{
        overflowY: 'hidden',
        overscrollBehaviorY: 'contain',
        scrollbarWidth: 'none' /* For Firefox */,
        msOverflowStyle: 'none' /* For Internet Explorer and Edge */,
      }}
    >
      {children}
    </Center>
  );
};

export default Centered;
