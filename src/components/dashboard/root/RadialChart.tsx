"use client";

import Link from "next/link";
import { User, SquareArrowOutUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

export const description = "A radial chart with text";

const chartConfig = {
  customerRetention: {
    label: "Customer Retention",
    color: "#875CFF",
  },
} satisfies ChartConfig;

interface ComponentPorps {
  metricValue: number;
  previousValue: number;
  danger: boolean;
  className?: string;
  link: string;
}
export default function Component({
  metricValue,
  previousValue,
  danger,
  className,
  link,
}: ComponentPorps) {
  const chartData = [
    {
      metric: "customerRetention",
      visitors: metricValue,
      fill: "var(--color-customerRetention)",
    },
  ];
  return (
    <Card className={cn(className, "flex flex-col gap-4 justify-between grow")}>
      <CardHeader className="">
        <p className="text-sm opacity-80">Customer retention</p>
        <div className="flex gap-1 place-items-center">
          <h1 className="text-3xl font-clash font-medium text-primary2">
            <User size={32} />
          </h1>
          <h1 className="text-3xl font-clash font-medium max-w-[280px]">
            {metricValue}%
          </h1>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(metricValue / 100) * 360}
            innerRadius={90}
            outerRadius={120}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[96, 84]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 8}
                          className="fill-foreground text-4xl font-medium font-clash"
                        >
                          {chartData[0].visitors.toLocaleString()}%
                        </tspan>
                        {danger ? (
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className=" fill-orange-500"
                          >
                            -{previousValue}%
                          </tspan>
                        ) : (
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className=" fill-green-600"
                          >
                            +{previousValue}%
                          </tspan>
                        )}

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 34}
                          className="fill-muted-foreground"
                        >
                          from last week
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Link href={link} className="w-full">
          <Button variant={"secondary"} className="w-full text-right">
            View more detials
            <SquareArrowOutUpRight size={18} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
