import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineReport({
  data,
  datakey,
  name,
}: {
  data: any[];
  datakey: string;
  name: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <Line
          type="monotone"
          dataKey={datakey}
          stroke="lightblue"
          activeDot={{ r: 8 }}
          name={name}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
