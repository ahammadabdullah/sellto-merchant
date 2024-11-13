"use client";
// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/CustomButton";
import ChartSec from "@/components/dashboard/root/ChartsSec";
import ResizableHandle from "@/components/dashboard/root/ResizableLayout";
import Hero from "@/components/home/hero";
import { useSession } from "next-auth/react";

import { ChevronDown } from "lucide-react";

import { RecentOrders, columns } from "./columns";
import { DataTable } from "../../components/helpers/data-table";
import { getRecentOrdersByShopId } from "@/actions/actions";
import { useRouter } from "next/navigation";

async function getRecentOrdersData(): Promise<RecentOrders[]> {
  const shopId = "1279cc87-a710-4b17-bd7f-96aadde2fdc0";
  const orders = await getRecentOrdersByShopId(shopId);
  return orders;
}
export default function Home() {
  const { data: session } = useSession();
  // const RecentOrdersData = await getRecentOrdersData();

  const router = useRouter();
  if (session?.user.shopId === null) {
    console.log("redirecting to onboarding");
    router.push("/onboarding");
  }

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
        {/* <DataTable columns={columns} data={RecentOrdersData} /> */}
      </div>
    </main>
  );
}
