import {
  DonutChart as TremorDonutChart,
  DonutChartProps,
  EventProps,
} from '@tremor/react';
import { useState } from 'react';
import { dataFormatter } from '../../../utils/formatDate';

/**
 * @interface DonutChartProps - The props for the DonutChart component.
 * @param {DonutChartProps} data - The data to display in the chart.
 * @see {@link DonutChartProps} - The props for the DonutChart component.
 * @see {@link TremorDonutChart} - The donut chart component from the Tremor library.
 * @see {@link dataFormatter} - The data formatter function.
 */
const DonutChart: React.FC<DonutChartProps> = ({ data, ...props }) => {
  const [, setValue] = useState<EventProps>(null);

  return (
    <>
      <TremorDonutChart
        data={data}
        showAnimation
        animationDuration={1000}
        valueFormatter={dataFormatter}
        onValueChange={(v) => setValue(v)}
        {...props}
      />
    </>
  );
};

export default DonutChart;
