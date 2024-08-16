import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Exercise } from '../types/Exercise';
import Training from '../types/Training';

/**
 * @type  {ItemType} - The type of the items to be paginated.
 * @property {Training} - The training item.
 * @property {User} - The user item.
 * @property {Exercise} - The exercise item.
 * @see {@link Training} - The training type.
 * @see {@link User} - The user type.
 * @see {@link Exercise} - The exercise type.
 */
type ItemType = Training | User | Exercise;

/**
 * @function usePagination - A custom hook that handles the pagination logic.
 * @param {ItemType[]} filteredItems - The items to be paginated.
 * @param {string} searchValue - The search value.
 * @returns The current page, the items per page, the current items, the total pages, the function to change the page, and the function to set the current page.
 * @see {@link useState} - A React hook that allows the use of state in a functional component.
 * @see {@link ItemType} - The type of the items to be paginated.
 */
const usePagination = <T extends ItemType>(
  filteredItems: T[],
  searchValue?: string,
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 575) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 990) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(12);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * @function handleChangePage - Changes the current page.
   * @param {number} newPage - The new page.
   * @returns The new current page.
   */
  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    totalPages < currentPage
      ? setCurrentPage(totalPages)
      : setCurrentPage(currentPage);
    if (searchValue) {
      searchValue?.trim() !== '' && setCurrentPage(1);
    }
  }, [totalPages, currentPage, searchValue]);

  return {
    currentPage,
    itemsPerPage,
    currentItems,
    totalPages,
    handleChangePage,
    setCurrentPage,
  };
};

export default usePagination;
