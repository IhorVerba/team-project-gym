import { Container, Group, NumberInput, Text } from '@mantine/core';
import { FC, useState } from 'react';
import InputButtons from '../ui/InputButtons';
import { useTranslation } from 'react-i18next';

interface MinutesSecondsInputProps {
  initialSeconds: number;
  onChange: (seconds: number) => void;
  disabled?: boolean;
  label?: string;
}

const MinutesSecondsInput: FC<MinutesSecondsInputProps> = ({
  initialSeconds,
  onChange,
  disabled = false,
  label,
}) => {
  const { t } = useTranslation();
  label = label ?? t('minutesSecondsInput.Time');

  const [minutes, setMinutes] = useState(Math.floor(initialSeconds / 60));
  const [seconds, setSeconds] = useState(initialSeconds % 60);

  const handleMinutesChange = (value: number | string) => {
    const newMinutes = +value;
    setMinutes(newMinutes);
    onChange(newMinutes * 60 + seconds);
  };

  const handleSecondsChange = (value: number | string) => {
    const newSeconds = +value;
    if (newSeconds > 59 || newSeconds < 0) {
      setSeconds(0);
      onChange(minutes * 60);
    } else {
      setSeconds(newSeconds);
      onChange(minutes * 60 + newSeconds);
    }
  };

  return (
    <Container m={0} p={0} mt={5}>
      <Text fz={'12px'} fw={500}>
        {label}
      </Text>
      <Group align="center" wrap="nowrap" w="100%" justify="space-between">
        <NumberInput
          value={minutes}
          onChange={handleMinutesChange}
          min={0}
          placeholder={t('minutesSecondsInput.mm')}
          aria-label="Minutes"
          rightSection={
            !disabled && (
              <InputButtons
                handleValueChange={(minutes) => handleMinutesChange(minutes)}
                value={minutes}
              />
            )
          }
          disabled={disabled}
        />
        <NumberInput
          value={seconds}
          onChange={handleSecondsChange}
          min={0}
          max={59}
          placeholder={t('minutesSecondsInput.ss')}
          aria-label="Seconds"
          rightSection={
            !disabled && (
              <InputButtons
                handleValueChange={(seconds) => handleSecondsChange(seconds)}
                value={seconds}
                incrementValue={15}
              />
            )
          }
          disabled={disabled}
        />
      </Group>
    </Container>
  );
};

export default MinutesSecondsInput;
