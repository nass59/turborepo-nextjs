'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import type { MonthlyItem } from '../types/overview';

type Props = {
  data: MonthlyItem[];
};

const RADIUS_POSITION = 4;

export const Chart = ({ data }: Props) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart data={data}>
        <XAxis
          axisLine={false}
          dataKey="name"
          fontSize={12}
          stroke="#888888"
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          fontSize={12}
          stroke="#888888"
          tickLine={false}
        />
        <Bar
          dataKey="total"
          fill="#3498db"
          radius={[RADIUS_POSITION, RADIUS_POSITION, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
