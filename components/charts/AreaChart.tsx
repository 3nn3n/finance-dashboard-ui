"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useMemo } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { mockTransactions } from "@/data/mockTransactions"

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function buildChartData(transactions: Transaction[]) {
  const grouped: Record<string, { income: number; expense: number }> = {}

  for (const t of transactions) {
    const month = t.date.slice(0, 7) // "2025-10"
    if (!grouped[month]) grouped[month] = { income: 0, expense: 0 }
    grouped[month][t.type] += t.amount
  }

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => {
      const date = new Date(month + "-01")
      const label = date.toLocaleString("default", { month: "short", year: "2-digit" })
      return { month: label, income: data.income, expense: data.expense }
    })
}

export function ChartAreaDefault() {
  const chartData = useMemo(() => buildChartData(mockTransactions), [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>
          Monthly breakdown from transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm pb-1">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Tracking income &amp; expenses <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Oct 2025 - Mar 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
