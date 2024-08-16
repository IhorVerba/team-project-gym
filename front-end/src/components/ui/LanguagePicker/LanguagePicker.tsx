import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import englishImage from '../../../assets/images/english.png';
import ukrainianImage from '../../../assets/images/ukrainian.png';
import classes from './LanguagePicker.module.scss';
import i18n from '../../../i18n';
import { LANGUAGES, LOCALS } from '../../../i18n/constants';

/**
 * @interface LanguageData - The data for the language picker.
 * @param {LANGUAGES} label - The label of the language.
 * @param {string} image - The image of the language.
 */
type LanguageData = {
  label: LANGUAGES;
  image: string;
};

/**
 * @constant LanguagePicker - A constant that displays a language picker.
 * @type {Array<LanguageData>} The data for the language picker.
 * @returns The LanguagePicker constant.
 * @see {@link LanguageData} - The data for the language picker.
 * @see {@link LANGUAGES} - The languages constants.
 */
const data: LanguageData[] = [
  { label: LANGUAGES.EN, image: englishImage },
  { label: LANGUAGES.UK, image: ukrainianImage },
];

/**
 * @function LanguagePicker - A function that displays a language picker.
 * @description A function that displays a language picker with the ability to change the language.
 * @returns The LanguagePicker function.
 * @see {@link LanguageData} - The data for the language picker.
 */
export function LanguagePicker() {
  const [opened, setOpened] = useState(false);

  /**
   * @function definePreviousLanguage - A function that defines the previous language.
   * @description A function that defines the previous language based on the current language.
   * @returns The previous language.
   * @see {@link LOCALS} - The locals constants.
   * @see {@link LANGUAGES} - The languages constants.
   */
  const definePreviousLanguage = () => {
    if (i18n.language === LOCALS[LANGUAGES.EN]) {
      return data[0];
    }
    return data[1];
  };

  const [selected, setSelected] = useState(definePreviousLanguage());

  /**
   * @function setLanguage - A function that sets the language.
   * @description A function that sets the language based on the selected item.
   * @param {LanguageData} item - The item to set the language.
   * @see {@link LanguageData} - The data for the language picker.
   * @see {@link LOCALS} - The locals constants.
   */
  const setLanguage = (item: LanguageData) => {
    const language = LOCALS[item.label];
    i18n.changeLanguage(language);
    setSelected(item);
  };

  /**
   * @constant items - A constant that maps the data to the menu items.
   * @type {Array<React.ReactNode>} The items for the menu.
   * @see {@link LanguageData} - The data for the language picker.
   */
  const items = data.map((item) => (
    <Menu.Item
      disabled={item.label === selected.label}
      leftSection={<Image src={item.image} w="28px" h="28px" />}
      onClick={() => setLanguage(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="100px"
      position="bottom-end"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
          w="90px"
        >
          <Group gap="xs">
            <Image src={selected.image} w="28px" h="28px" />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
