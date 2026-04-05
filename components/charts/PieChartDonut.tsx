"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"
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
import { getExpensesByCategory } from "@/lib/financeLogic"
import { formatINR } from "@/lib/utils"

const CATEGORY_COLORS: Record<string, string> = {
  Rent: "var(--chart-1)",
  Food: "var(--chart-2)",
  Transport: "var(--chart-3)",
  Utilities: "var(--chart-4)",
  Entertainment: "var(--chart-5)",
  Shopping: "hsl(280 65% 60%)",
  Health: "hsl(190 70% 50%)",
  Others: "hsl(0 0% 60%)",
}

function buildConfig(data: { category: string }[]): ChartConfig {
  const config: ChartConfig = { amount: { label: "Amount" } }
  for (const d of data) {
    config[d.category] = {
      label: d.category,
      color: CATEGORY_COLORS[d.category] ?? "hsl(0 0% 50%)",
    }
  }
  return config
}

const ACTIVE_INDEX = 0

export function ChartPieDonutActive() {
  const chartData = useMemo(() => {
    return getExpensesByCategory(mockTransactions).map((d) => ({
      category: d.category,
      amount: d.value,
      fill: `var(--color-${d.category})`,
    }))
  }, [])

  const totalExpenses = useMemo(
    () => chartData.reduce((sum, d) => sum + d.amount, 0),
    [chartData]
  )

  const chartConfig = useMemo(() => buildConfig(chartData), [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Expense breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={70}
              strokeWidth={5}
              shape={({
                index,
                outerRadius = 0,
                ...props
              }: PieSectorShapeProps) =>
                index === ACTIVE_INDEX ? (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                ) : (
                  <Sector {...props} outerRadius={outerRadius} />
                )
              }
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                          ₹{formatINR(totalExpenses)}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                          Total Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm font-medium">
        <div className="flex gap-2">
          All expense categories
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center leading-none text-muted-foreground">
          Tracking your spending habits 
        </div>
      </CardFooter>
    </Card>
  )
}
