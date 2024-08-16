/**
 * @function calcSetsWeights - Calculate the weight for each set based on the progression percentage
 * @param {Array<{ weight?: number; reps?: number }>} prevSets - The previous sets array with objects with weight and reps
 * @param {number} numberOfSets - The number of sets
 * @param {number} progressionPercentage - The progression percentage
 * @returns {Array<{ weight?: number; reps?: number }>} The updated sets with weight
 */
export const calcSetsWeights = (
  prevSets: { weight?: number; reps?: number; duration?: number }[],
  numberOfSets: number,
  progressionPercentage: number,
  initialWeight: number,
) => {
  const progressValue =
    (initialWeight as number) *
    (progressionPercentage / 100 / (numberOfSets - 1));

  const updatedValues: { weight?: number; reps?: number; duration?: number }[] =
    [];

  for (let i = 0; i < numberOfSets; i++) {
    if (i === 0) {
      updatedValues.push({
        weight: initialWeight,
        reps: prevSets[i] && prevSets[i].reps ? prevSets[i].reps : 0,
        duration:
          prevSets[i] && prevSets[i].duration ? prevSets[i].duration : 0,
      });
    } else {
      const prevWeight = updatedValues[i - 1].weight;

      const newWeight = +(
        Math.round(((prevWeight as number) + progressValue) * 100) / 100
      ).toFixed(5);

      updatedValues.push({
        weight: newWeight,
        reps: prevSets[i] && prevSets[i].reps ? prevSets[i].reps : 0,
        duration:
          prevSets[i] && prevSets[i].duration ? prevSets[i].duration : 0,
      });
    }
  }

  updatedValues.forEach(item => {
    if (item.weight !== undefined) {
      item.weight = parseFloat(item.weight.toFixed(1)); // Округлити і конвертувати назад у число
    }
  });

  return updatedValues;
};
