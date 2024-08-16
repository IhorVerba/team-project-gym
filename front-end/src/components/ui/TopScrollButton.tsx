import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';
import { iconButtonProps } from '../../styles/styleProps';

/**
 * @constant TopScrollButton - A component that displays a button to scroll to the top of the page.
 * @description A component that displays a button with an arrow icon to scroll to the top of the page, that only appears when the user scrolls down.
 * @returns The TopScrollButton component.
 */
const TopScrollButton = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            {...iconButtonProps}
          >
            <IconArrowUp size={20} />
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default TopScrollButton;
