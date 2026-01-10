import { Pie, PieChart } from "recharts"

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

export const description = "A donut chart"

const chartData = [
  { status: "active", value: 782, fill: "var(--color-primary)" },
  { status: "inactive", value: 228, fill: "#123229" },
]

const chartConfig = {
  active: {
    label: "Active",
    color: "var(--color-primary)"
  },
  inactive: {
    label: "Inactive",
    color: "#123229",
  },
} satisfies ChartConfig

const UserStatusChart = () => {
    return (
        <Card className="border-[0.5px] border-primary/8 bg-secondary-foreground p-4 rounded-sm">
            <CardHeader className="items-center pb-0 px-0">
                <CardTitle className="text-white">Active Users Trend</CardTitle>
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
                        dataKey="value"
                        nameKey="status"
                        innerRadius={75}
                        cornerRadius={8}
                        paddingAngle={4}
                    />
                </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-6 text-base text-white pb-6">
                <div className="flex items-center gap-2 leading-none font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span>Active Users</span>
                </div>
                <div className="flex items-center gap-2 leading-none font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#123229]" />
                    <span>Inactive Users</span>
                </div>
            </CardFooter>
        </Card>
    )
}


export default UserStatusChart;