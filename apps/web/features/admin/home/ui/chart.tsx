"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { type MonthlyItem } from "../types/overview"

type Props = {
  data: MonthlyItem[]
}

export const Chart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
