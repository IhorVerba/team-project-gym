import { useState } from 'react';
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  ScrollArea,
  useCombobox,
} from '@mantine/core';
import Avatar from '../ui/Avatar';
import { MultiSelectWithAvatarOptions } from '../../types/MultiSelectWithAvatarOptions';
import { useTranslation } from 'react-i18next';

/**
 * @type Props - The interface for the MultiSelectWithAvatar component.
 * @property {MultiSelectWithAvatarOptions[]} options - The options for the multi select with avatar.
 * @property {string[]} value - The value of the multi select with avatar.
 * @property {(value: string[]) => void} setValue - The function to set the value of the multi select with avatar.
 * @property {string} placeholder - The placeholder of the multi select with avatar.
 * @property {string} label - The label of the multi select with avatar.
 * @property {string | null} error - The error of the multi select with avatar.
 */
type Props = {
  options: MultiSelectWithAvatarOptions[];
  value: string[];
  setValue: (value: string[]) => void;
  placeholder: string;
  label: string;
  error?: string | null;
};

/**
 * @function MultiSelectWithAvatar - A component that displays the multi select with avatar.
 * @param {Props} props - The props to pass to the component.
 * @returns The MultiSelectWithAvatar component.
 * @see {@link Props} - The props for the MultiSelectWithAvatar component.
 */
export const MultiSelectWithAvatar: React.FC<Props> = ({
  options,
  value,
  setValue,
  placeholder,
  label,
  error,
}) => {
  const { t } = useTranslation();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');

  /**
   * @function handleValueSelect - Handles the selection of the value.
   * @param {string} val - The value to select.
   * @returns The result of the value selection.
   */
  const handleValueSelect = (val: string) => {
    const newData = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];

    setValue(newData);
  };

  /**
   * @function handleValueRemove - Handles the removal of the value.
   * @param {string} val - The value to remove.
   * @returns The result of the value removal.
   */
  const handleValueRemove = (val: string) => {
    const newData = value.filter((v) => v !== val);

    setValue(newData);
  };

  // const findPhotoUrl = (val: string) => {
  //   const userPhoto = options.find((option) => option.value === val)?.photoUrl;

  //   return userPhoto ?? '';
  // };

  // const values = value.map((item) => (
  //   <AvatarPill
  //     photoUrl={findPhotoUrl(item) }
  //     key={item}
  //     value={item}
  //     options={options}
  //     onRemove={() => handleValueRemove(item)}
  //   >
  //     {item}
  //   </AvatarPill>
  // ));

  /**
   * @constant visibleOptions - The visible options.
   * @description select options that match the search query
   * @type {React.ReactNode[]}
   */
  const visibleOptions = options
    .filter((item) =>
      item.label.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .map((item) => {
      return (
        <Combobox.Option
          value={item.value}
          key={item.value}
          active={value.includes(item.value)}
        >
          <Group gap="sm" bg="white">
            {value.includes(item.value) ? <CheckIcon size={12} /> : null}
            <Group gap={7} bg="white">
              <Avatar
                photoUrl={item.photoUrl}
                firstName={item.label[0] ?? ''}
                lastName={item.label.split(' ')[1]?.[0] ?? ''}
                size={32}
                fontSize={14}
                radius="xl"
                isVertical
              />
              <span>{item.label}</span>
            </Group>
          </Group>
        </Combobox.Option>
      );
    });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={true}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          error={error}
          pointer
          onClick={() => combobox.toggleDropdown()}
          label={label}
          w="100%"
          maw={650}
        >
          <Pill.Group>
            {value.length > 0 &&
              t('multiSelectWithAvatar.OptionsSelected', {
                count: value.length,
              })}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={placeholder}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah="150px">
            {visibleOptions.length === 0 ? (
              <Combobox.Empty>
                {t('multiSelectWithAvatar.NothingFound')}
              </Combobox.Empty>
            ) : (
              visibleOptions
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
