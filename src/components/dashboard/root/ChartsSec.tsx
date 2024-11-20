import { cn } from "@/lib/utils";

import MetricsCard from "@/components/dashboard/root/MetricsCardSmall";
import MainChart from "@/components/dashboard/root/MainChart";
import RadialChart from "@/components/dashboard/root/RadialChart";
import { getChartData, getDashboardStatistics } from "@/actions/statistics";
import { auth } from "@/auth";

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

export interface classProps {
  className?: string;
}
export default async function Component({ className }: classProps) {
  const session = await auth();
  const shopId = session?.user?.shopId;
  if (!shopId) {
    return null;
  }
  const data = await getDashboardStatistics(shopId);
  const chartData = await getChartData();
  console.log(chartData);
  return (
    <section className={cn(className, "")}>
      <div className="wrap flex flex-col gap-5">
        <div className="top_row flex flex-wrap gap-5 justify-around">
          <MetricsCard
            icon="$"
            title="Total Revenue"
            metric={data?.totalRevenue.thisWeek.toString() + " USD"}
            percentage={
              (data?.totalRevenue.growth > 0 ? "+" : "") +
              data?.totalRevenue.growth.toString() +
              "%"
            }
            previousMetric={`Last week ${data.totalRevenue.lastWeek} $ `}
          />
          <MetricsCard
            icon="$"
            title="Orders"
            metric={data?.totalOrders.thisWeek.toString()}
            percentage={
              (data?.totalOrders.growth > 0 ? "+" : "") +
              data?.totalOrders.growth.toString() +
              "%"
            }
            previousMetric={`Last week ${data.totalOrders.lastWeek}  `}
          />
          <MetricsCard
            icon="$"
            title="Average Order Value"
            metric={data?.averageOrderValue.thisWeek.toFixed(2) + " USD"}
            percentage={
              (data?.averageOrderValue.growth > 0 ? "+" : "") +
              data?.averageOrderValue.growth.toString() +
              "%"
            }
            previousMetric={`Last week $${data.averageOrderValue.lastWeek}  `}
          />
          <MetricsCard
            icon="$"
            title="Total Tickets"
            metric={data?.totalTickets.allTime.toString()}
            previousMetric={`Open Tickets ${data.totalTickets.openTicketsAllTime}  `}
          />
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
