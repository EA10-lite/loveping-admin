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

export const description = "Ping Type Distribution"

const FILL_COLORS = ["#0050FD", "#F9751D", "#D7BA38"];

const chartConfig = {
    call: {
        label: "Call",
        color: "#0050FD",
    },
    text: {
        label: "Text",
        color: "#F9751D",
    },
    gift: {
        label: "Gift",
        color: "#D7BA38",
    },
} satisfies ChartConfig


interface PingTypeDistribution {
    type: string;
    count: number;
    percentage: number;
}

const PingDistributionChart = ({ data }: { data: PingTypeDistribution[] }) => {
    const chartData = data?.map((item: PingTypeDistribution, index: number) => ({
        ...item,
        fill: FILL_COLORS[index],
        ping: item.type,
    }))

    const topPing = React.useMemo(() => {
        return chartData.sort((a, b) => b.count - a.count)[0];
    }, [])

    return (
        <Card className="border-[0.5px] border-primary/8 bg-secondary-foreground p-4 rounded-sm">
            <CardHeader className="items-center pb-0 px-0">
                <CardTitle className="text-white">Ping Type Distribution</CardTitle>
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
                            nameKey="ping"
                            innerRadius={75}
                            strokeWidth={5}
                            cornerRadius={8}
                            paddingAngle={4}
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
                                                    className="fill-white text-lg font-semibold capitalize whitespace-wrap"
                                                >
                                                    {topPing.ping.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-primary"
                                                >
                                                    {topPing.percentage.toLocaleString()}%
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
            <CardFooter className="max-w-3/4 mx-auto text-base text-white flex items-center gap-6 justify-center flex-wrap pb-6">
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
                        <span className="capitalize">{item.ping}</span>
                    </div>
                ))}
            </CardFooter>
        </Card>
    )
}


export default PingDistributionChart;