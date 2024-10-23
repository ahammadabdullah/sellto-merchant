// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/CustomButton";
import ChartSec from "@/components/dashboard/root/ChartsSec";
import ResizableHandle from "@/components/dashboard/root/ResizableLayout";
import Hero from "@/components/home/hero";

import { ChevronDown } from "lucide-react";
import { auth } from "@/auth";

import { RecentOrders, columns } from "./columns";
import { DataTable } from "../../components/helpers/data-table";

async function getRecentOrdersData(): Promise<RecentOrders[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      customer_name: "Customer N1",
      time_date: Date.now(),
      revenue: 10,
      status: "Pending",
    },
    {
      id: "728ed52f",
      customer_name: "Customer N2",
      time_date: Date.now(),
      revenue: 50,
      status: "Completed",
    },
    {
      id: "728ed52f",
      customer_name: "Customer N3",
      time_date: Date.now() + 3000,
      revenue: 100,
      status: "Pending",
    },
  ];
}
export default async function Home() {
  // const layout = cookies().get("react-resizable-panels:layout:mail");
  // const collapsed = cookies().get("react-resizable-panels:collapsed");

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const session = await auth();
  const RecentOrdersData = await getRecentOrdersData();
  // console.log(session);

  return (
    <main className="p-8">
      <div className="flex flex-wrap gap-6 mb-10 place-items-center justify-between">
        <div className="text_group flex flex-col gap-2">
          <h1 className="font-clash text-4xl font-medium">
            Welcome {"Rashid..."}
          </h1>
          <p className="text-sm mt-[-0.7em] opacity-60">
            Here’s the latest data on your store {"{store name}"}
          </p>
        </div>
        <Button className="px-6 pr-4">
          Last 7 Days
          <ChevronDown />
        </Button>
      </div>
      <ChartSec className="mb-6"></ChartSec>
      <div className="rounded-md border w-full bg-background">
        <div className="w-full  px-5 pt-3 flex flex-wrap justify-between">
          <h2 className="font-clash text-lg font-medium">Recent Orders</h2>
          {/* <Button
          className="ml-auto text-sm text-muted-foreground"
          variant="outline"
        >
          Export to Excel
        </Button> */}
        </div>
        <DataTable columns={columns} data={RecentOrdersData} />
      </div>
    </main>
  );
}
