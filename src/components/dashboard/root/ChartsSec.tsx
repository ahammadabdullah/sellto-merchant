// import Image from "next/image";
// import Link from "next/link";

// functions
import { cn } from "@/lib/utils";

// components
// import SectionTitle from "@/components/SecTitle";
import MetricsCard from "@/components/dashboard/root/MetricsCardSmall";
import MainChart from "@/components/dashboard/root/MainChart";
import RadialChart from "@/components/dashboard/root/RadialChart";

const chartData = [
  { Xtitle: "Bin", revenue: 186, orders: 80 },
  { Xtitle: "February", revenue: 305, orders: 200 },
  { Xtitle: "March", revenue: 237, orders: 120 },
  { Xtitle: "April", revenue: 73, orders: 190 },
  { Xtitle: "May", revenue: 209, orders: 130 },
  { Xtitle: "June", revenue: 214, orders: 140 },
  { Xtitle: "XYfw", revenue: 214, orders: 140 },
  { Xtitle: "faw", revenue: 274, orders: 140 },
];

// assets
// import img_global_map from "@/assets/home/global_map.png";

// import { ChevronDown } from "lucide-react";
export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  return (
    <section className={cn(className, "")}>
      <div className="wrap flex flex-col gap-5">
        <div className="top_row flex flex-wrap gap-5 justify-around">
          <MetricsCard
            icon="$"
            title="Total Revenue"
            metric="176.52 USD"
            percentage={"+50%"}
            previousMetric="Last week 130$"
          ></MetricsCard>
          <MetricsCard
            icon="$"
            title="Total Revenue"
            metric="176.52 USD"
            danger={true}
            percentage={"+50%"}
            previousMetric="Last week 130$"
          ></MetricsCard>
          <MetricsCard
            icon="$"
            title="Total Revenue"
            metric="176.52 USD"
            percentage={"+50%"}
            previousMetric="Last week 130$"
          ></MetricsCard>
          <MetricsCard
            icon="$"
            title="Total Revenue"
            metric="176.52 USD"
            danger={true}
            percentage={"+50%"}
            previousMetric="Last week 130$"
          ></MetricsCard>
          <MetricsCard
            icon="$"
            title="Total Revenue"
            metric="176.52 USD"
            percentage={"+50%"}
            previousMetric="Last week 130$"
          ></MetricsCard>
        </div>
        <div className="bottom_row flex max-[900px]:flex-wrap gap-5">
          <MainChart chartData={chartData}></MainChart>
          <RadialChart
            previousValue={40}
            metricValue={34}
            danger={true}
            link={"#"}
            className="min-[900px]:max-w-[310px]"
          ></RadialChart>
        </div>
      </div>
    </section>
  );
}
