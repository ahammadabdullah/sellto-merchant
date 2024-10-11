"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An area chart with gradient fill";

const chartConfig = {
  orders: {
    label: "orders",
    color: "hsl(var(--chart-2))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export interface ChartData {
  Xtitle: string;
  revenue: number;
  orders: number;
}

export interface ComponentPorps {
  chartData: ChartData[];
}
export default function Component({ chartData }: ComponentPorps) {
  return (
    <Card className="grow">
      <CardHeader>
        <div className="flex flex-wrap gap-6 justify-between">
          <h1 className="text-sm opacity-80 font-normal">Revenue & Orders</h1>
          <div className="flex place-items-center gap-4">
            <div className="flex place-items-center gap-2">
              <div className="w-[8px] aspect-square bg-[#875CFF] rounded"></div>
              <p className="opacity-75 text-sm ">Revenue</p>
            </div>
            <div className="flex place-items-center gap-2">
              <div className="w-[8px] aspect-square bg-[#A4A7C8] rounded"></div>
              <p className="opacity-75 text-sm ">Orders</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full sm:max-h-[400px]"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="Xtitle"
              tickLine={false}
              axisLine={true}
              tickMargin={12}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#875CFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#875CFF" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A4A7C8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#A4A7C8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              fillOpacity={0.4}
              stroke="#A4A7C8"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              fillOpacity={0.4}
              stroke="#875CFF"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
