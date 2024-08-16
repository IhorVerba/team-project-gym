/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @function debounce - Debounce function to prevent multiple calls in a short period of time
 * @param {Function} callback - The function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function with the specified delay.
 */
export function debounce(callback: (...args: any[]) => any, delay: number) {
  let timerId = 0;

  return (...args: any[]) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
