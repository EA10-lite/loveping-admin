import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { nudge: "romantic", count: 275, fill: "#3BD1DC" },
  { nudge: "appreciation", count: 200, fill: "#A561FF" },
  { nudge: "apology", count: 287, fill: "#0050FD" },
  { nudge: "reminder", count: 173, fill: "#F9751D" },
  { nudge: "celebration", count: 190, fill: "#F9751D" },
]

const chartConfig = {
  romantic: {
    label: "Romantic",
    color: "#3BD1DC",
  },
  appreciation: {
    label: "Appreciation",
    color: "#A561FF",
  },
  apology: {
    label: "Apology",
    color: "#0050FD",
  },
  reminder: {
    label: "Reminder",
    color: "#F9751D",
  },
  celebration: {
    label: "Reminder",
    color: "#F9751D",
  },
} satisfies ChartConfig

const NudgeDistributionChart = () => {
    const totalcount = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0)
    }, [])

    return (
        <Card className="border-[0.5px] border-primary/8 bg-[#05251C] p-6 rounded-sm">
        <CardHeader className="items-center pb-0">
            <CardTitle className="text-white">Nudge Type Distribution</CardTitle>
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
                    dataKey="count"
                    nameKey="nudge"
                    innerRadius={75}
                    strokeWidth={5}
                >
                <Label
                    className="text-white"
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-white"
                        >
                            <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-white text-lg font-semibold"
                            >
                                {totalcount.toLocaleString()}
                            </tspan>
                            <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-primary"
                            >
                                52%
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
        <CardFooter className="max-w-3/4 mx-auto text-base text-white flex items-center gap-6 justify-center flex-wrap">
            {chartData?.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 leading-none font-medium"
                >
                    <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                            background: item.fill
                        }}
                    />
                    <span className="capitalize">{item.nudge}</span>
                </div>
            ))}
        </CardFooter>
        </Card>
    )
}


export default NudgeDistributionChart;