import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function AreaReport({
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
      <AreaChart
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
        <Area
          type="monotone"
          dataKey={datakey}
          stroke="lightblue"
          fill="lightblue"
          name={name}
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}
