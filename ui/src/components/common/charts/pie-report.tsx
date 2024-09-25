import { LanguageContext } from "@/i18n/language-context";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

export default function PieReport({
  data,
  datakey,
}: {
  data: any[];
  datakey: string;
}) {
  const { dictionary } = useContext(LanguageContext);
  const windowDimensions = useWindowDimensions();
  return (
    <ResponsiveContainer width="100%" minHeight="300px" height="100%">
      <PieChart
        width={300}
        height={300}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <Pie
          data={data}
          dataKey={datakey}
          cx="50%"
          cy="50%"
          outerRadius={windowDimensions.width <= 600 ? 90 : 120}
          fill="#ffffff"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) =>
            entry.name === dictionary.Income ? (
              <Cell key={`cell-${index}`} fill="rgb(34 197 94)" />
            ) : entry.name === dictionary.Expenses ? (
              <Cell key={`cell-${index}`} fill="hsl(0 84.2% 60.2%)" />
            ) : (
              <Cell key={`cell-${index}`} fill={"lightblue"} />
            )
          )}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
