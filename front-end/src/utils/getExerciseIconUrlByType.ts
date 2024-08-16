/**
 * @function getExerciseIconUrlByType - Get the icon URL for the exercise type
 * @param {string} type - The type of exercise
 * @returns {string} The URL of the exercise icon
 */
export const getExerciseIconUrlByType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'strength':
      return 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22icon%20icon-tabler%20icon-tabler-barbell%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20stroke-width=%222%22%20stroke=%22currentColor%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M2%2012h1%22%20/%3E%3Cpath%20d=%22M6%208h-2a1%201%200%200%200%20-1%201v6a1%201%200%200%200%201%201h2%22%20/%3E%3Cpath%20d=%22M6%207v10a1%201%200%200%200%201%201h1a1%201%200%200%200%201%20-1v-10a1%201%200%200%200%20-1%20-1h-1a1%201%200%200%200%20-1%201z%22%20/%3E%3Cpath%20d=%22M9%2012h6%22%20/%3E%3Cpath%20d=%22M15%207v10a1%201%200%200%200%201%201h1a1%201%200%200%200%201%20-1v-10a1%201%200%200%200%20-1%20-1h-1a1%201%200%200%200%20-1%201z%22%20/%3E%3Cpath%20d=%22M18%208h2a1%201%200%200%201%201%201v6a1%201%200%200%201%20-1%201h-2%22%20/%3E%3Cpath%20d=%22M22%2012h-1%22%20/%3E%3C/svg%3E';

    case 'cardio':
      return 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22icon%20icon-tabler%20icon-tabler-run%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20stroke-width=%222%22%20stroke=%22currentColor%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M13%204m-1%200a1%201%200%201%200%202%200a1%201%200%201%200%20-2%200%22%20/%3E%3Cpath%20d=%22M4%2017l5%201l.75%20-1.5%22%20/%3E%3Cpath%20d=%22M15%2021l0%20-4l-4%20-3l1%20-6%22%20/%3E%3Cpath%20d=%22M7%2012l0%20-3l5%20-1l3%203l3%201%22%20/%3E%3C/svg%3E';

    case 'crossfit':
      return 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22icon%20icon-tabler%20icon-tabler-stretching-2%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20stroke-width=%222%22%20stroke=%22currentColor%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M11%204a1%201%200%201%200%202%200a1%201%200%200%200%20-2%200%22%20/%3E%3Cpath%20d=%22M6.5%2021l3.5%20-5%22%20/%3E%3Cpath%20d=%22M5%2011l7%20-2%22%20/%3E%3Cpath%20d=%22M16%2021l-4%20-7v-5l7%20-4%22%20/%3E%3C/svg%3E';
  }

  return 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22icon%20icon-tabler%20icon-tabler-olympics%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20stroke-width=%222%22%20stroke=%22currentColor%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M6%209m-3%200a3%203%200%201%200%206%200a3%203%200%201%200%20-6%200%22%20/%3E%3Cpath%20d=%22M18%209m-3%200a3%203%200%201%200%206%200a3%203%200%201%200%20-6%200%22%20/%3E%3Cpath%20d=%22M12%209m-3%200a3%203%200%201%200%206%200a3%203%200%201%200%20-6%200%22%20/%3E%3Cpath%20d=%22M9%2015m-3%200a3%203%200%201%200%206%200a3%203%200%201%200%20-6%200%22%20/%3E%3Cpath%20d=%22M15%2015m-3%200a3%203%200%201%200%206%200a3%203%200%201%200%20-6%200%22%20/%3E%3C/svg%3E';
};
