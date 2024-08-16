import { useForm } from '@mantine/form';
import { Exercise, basicTypes } from '../../types/Exercise';
import { HandleCreate } from '../../types/HandleCreate';
import {
  Button,
  Flex,
  Group,
  NumberInput,
  Stack,
  Switch,
  Text,
} from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { calcSetsWeights } from '../../utils/calcSetsWeights';
import { debounce } from '../../utils/debounce';
import { useTranslation } from 'react-i18next';
import InputButtons from '../ui/InputButtons';
import { IconEdit, IconSettingsOff } from '@tabler/icons-react';
import { buttonProps } from '../../styles/styleProps';
import MinutesSecondsInput from '../MinutesSecondsInput/MinutesSecondsInput';

/**
 * @interface Props UserExerciseForm props
 * @property {HandleCreate<Exercise>} onCreate Function to create new exercise
 * @property {string[]} workoutTypes List of workout types
 * @property {Exercise} defaultModalValues Default values for modal
 * @see {@link Exercise}
 * @see {@link HandleCreate}
 */
type Props = {
  onCreate: HandleCreate<Exercise>;
  workoutTypes: string[];
  defaultModalValues?: Exercise;
  disabled?: boolean;
  isEditable: boolean;
  setIsSetted: (value: boolean) => void;
  isSetted: boolean;
};

/**
 * @function  getSetsNumbers Function to get array of numbers
 * @param {number | undefined} n Number of sets
 * @returns {number[]} Array of numbers
 */
const getSetsNumbers = (n: number | undefined) => {
  if (!n) {
    return [];
  }

  const result = [];

  for (let i = 1; i <= n; i++) {
    result.push(i);
  }

  return result;
};

/**
 * @function UserExerciseForm UserExerciseForm component
 * @param {Props} props Component props
 * @returns {JSX.Element} UserExerciseForm component
 * @see {@link Props} interface
 * @see {@link calcSetsWeights} Function to calculate sets weights
 * @see {@link debounce} Function to debounce function
 * @see {@link InputButtons} InputButtons component
 */
export const UserExerciseForm: React.FC<Props> = ({
  onCreate,
  workoutTypes,
  defaultModalValues,
  disabled,
  isEditable,
  setIsSetted,
  isSetted,
}) => {
  const { t } = useTranslation();

  const [numberOfSets, setNumberOfSets] = useState(
    getSetsNumbers(defaultModalValues?.sets?.length),
  );

  const [isDisabled, setIsDisabled] = useState(disabled);

  const [initialWeight, setInitialWeight] = useState(
    defaultModalValues?.sets &&
      defaultModalValues?.sets[0] &&
      defaultModalValues?.sets[0].weight
      ? defaultModalValues?.sets[0].weight
      : 0,
  );
  const [progressionPercentage, setProgressionPercentage] = useState(30);
  const [progressionPercentageChanged, setProgressionPercentageChanged] =
    useState(false);
  const [initialWeightChanged, setInitialWeightChanged] = useState(false);

  const [resultVariant, setResultVariant] = useState<string>(
    defaultModalValues?.result?.distance ? 'distance' : 'energy',
  );

  const initialType = workoutTypes.find(
    (type) => type.toLowerCase() === defaultModalValues?.type.toLowerCase(),
  );

  const initialValues = {
    name: defaultModalValues?.name || '',
    type: defaultModalValues?.type || basicTypes[0],
    ...(defaultModalValues ? defaultModalValues : {}),
    result: defaultModalValues?.result || {},
    sets: defaultModalValues?.sets || [],
  };

  const form = useForm({
    initialValues,
  });

  useEffect(() => {
    if (form.values.sets.length < numberOfSets.length) {
      let updatedValues: {
        weight?: number;
        reps?: number;
        duration?: number;
      }[] = [];
      const lastIndex = numberOfSets.length - 1;

      if (lastIndex >= 0) {
        updatedValues = calcSetsWeights(
          form.values.sets,
          numberOfSets.length,
          progressionPercentage,
          initialWeight,
        );
      } else {
        updatedValues.push({ weight: 0, reps: 0, duration: 0 });
      }

      form.setFieldValue('sets', updatedValues);
      handleUpdateValues({ ...form.values, sets: updatedValues });
    } else if (form.values.sets.length > numberOfSets.length) {
      if (
        !form.values.sets[0] ||
        (!form.values.sets[0].weight && form.values.sets[0].weight !== 0)
      ) {
        return;
      }

      const updatedValues = calcSetsWeights(
        form.values.sets,
        numberOfSets.length,
        progressionPercentage,
        initialWeight,
      );

      form.setFieldValue('sets', updatedValues);
      handleUpdateValues({ ...form.values, sets: updatedValues });
    } else {
      if (!form.values.sets[0]) {
        return;
      }

      if (initialWeightChanged || progressionPercentageChanged) {
        form.values.sets[0].weight = initialWeight;

        const updatedValues = calcSetsWeights(
          form.values.sets,
          numberOfSets.length,
          progressionPercentage,
          initialWeight,
        );

        form.setFieldValue('sets', updatedValues);
        setProgressionPercentageChanged(false);
        setInitialWeightChanged(false);

        if (initialWeightChanged) {
          handleUpdateValues({ ...form.values, sets: updatedValues });
        }
      }
    }
  }, [numberOfSets.length, progressionPercentage, initialWeight]);

  const handleSubmit = (values: Exercise) => {
    const newValues = { ...values };

    if (values.type === basicTypes[1]) {
      delete newValues.sets;

      if (newValues.result?.distance) {
        delete newValues.result?.energy;
      } else {
        delete newValues.result?.distance;
      }
    } else if (values.type === basicTypes[2]) {
      newValues.sets?.forEach((set) => {
        if (!set.duration) {
          set.duration = 0;
        }
      });
    }

    if (values.type !== basicTypes[1]) {
      delete newValues.result;
    }

    if (values.type === basicTypes[0]) {
      values.sets?.forEach((item) => {
        delete item.duration;
      });
    }

    if (!isSetted) {
      setIsSetted(true);
    }

    onCreate({ ...newValues });
  };

  const handleSetsChange = (value: number) => {
    let valueToSet = value;

    if (value > 10) {
      valueToSet = 10;
    }

    setNumberOfSets(getSetsNumbers(valueToSet));
    if (value === 0 || !form.values.sets[0]) {
      setInitialWeight(0);
      handleUpdateValues({ ...form.values, sets: [] });
    }
  };

  /**
   * @function handleWeightChange Function to handle weight change
   * @param {number} index Index of set
   * @param {number} value New weight value
   * @returns {void} Sets new values of weight to form values and updates them
   */
  const handleWeightChange = (index: number, value: number) => {
    const newSets = [...form.values.sets];

    if (index === 0) {
      setInitialWeight(value);
      setInitialWeightChanged(true);
    }

    newSets[index].weight = value;

    form.setFieldValue('sets', newSets);
    handleUpdateValues(form.values);
  };

  /**
   * @function handleRepsChange Function to handle reps change
   * @param {number} index Index of set
   * @param {number} value New reps value
   * @returns {void} Sets new values of repeats to form values and updates them
   */
  const handleRepsChange = (index: number, value: number) => {
    const newSets = [...form.values.sets];

    newSets[index].reps = value;

    form.setFieldValue('sets', newSets);
    handleUpdateValues(form.values);
  };

  const handleSetsDurationChange = (index: number, value: number) => {
    const newSets = [...form.values.sets];

    newSets[index].duration = value;

    form.setFieldValue('sets', newSets);
    handleUpdateValues(form.values);
  };

  /**
   * @function handleProgressionPercentageChange Function to handle progression percentage change
   * @param {number} value New percentage value
   * @returns {void} Sets new percentage value to form values and updates them
   */
  const handleProgressionPercentageChange = (value: number) => {
    setProgressionPercentage(value);
    setProgressionPercentageChanged(true);
  };

  /**
   * @function handleFieldChange Function to handle field change
   * @param {string} fieldName Name of field
   * @param {number} value New value
   * @returns {void} Sets new value to form values and updates them
   */
  const handleFieldChange = (fieldName: string, value: number) => {
    const updatedValues = { ...form.values };

    switch (fieldName) {
      case 'duration':
      case 'restTime':
        updatedValues[fieldName] = value;
        break;
      case 'result.distance':
      case 'result.energy':
        updatedValues.result = {
          ...form.values.result,
          [fieldName.substring(7)]: value,
        };
        break;
      default:
        break;
    }

    form.setFieldValue(fieldName, value);
    handleUpdateValues(updatedValues);
  };

  const handleSwitchChange = () => {
    if (resultVariant === 'energy') {
      setResultVariant('distance');
      handleFieldChange('result.energy', 0);
    } else {
      setResultVariant('energy');
      handleFieldChange('result.distance', 0);
    }
  };

  /**
   * @function handleUpdateValues Function to debounce form values update
   * @param {Exercise} values New values
   * @returns {void} Updates form values
   */
  const handleUpdateValues = useCallback(
    debounce((values: Exercise) => handleSubmit(values), 1500),
    [],
  );

  /**
   * @function stopPropagationHandler Function to stop propagation
   * @description Stops propagation of event to parent elements to prevent closing modal
   * @param {React.MouseEvent<HTMLFormElement, MouseEvent>} e Mouse Event
   * @returns {void} Stops propagation
   */
  const stopPropagationHandler = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  return (
    <form
      action=""
      onSubmit={form.onSubmit((values: Exercise) => {
        handleSubmit(values);
      })}
      onClick={stopPropagationHandler}
    >
      <Stack>
        {initialType?.toLowerCase() !== basicTypes[1].toLowerCase() && (
          <>
            <NumberInput
              placeholder={t('userExerciseForm.numberOfSets')}
              value={numberOfSets.length === 0 ? '' : numberOfSets.length}
              label={t('userExerciseForm.numberOfSets')}
              clampBehavior="strict"
              min={1}
              max={10}
              onChange={(e) => handleSetsChange(Number(e))}
              rightSection={
                !isDisabled && (
                  <InputButtons
                    handleValueChange={(e) => handleSetsChange(Number(e))}
                    value={numberOfSets.length}
                  />
                )
              }
              disabled={isDisabled}
            />

            {numberOfSets.length > 0 && (
              <NumberInput
                placeholder={t('userExerciseForm.percentage')}
                value={progressionPercentage}
                label={t('userExerciseForm.percentage')}
                min={0}
                onChange={(e) => handleProgressionPercentageChange(Number(e))}
                rightSection={
                  !isDisabled && (
                    <InputButtons
                      handleValueChange={(e) =>
                        handleProgressionPercentageChange(Number(e))
                      }
                      value={progressionPercentage}
                    />
                  )
                }
                disabled={isDisabled}
              />
            )}

            {numberOfSets.length > 0 &&
              numberOfSets.map((number, index) => (
                <div key={index}>
                  <Text fz="sm" fw="500">
                    {`${t('userExerciseForm.set')} ${number}`}
                  </Text>
                  <Flex mt="0px" w={{ base: '100%', sm: 'auto' }} gap="sm">
                    <NumberInput
                      placeholder={t('userExerciseForm.weight')}
                      value={
                        form.values.sets[index]
                          ? form.values.sets[index].weight === 0
                            ? ''
                            : form.values.sets[index].weight
                          : ''
                      }
                      label={t('userExerciseForm.weight')}
                      min={0}
                      decimalScale={1}
                      onChange={(e) => handleWeightChange(index, Number(e))}
                      w="50%"
                      rightSection={
                        !isDisabled && (
                          <InputButtons
                            handleValueChange={(e) =>
                              handleWeightChange(index, Number(e))
                            }
                            value={
                              form.values.sets[index]
                                ? form.values.sets[index].weight
                                : 0
                            }
                          />
                        )
                      }
                      disabled={isDisabled}
                    />
                    <NumberInput
                      placeholder={t('userExerciseForm.reps')}
                      value={
                        form.values.sets[index]
                          ? form.values.sets[index].reps || ''
                          : 0
                      }
                      label={t('userExerciseForm.reps')}
                      min={0}
                      onChange={(e) => handleRepsChange(index, Number(e))}
                      w="50%"
                      rightSection={
                        !isDisabled && (
                          <InputButtons
                            handleValueChange={(e) =>
                              handleRepsChange(index, Number(e))
                            }
                            value={
                              form.values.sets[index]
                                ? form.values.sets[index].reps
                                : 0
                            }
                          />
                        )
                      }
                      disabled={isDisabled}
                    />
                  </Flex>

                  {initialType === basicTypes[2] && (
                    <MinutesSecondsInput
                      label={t('userExerciseForm.durationLabel')}
                      initialSeconds={
                        form.values.sets[index]
                          ? form.values.sets[index].duration || 0
                          : 0
                      }
                      onChange={(seconds) =>
                        handleSetsDurationChange(index, seconds)
                      }
                      disabled={isDisabled}
                    />
                  )}
                </div>
              ))}
            <MinutesSecondsInput
              label={t('userExerciseForm.restBetweenSetsLabel')}
              initialSeconds={form.values.restTime || 0}
              onChange={(seconds) => handleFieldChange('restTime', seconds)}
              disabled={isDisabled}
            />
          </>
        )}

        {initialType === basicTypes[1] && (
          <>
            <MinutesSecondsInput
              label={t('userExerciseForm.durationLabel')}
              initialSeconds={form.values.duration ?? 0}
              onChange={(seconds) => handleFieldChange('duration', seconds)}
              disabled={isDisabled}
            />
            <Group align="flex-end" justify="space-between">
              {resultVariant === 'distance' ? (
                <NumberInput
                  placeholder={t('userExerciseForm.distancePlaceholder')}
                  value={form.values.result.distance || ''}
                  label={t('userExerciseForm.distanceLabel')}
                  min={0}
                  onChange={(e) =>
                    handleFieldChange('result.distance', Number(e))
                  }
                  flex={1}
                  rightSection={
                    !isDisabled && (
                      <InputButtons
                        handleValueChange={(e) =>
                          handleFieldChange('result.distance', Number(e))
                        }
                        value={form.values.result.distance}
                      />
                    )
                  }
                  disabled={isDisabled}
                  maw={220}
                />
              ) : (
                <NumberInput
                  placeholder={t('userExerciseForm.energyPlaceholder')}
                  value={form.values.result.energy || ''}
                  label={t('userExerciseForm.energyLabel')}
                  min={0}
                  onChange={(e) =>
                    handleFieldChange('result.energy', Number(e))
                  }
                  flex={1}
                  rightSection={
                    !isDisabled && (
                      <InputButtons
                        handleValueChange={(e) =>
                          handleFieldChange('result.energy', Number(e))
                        }
                        value={form.values.result.energy}
                      />
                    )
                  }
                  disabled={isDisabled}
                  maw={220}
                />
              )}
              <Switch
                label={
                  resultVariant === 'distance'
                    ? t('userExerciseForm.distanceRadioLabel')
                    : t('userExerciseForm.energyRadioLabel')
                }
                defaultChecked
                checked={resultVariant === 'energy'}
                onChange={handleSwitchChange}
                h={30}
                labelPosition="left"
              />
            </Group>
          </>
        )}

        {isEditable && (
          <Button
            onClick={() => setIsDisabled((prev) => !prev)}
            {...buttonProps}
            h="2.5rem"
            w="2.5rem"
            p={0}
            ml="auto"
          >
            {isDisabled ? <IconEdit /> : <IconSettingsOff />}
          </Button>
        )}
      </Stack>
    </form>
  );
};
