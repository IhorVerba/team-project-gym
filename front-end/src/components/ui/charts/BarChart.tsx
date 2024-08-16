import {
  BarChart as TremorBarChart,
  BarChartProps,
  EventProps,
} from '@tremor/react';
import { dataFormatter } from '../../../utils/formatDate';
import { useState } from 'react';

/**
 * @function BarChart - A component that displays a bar chart.
 * @param {BarChartProps} props - The props to pass to the component.
 * @returns The BarChart component.
 * @see {@link BarChartProps} - The props for the BarChart component.
 * @see {@link TremorBarChart} - The bar chart component from the Tremor library.
 * @see {@link dataFormatter} - The data formatter function.
 */
const BarChart: React.FC<BarChartProps> = ({
  data,
  index,
  categories,
  ...props
}) => {
  const [, setValue] = useState<EventProps>(null);

  return (
    <TremorBarChart
      className="mt-6"
      data={data}
      index={index}
      categories={categories}
      valueFormatter={dataFormatter}
      yAxisWidth={30}
      animationDuration={1000}
      onValueChange={(v) => setValue(v)}
      {...props}
    />
  );
};

export default BarChart;
