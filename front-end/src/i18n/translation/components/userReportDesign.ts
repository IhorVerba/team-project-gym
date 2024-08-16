/**
 * @constant userReportDesignTranslations - The translations for the user report design
 * @type {object}
 * @property {object} en - The English translations
 * @property {object} ua - The Ukrainian translations
 */
export const userReportDesignTranslations = {
  en: {
    userReportDesign: {
      containerNotFound: 'Chart container not found',
      sharedSuccess: 'Month report shared successfully',
      failedToShare: 'Failed to share month report',
      share: 'Share my results',
      send: 'Send report',
      selectAll: 'Select all',
      type: 'Exercises types',
      typeDescription:
        'Each slice means type of exercise. Slice size, or number if picked, is the number of exercises of that type.',
      exercises: 'Exercises',
      exercisesDescription:
        'Each slice means exercise. Slice size, or number if picked, is the number of times that exercise was done.',
      strength: 'Strength exercises',
      strengthDescription:
        'Each line means strength exercise. Line height means the maximum weight (kg) lifted in that exercise at training day.',
      cardio: 'Cardio exercises',
      energyTitle: 'Energy',
      cardioEnergyDescription:
        'Each bar means cardio exercise. Bar height means how much energy (kcal) do you produce in that exercise at training day.',
      distanceTitle: 'Distance',
      cardioDistanceDescription:
        'Each bar means cardio exercise. Bar height means how much distance (meters) do you cover in that exercise at training day.',
      crossFit: 'Cross-fit exercises',
      repeatsTitle: 'Repeats sum',
      crossFitRepeatsDescription:
        'Each bar means cross-fit exercise. Bar height means the number of repeats in that exercise per certain amount of time at training day.',
      weightTitle: 'Maximum weight',
      crossFitWeightDescription:
        'Each bar means cross-fit exercise. Bar height means the weight (kg) lifted in that exercise at training day.',
      selectDateRange: 'Select date range to generate report',
      noTrainingsForDate:
        'Or maybe no training data available for the selected date range',
      InvalidDate: 'Invalid date provided',
      noTypeDataClient:
        'Sorry, but there is no data to show. You have to do some exercises first.',
      noTypeDataTrainer:
        'Sorry, but there is no data to show. Your client has to do some exercises first.',
      noExercisesDataClient:
        'Sorry, but there is no exercises to show. You have to do some first.',
      noExercisesDataTrainer:
        'Sorry, but there is no exercises to show. Your client has to do some first.',
      noStrengthDataClient:
        'Sorry, but there is no strength exercises to show. You have to do some first.',
      noStrengthDataTrainer:
        'Sorry, but there is no strength exercises to show. Your client has to do some first.',
      noCardioEnergyDataClient:
        'Sorry, but there is no data about cardio exercises with energy produced to show. You have to do some of those first.',
      noCardioEnergyDataTrainer:
        'Sorry, but there is no data about cardio exercises with energy produced to show. Your client has to do some of those first.',
      noCardioDistanceDataClient:
        'Sorry, but there is no data about cardio exercises with distance covered to show. You have to do some of those first.',
      noCardioDistanceDataTrainer:
        'Sorry, but there is no data about cardio exercises with distance covered to show. Your client has to do some of those first.',
      noCrossFitRepeatsDataClient:
        'Sorry, but there is no data about cross-fit exercises with number of repeats to show. You have to do some of those first.',
      noCrossFitRepeatsDataTrainer:
        'Sorry, but there is no data about cross-fit exercises with number of repeats to show. Your client has to do some of those first.',
      noCrossFitWeightDataClient:
        'Sorry, but there is no data about cross-fit exercises with weight lifted to show. You have to do some of those first.',
      noCrossFitWeightDataTrainer:
        'Sorry, but there is no data about cross-fit exercises with weight lifted to show. Your client has to do some of those first.',
    },
  },
  ua: {
    userReportDesign: {
      containerNotFound: 'Контейнер для графіку не знайдено',
      sharedSuccess: 'Звіт за місяць успішно відправлено',
      failedToShare: 'Не вдалося поділитися звітом',
      share: 'Поділитися',
      send: 'Відправити звіт',
      selectAll: 'Вибрати всі',
      type: 'Типи вправ',
      typeDescription:
        'Кожний сектор відповідає типу вправи. Розмір сектора, або число, якщо вибрано - це кількість вправ такого типу.',
      exercises: 'Вправи',
      exercisesDescription:
        'Кожний сектор відповідає вправі. Розмір сектора, або число, якщо вибрано - це кількість виконань цієї вправи.',
      strength: 'Силові вправи',
      strengthDescription:
        'Кожна лінія відповідає силовій вправі. Висота лінії вказує на максимальну вагу (кг), яку ви підняли у цій вправі в день тренування.',
      cardio: 'Кардіо вправи',
      energyTitle: 'Енергія',
      cardioEnergyDescription:
        'Кожний стовпець відповідає кардіо вправі. Висота смуги вказує на те, скільки енергії (ккал) ви витратили на цю вправу в день тренування.',
      distanceTitle: 'Відстань',
      cardioDistanceDescription:
        'Кожний стовпець відповідає кардіо вправі. Висота смуги вказує на те, яку відстань (метри) ви пройшли в цій вправі в день тренування.',
      crossFit: 'Кросфіт вправи',
      repeatsTitle: 'Сума повторів',
      crossFitRepeatsDescription:
        'Кожний стовпець відповідає кросфіт вправі. Висота смуги вказує на кількість повторів в цій вправі за певний час в день тренування.',
      weightTitle: 'Максимальна вага',
      crossFitWeightDescription:
        'Кожний стовпець відповідає кросфіт вправі. Висота смуги вказує на вагу (кг), яку ви підняли у цій вправі в день тренування.',
      selectDateRange: 'Виберіть діапазон дат для створення звіту',
      noTrainingsForDate:
        'Або можливо немає даних про тренування за вибраний діапазон',
      InvalidDate: 'Надана недійсна дата',
      noTypeDataClient:
        'Вибачте, але немає даних для відображення. Спочатку вам потрібно виконати деякі вправи.',
      noTypeDataTrainer:
        'Вибачте, але немає даних для відображення. Спочатку ваш клієнт повинен виконати деякі вправи.',
      noExercisesDataClient:
        'Вибачте, але немає вправ для відображення. Спочатку вам потрібно виконати деякі з них.',
      noExercisesDataTrainer:
        'Вибачте, але немає вправ для відображення. Спочатку ваш клієнт повинен виконати деякі з них.',
      noStrengthDataClient:
        'Вибачте, але немає силових вправ для відображення. Спочатку вам потрібно виконати деякі з них.',
      noStrengthDataTrainer:
        'Вибачте, але немає силових вправ для відображення. Спочатку ваш клієнт повинен виконати деякі з них.',
      noCardioEnergyDataClient:
        'Вибачте, але немає даних про кардіо вправи з виробленою енергією для відображення. Спочатку вам потрібно виконати деякі з них.',
      noCardioEnergyDataTrainer:
        'Вибачте, але немає даних про кардіо вправи з виробленою енергією для відображення. Спочатку ваш клієнт повинен виконати деякі з них.',
      noCardioDistanceDataClient:
        'Вибачте, але немає даних про кардіо вправи з пройденою відстанню для відображення. Спочатку вам потрібно виконати деякі з них.',
      noCardioDistanceDataTrainer:
        'Вибачте, але немає даних про кардіо вправи з пройденою відстанню для відображення. Спочатку ваш клієнт повинен виконати деякі з них.',
      noCrossFitRepeatsDataClient:
        'Вибачте, але немає даних про кросфіт вправи з кількістю повторів для відображення. Спочатку вам потрібно виконати деякі з них.',
      noCrossFitRepeatsDataTrainer:
        'Вибачте, але немає даних про кросфіт вправи з кількістю повторів для відображення. Спочатку ваш клієнт повинен виконати деякі з них.',
      noCrossFitWeightDataClient:
        'Вибачте, але немає даних про кросфіт вправи з піднятою вагою для відображення. Спочатку вам потрібно виконати деякі з них.',
      noCrossFitWeightDataTrainer:
        'Вибачте, але немає даних про кросфіт вправи з піднятою вагою для відображення. Спочатку ваш клієнт повинен виконати деякі з них.',
    },
  },
};
