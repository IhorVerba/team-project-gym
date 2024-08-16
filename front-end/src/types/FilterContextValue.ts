import { Dispatch, SetStateAction } from 'react';

/**
 * @interface FilterContextValue - The FilterContextValue interface.
 * @property {string} searchValue - The searchValue property.
 * @property {string} selectedFilter - The selectedFilter property.
 * @property {Dispatch<SetStateAction<string>>} setSearchValue - The setSearchValue property.
 * @property {Dispatch<SetStateAction<string>>} setSelectedFilter - The setSelectedFilter property.
 */
export interface FilterContextValue {
  searchValue: string;
  selectedFilter: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
}
