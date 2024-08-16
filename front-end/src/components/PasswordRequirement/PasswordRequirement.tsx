import { Box, Container, rem } from '@mantine/core';
import { IconEyeCheck, IconX } from '@tabler/icons-react';

/**
 * @function PasswordRequirement - A component that displays the password requirement.
 * @param {boolean} meets - The state of the password requirement.
 * @param {string} label - The label of the password requirement.
 * @returns The PasswordRequirement component.
 */
export function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Container
      c={meets ? 'teal' : 'red'}
      p="0"
      m="0"
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
    >
      {meets ? (
        <IconEyeCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{' '}
      <Box fz="sm" ml={10}>
        {label}
      </Box>
    </Container>
  );
}
