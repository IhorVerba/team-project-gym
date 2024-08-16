import Training from '../types/Training';

/**
 * @type TrainingKeys - The keys of the Training object
 * @see {@link Training} for more information on the Training interface
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/keyof-types.html | Keyof Types} for more information on keyof types
 */
type TrainingKeys = keyof Training;

/**
 * @function searchTraining - Search for trainings based on the query string
 * @param {Array<Training>} trainings - The array of trainings to search
 * @param {string} queryString - The query string to search for
 * @param {Date} dateFrom - The start date of the search
 * @param {Date} dateTo - The end date of the search
 * @returns {Array<Training>} The filtered array of trainings
 * @see {@link Training} for more information on the Training interface
 */
const searchTraining = (
  trainings: Training[],
  queryString: string,
  dateFrom: Date | null,
  dateTo: Date | null,
): Array<Training> => {
  const keys: TrainingKeys[] = ['name', 'createdAt'];

  if (queryString.length <= 1 && !dateFrom && !dateTo) {
    return trainings;
  }

  let filteredTrainings = trainings.filter((item) =>
    keys.some((key) =>
      item[key]?.toString().toLowerCase().includes(queryString.toLowerCase()),
    ),
  );

  if (dateFrom && dateTo) {
    filteredTrainings = filteredTrainings.filter((training) => {
      const trainingDate = new Date(training.createdAt as string);
      trainingDate.setHours(0, 0, 0, 0);

      return trainingDate >= dateFrom && trainingDate <= dateTo;
    });
  }

  return filteredTrainings;
};

export default searchTraining;
