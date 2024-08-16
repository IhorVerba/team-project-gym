import {
  LineChart as TremorLineChart,
  LineChartProps,
  EventProps,
} from '@tremor/react';
import { useState } from 'react';
import { dataFormatter } from '../../../utils/formatDate';

/**
 * @function LineChart - A component that displays a line chart.
 * @param {LineChartProps} props - The props to pass to the component.
 * @returns The LineChart component.
 * @see {@link LineChartProps} - The props for the LineChart component.
 * @see {@link TremorLineChart} - The line chart component from the Tremor library.
 * @see {@link dataFormatter} - The data formatter function.
 */
const LineChart: React.FC<LineChartProps> = ({
  data,
  index,
  categories,
  ...props
}) => {
  const [, setValue] = useState<EventProps>(null);

  return (
    <TremorLineChart
      data={data}
      index={index}
      categories={categories}
      valueFormatter={dataFormatter}
      className="h-80"
      yAxisWidth={30}
      animationDuration={1000}
      curveType="linear"
      onValueChange={(v) => setValue(v)}
      {...props}
    />
  );
};

export default LineChart;
