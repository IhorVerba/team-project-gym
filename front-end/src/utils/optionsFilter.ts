import { ComboboxItem, OptionsFilter } from '@mantine/core';

/**
 * @function optionsFilter - Filters options based on search input
 * @param {object} options - The options to be filtered
 * @param {string} search - The search input
 * @returns {Array<ComboboxItem>} The filtered options
 * @see {@link https://mantine.dev/core/combobox/#search-input | Mantine Combobox | Search input} for more information on optionsFilter
 */
const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord)),
    );
  });
};

export default optionsFilter;
