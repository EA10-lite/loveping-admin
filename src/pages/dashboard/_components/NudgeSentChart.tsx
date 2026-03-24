import { TrendingDown, TrendingUp } from "lucide-react"
import { useMemo, useState } from "react"
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
import type { NudgeTimeSeries } from "../../../services/dashboard.service"

type Timeframe = "Day" | "Week" | "Month" | "Year"

type NudgeSentChartProps = {
  data?: {
    day: NudgeTimeSeries
    week: NudgeTimeSeries
    month: NudgeTimeSeries
    year: NudgeTimeSeries
  }
}

const TIMEFRAME_KEY: Record<Timeframe, keyof NonNullable<NudgeSentChartProps["data"]>> =
  {
    Day: "day",
    Week: "week",
    Month: "month",
    Year: "year",
  }

type ChartRow = { label: string; nudges: number }

function formatAxisLabel(timeframe: Timeframe, rawLabel: string): string {
  if (timeframe === "Day") {
    const parts = rawLabel.trim().split(/\s+/)
    return parts[parts.length - 1] ?? rawLabel
  }
  if (timeframe === "Week" || timeframe === "Month") {
    const d = new Date(`${rawLabel}T12:00:00`)
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
  }
  if (timeframe === "Year") {
    const [y, m] = rawLabel.split("-")
    if (y && m) {
      const d = new Date(Number(y), parseInt(m, 10) - 1, 1)
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleDateString(undefined, { month: "short", year: "2-digit" })
      }
    }
  }
  return rawLabel
}

function buildChartRows(
  series: NudgeTimeSeries | undefined,
  timeframe: Timeframe
): ChartRow[] {
  if (!series?.points?.length) return []
  return series.points.map((p) => ({
    label: formatAxisLabel(timeframe, p.label),
    nudges: p.count,
  }))
}

const chartConfig = {
  nudges: {
    label: "Nudges",
    color: "#22C55E",
  },
} satisfies ChartConfig

const CustomTooltip = ({
  active,
  payload,
  label,
  chartData,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
  chartData: ChartRow[]
}) => {
  if (!active || !payload?.length || label == null) return null

  const value = Number(payload[0].value ?? 0)
  const idx = chartData.findIndex((d) => d.label === label)
  const prev = idx > 0 ? chartData[idx - 1].nudges : null

  let comparison: React.ReactNode = null
  if (prev !== null) {
    const diff = value - prev
    if (diff > 0) {
      comparison = (
        <div className="flex items-center gap-1.5 mt-2">
          <TrendingUp className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-medium text-white">
            +{diff} vs previous period
          </span>
        </div>
      )
    } else if (diff < 0) {
      comparison = (
        <div className="flex items-center gap-1.5 mt-2">
          <TrendingDown className="w-4 h-4 text-red-400 shrink-0" />
          <span className="text-sm font-medium text-white">
            {diff} vs previous period
          </span>
        </div>
      )
    } else {
      comparison = (
        <p className="text-sm text-white/70 mt-2">Same as previous period</p>
      )
    }
  }

  return (
    <div className="bg-[#0E2E25] rounded-lg p-4 min-w-[168px] shadow-xl border border-white/5">
      <p className="text-xs text-grey mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-base font-semibold text-white">{value}</span>
        <span className="text-xs text-grey">nudges sent</span>
      </div>
      {comparison}
    </div>
  )
}

const NudgeSentChart = ({ data }: NudgeSentChartProps) => {
  const [timeframe, setTimeframe] = useState<Timeframe>("Year")

  const chartData = useMemo(() => {
    const key = TIMEFRAME_KEY[timeframe]
    return buildChartRows(data?.[key], timeframe)
  }, [data, timeframe])

  return (
    <Card className="border-[0.5px] border-white/5 bg-secondary-foreground p-4 rounded-xl text-white space-y-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 flex-wrap gap-3">
        <CardTitle className="text-lg font-medium">Nudges Sent Over Time</CardTitle>
        <div className="flex items-center gap-2 p-1 rounded-full flex-wrap justify-end">
          {(Object.keys(TIMEFRAME_KEY) as Timeframe[]).map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              size="sm"
              onClick={() => setTimeframe(filter)}
              className={`rounded-full border border-primary/10 px-4 h-8 text-xs font-medium transition-all ${filter === timeframe
                ? "bg-primary text-secondary hover:bg-primary/90"
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
              bottom: 0,
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
              minTickGap={timeframe === "Day" ? 8 : 24}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              allowDecimals={false}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip chartData={chartData} />}
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

export default NudgeSentChart
