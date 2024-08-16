/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getAllClientReportData } from '../services/reportService';
import notification from '../utils/notification';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

/**
 * @function useTrainingsCharts - Custom hook for managing training charts in the application.
 * @description This hook provides functions to get and set training data.
 * @param {User} selectedUser - The selected user for which to fetch training data
 * @param {Array<Date | null, Date | null>} date - The date range for which to fetch training data
 * @returns The training data, the state of the data, the loading state, the legend data for the types chart, the chart data for the types chart, the legend data for the names chart, the chart data for the names chart, the chart data for the strength chart, the legend data for the strength chart, the chart data for the cardio chart, the legend data for the cardio chart, the chart data for the crossfit chart, and the legend data for the crossfit chart.
 * @see {@link User} - The user type.
 * @see {@link getAllClientTrainings} - A function that fetches the training data for a client.
 * @see {@link notification} - A component of the notification.
 */
const useTrainingsCharts = (
  selectedUser: User,
  date: [Date | null, Date | null] | undefined,
) => {
  const [data, setData] = useState<any[]>([]);
  const [isDataSet, setIsDataSet] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  /**
   * @function fetchUserTraining - Fetches the training data for the selected user and date range.
   * @description - Set the fetched data to the state. If there is an error, displays an error notification or if the data is empty, sets the state.
   * @returns The fetched training data.
   * @throws An error notification if the request fails.
   * @see {@link getAllClientTrainings} - A function that fetches the training data for a client.
   * @see {@link notification} - A component of the notification.
   */
  const fetchUserTraining = async () => {
    // loading only if the whole date is set
    if (date && date[1] !== null) {
      setLoading(true);
    }
    try {
      const data = await getAllClientReportData(
        selectedUser?._id as string,
        date as [Date | null, Date | null],
      );
      if (data.some((chart: any) => chart.data.length !== 0)) {
        setData(data);
        setIsDataSet(true);
      } else {
        setData([]);
        setIsDataSet(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notification({
          type: 'error',
          message: t('notification.ErrorFetchTrainings'),
        });
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserTraining();
  }, [selectedUser, date]);

  // #region Types chart
  /** Extracts the data for the types chart. */
  const typesChart = data?.find(
    (chart) => chart.title === 'Exercise count by type',
  );
  /** Extracts the legend data for the types chart. */
  const typesChartLegend = typesChart?.data.map((item: any) => item._id);
  /** Extracts the chart data for the types chart. */
  const typesChartData = typesChart?.data.map((item: any) => {
    return { name: item._id, value: item.count };
  });
  // #endregion

  // #region Names chart
  /** Extracts the data for the names chart. */
  const namesChart = data?.find(
    (chart) => chart.title === 'Exercise count by name',
  );
  /** Extracts the legend data for the names chart. */
  const namesChartLegend = namesChart?.data.map((item: any) => item._id);
  /** Extracts the chart data for the names chart. */
  const namesChartData = namesChart?.data.map((item: any) => {
    return { name: item._id, value: item.count };
  });
  // #endregion

  // #region Strength chart
  /** Extracts the data for the strength chart. */
  const strengthChartData = data?.find(
    (chart) => chart.title === 'Strength exercises',
  );
  /** Extracts the legend data for the strength chart. */
  const strengthChartNames: Set<string> = new Set(
    strengthChartData?.data
      .map((obj: { [key: string]: any }) =>
        Object.keys(obj).filter((key) => key !== 'date'),
      )
      .flatMap((value: string[]) => {
        return value;
      }),
  );
  // #endregion

  // #region Cardio chart
  /** Extracts the data for the cardio chart. Energy chart */
  const cardioChartDataEnergy = data?.find(
    (chart) => chart.title === 'Cardio exercises, energy',
  );
  /** Extracts the data for the cardio chart. Distance chart */
  const cardioChartDataDistance = data?.find(
    (chart) => chart.title === 'Cardio exercises, distance',
  );
  /** Extracts the legend data for the cardio chart. */
  const cardioChartNames: Set<string> = new Set(
    cardioChartDataEnergy?.data
      .map((obj: { [key: string]: any }) =>
        Object.keys(obj).filter(
          (key) =>
            key !== 'date' &&
            key !== 'totalEnergy' &&
            key !== 'name' &&
            key !== 'totalDistance',
        ),
      )
      .flatMap((value: string[]) => {
        return value;
      }),
  );
  // #endregion

  // #region Crossfit chart
  /** Extracts the data for the crossfit chart. Repeats chart */
  const crossfitChartDataRepeats = data?.find(
    (chart) => chart.title === 'Crossfit exercises, reps',
  );
  /** Extracts the data for the crossfit chart. Weight chart */
  const crossfitChartDataWeight = data?.find(
    (chart) => chart.title === 'Crossfit exercises, weight',
  );
  /** Extracts the legend data for the crossfit chart. */
  const crossfitChartNames: Set<string> = new Set(
    crossfitChartDataRepeats?.data
      .map((obj: { [key: string]: any }) =>
        Object.keys(obj).filter(
          (key) =>
            key !== 'date' &&
            key !== 'totalRepeats' &&
            key !== 'name' &&
            key !== 'totalWeight',
        ),
      )
      .flatMap((value: string[]) => {
        return value;
      }),
  );
  // #endregion

  return {
    data,
    isDataSet,
    loading,
    typesChartLegend,
    typesChartData,
    namesChartLegend,
    namesChartData,
    strengthChartData,
    strengthChartNames,
    cardioChartDataEnergy,
    cardioChartDataDistance,
    cardioChartNames,
    crossfitChartDataRepeats,
    crossfitChartDataWeight,
    crossfitChartNames,
  };
};

export default useTrainingsCharts;
