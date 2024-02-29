import { LanguageContext } from "@/i18n/language-context";
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
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart
        width={400}
        height={400}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <Pie
          data={data}
          dataKey={datakey}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#ffffff"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) =>
            entry.name === dictionary.Expenses ? (
              <Cell key={`cell-${index}`} fill="rgb(34 197 94)" />
            ) : entry.name === dictionary.Income ? (
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
