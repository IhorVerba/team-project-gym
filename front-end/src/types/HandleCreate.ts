/**
 * @type HandleCreate - The type of the handle create function which depends on the generic type.
 * @template T - The generic type of data.
 * @param {T} data - The data to be created.
 * @param {Function} setModalLoading - The function to set the modal loading state.
 * @param {Function} close - The function to close the modal.
 * @returns {Promise<void>} The result of the create request.
 */
export type HandleCreate<T> = (
  data: T,
  setModalLoading?: (value: boolean) => void,
  close?: () => void,
) => Promise<void>;
