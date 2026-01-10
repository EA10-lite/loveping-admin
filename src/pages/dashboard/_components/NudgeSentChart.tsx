import { TrendingUp } from "lucide-react"
import { useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "../../../components/ui/chart"
import { Button } from "../../../components/ui/button"

const DATA_MAP: Record<string, { label: string; nudges: number }[]> = {
  Day: [
    { label: "12am", nudges: 100 },
    { label: "4am", nudges: 50 },
    { label: "8am", nudges: 200 },
    { label: "12pm", nudges: 600 },
    { label: "4pm", nudges: 800 },
    { label: "8pm", nudges: 400 },
    { label: "11pm", nudges: 200 },
  ],
  Week: [
    { label: "Mon", nudges: 400 },
    { label: "Tue", nudges: 300 },
    { label: "Wed", nudges: 600 },
    { label: "Thu", nudges: 800 },
    { label: "Fri", nudges: 500 },
    { label: "Sat", nudges: 900 },
    { label: "Sun", nudges: 700 },
  ],
  Month: [
    { label: "Week 1", nudges: 2000 },
    { label: "Week 2", nudges: 1500 },
    { label: "Week 3", nudges: 3000 },
    { label: "Week 4", nudges: 2500 },
  ],
  Year: [
    { label: "Jan", nudges: 350 },
    { label: "Feb", nudges: 350 },
    { label: "Mar", nudges: 550 },
    { label: "Apr", nudges: 300 },
    { label: "May", nudges: 800 },
    { label: "Jun", nudges: 800 },
    { label: "Jul", nudges: 400 },
    { label: "Aug", nudges: 700 },
    { label: "Sep", nudges: 1000 },
    { label: "Oct", nudges: 300 },
    { label: "Nov", nudges: 300 },
    { label: "Dec", nudges: 150 },
  ]
}

const chartConfig = {
  nudges: {
    label: "Nudges",
    color: "#22C55E",
  },
} satisfies ChartConfig

const CustomTooltip = ({ active, payload, label, timeframe }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;

    // Determine the comparison period text
    let comparisonText = "";
    if (timeframe === "Year") {
      // Find previous month index
      const currentIndex = DATA_MAP.Year.findIndex(d => d.label === label);
      if (currentIndex > 0) {
        comparisonText = `increase to ${DATA_MAP.Year[currentIndex - 1].label}`;
      } else {
        comparisonText = "increase to last year";
      }
    } else {
      comparisonText = `increase to previous ${timeframe.toLowerCase()}`;
    }

    return (
      <div className="bg-[#0E2E25] rounded-lg p-4 min-w-[168px] shadow-xl border border-white/5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-semibold text-white">{value}</span>
          <span className="text-xs text-grey">Nudges Sent</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-white">+20% {comparisonText}</span>
        </div>
      </div>
    );
  }
  return null;
};

const NudgeSentChart = () => {
  const [timeframe, setTimeframe] = useState("Year");
  const chartData = DATA_MAP[timeframe];

  return (
    <Card className="border-[0.5px] border-white/5 bg-secondary-foreground p-4 rounded-xl text-white space-y-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <CardTitle className="text-lg font-medium">Nudges Sent Over Time</CardTitle>
        <div className="flex items-center gap-2 p-1 rounded-full">
          {["Day", "Week", "Month", "Year"].map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              size="sm"
              onClick={() => setTimeframe(filter)}
              className={`rounded-full border border-primary/10 px-4 h-8 text-xs font-medium transition-all ${filter === timeframe
                ? "bg-[#4ADE80] text-secondary-foreground hover:bg-[#4ADE80]/90"
                : "bg-white/2 text-white/60 hover:text-white hover:bg-white/10"
                }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="max-h-[365px] w-full p-0">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 12,
              top: 10,
              bottom: 0
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              ticks={timeframe === "Month" ? [500, 1000, 1500, 2000, 2500, 3000] : [100, 300, 500, 700, 1000, 1200]}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip timeframe={timeframe} />}
            />
            <Line
              dataKey="nudges"
              type="linear"
              stroke="#22C55E"
              strokeWidth={1.5}
              dot={{
                fill: "#4ADE80",
                stroke: "#4ADE80",
                r: 3,
                strokeWidth: 1,
              }}
              activeDot={{
                r: 4,
                fill: "#4ADE80",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export default NudgeSentChart;