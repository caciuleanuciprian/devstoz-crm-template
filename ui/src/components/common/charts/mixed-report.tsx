import { LanguageContext } from "@/i18n/language-context";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MixedReportProps {
  data: any;
}

export default function MixedReport({ data }: MixedReportProps) {
  const { dictionary } = useContext(LanguageContext);
  const windowDimensions = useWindowDimensions();
  const aspectRatio = useMemo(() => {
    if (windowDimensions.width <= 500) {
      return 4 / 3;
    } else if (windowDimensions.width > 500 && windowDimensions.width <= 768) {
      return 16 / 9;
    } else if (windowDimensions.width > 768 && windowDimensions.width <= 1024) {
      return 21 / 9;
    } else {
      return 34 / 9;
    }
  }, [windowDimensions]);
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={aspectRatio}>
      <BarChart
        width={500}
        height={350}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="6" className="opacity-50" />
        <XAxis className="text-xs font-semibold" dataKey="name" />
        <YAxis className="text-xs font-semibold" />
        <Tooltip
          wrapperClassName="!bg-background"
          labelClassName="text-lg font-semibold"
        />
        <Legend />
        <Bar
          dataKey="noOfClients"
          fill="#add8e6"
          activeBar={<Rectangle fill="#add8e6" stroke="black" />}
          name={dictionary.NoOfClients}
        />
        <Bar
          dataKey="noOfTransactions"
          fill="#6eecc6"
          activeBar={<Rectangle fill="#6eecc6" stroke="black" />}
          name={dictionary.NoOfTransactions}
        />
        <Bar
          dataKey="totalIncome"
          fill="#90ee90"
          activeBar={<Rectangle fill="#90ee90" stroke="black" />}
          name={dictionary.TotalIncome}
        />
        <Bar
          dataKey="totalExpenses"
          fill="#FF7F7F"
          activeBar={<Rectangle fill="#FF7F7F" stroke="black" />}
          name={dictionary.TotalExpenses}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
