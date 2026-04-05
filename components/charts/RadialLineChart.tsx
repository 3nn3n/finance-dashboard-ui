"use client"

import { useMemo } from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { getMonthlyTrends } from "@/lib/financeLogic"
import { formatINR } from "@/lib/utils"

const chartConfig = {
  savings: {
    label: "Savings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadarLinesOnly({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const chartData = useMemo(
    () =>
      getMonthlyTrends(transactions).map((d) => ({
        month: d.month,
        savings: d.income - d.expenses,
      })),
    [transactions]
  )

  const totalSavings = useMemo(
    () => chartData.reduce((sum, d) => sum + d.savings, 0),
    [chartData]
  )

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Monthly Savings</CardTitle>
        <CardDescription>
          Total Savings : ₹ {formatINR(totalSavings)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="savings"
              fill="var(--color-savings)"
              fillOpacity={0.2}
              stroke="var(--color-savings)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
