import { ActionIcon, Flex } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { iconButtonProps } from '../../styles/styleProps';

/**
 * @function InputButtons - A component that displays buttons to increment and decrement a value.
 * @description A component that displays buttons with icons to increment and decrement a value that uses in number inputs.
 * @param {handleValueChange} handleValueChange - The function to handle the value change.
 * @param {value} value - The value to change.
 * @returns The InputButtons component.
 */
const InputButtons: React.FC<{
  handleValueChange: (value: number) => void;
  value: number | undefined;
  incrementValue?: number;
}> = ({ handleValueChange, value, incrementValue = 1 }) => {
  const increment = () => handleValueChange((value ?? 0) + incrementValue);
  const decrement = () => handleValueChange((value ?? 0) - incrementValue);

  return (
    <Flex gap={5} mr={50}>
      <ActionIcon onClick={increment} {...iconButtonProps} w={30} h={30}>
        <IconPlus />
      </ActionIcon>
      <ActionIcon
        onClick={decrement}
        {...iconButtonProps}
        w={30}
        h={30}
        disabled={value === 0 || value === undefined}
      >
        <IconMinus />
      </ActionIcon>
    </Flex>
  );
};

export default InputButtons;
