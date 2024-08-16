import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { FilterContextValue } from '../types/FilterContextValue';
import UserFilter from '../types/UserFilter';

/**
 * @interface FilterProviderProps - The props for the FilterProvider component.
 * @property {ReactNode} children - The children to be rendered.
 */
interface FilterProviderProps {
  children: ReactNode;
}

/**
 * @constant FilterContext - The context that provides the filter state and functions.
 * @property {string} searchValue - The search value.
 * @property {string} selectedFilter - The selected filter.
 * @property {(value: string) => void} setSearchValue - The function to set the search value.
 * @property {(value: string) => void} setSelectedFilter - The function to set the selected filter.
 * @see {@link FilterContextValue} - The type of the filter context value.
 */
export const FilterContext = createContext<FilterContextValue>({
  searchValue: '',
  selectedFilter: UserFilter.AllUsers,
  setSearchValue: () => {
    return;
  },
  setSelectedFilter: () => {
    return;
  },
});

/**
 * @function FilterProvider - A component that provides the filter context.
 * @param {FilterProviderProps} children - The children to be rendered.
 * @returns The filter context provider.
 * @see {@link FilterProviderProps} - The props for the FilterProvider component.
 */
export const FilterProvider: FC<FilterProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  return (
    <FilterContext.Provider
      value={{
        searchValue,
        setSearchValue,
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
