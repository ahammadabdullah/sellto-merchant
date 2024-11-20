// components
import { Button } from "@/components/ui/CustomButton";
import ChartSec from "@/components/dashboard/root/ChartsSec";

import { ChevronDown } from "lucide-react";

import { RecentOrders, columns } from "./columns";
import { DataTable } from "../../components/helpers/data-table";
import { getRecentOrdersByShopId } from "@/actions/actions";

import { auth } from "@/auth";
import prisma from "@/lib/db";

async function getRecentOrdersData(shopId: string): Promise<RecentOrders[]> {
  const orders = await getRecentOrdersByShopId(shopId);
  return orders;
}
async function getShop(shopId: string) {
  const shop = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
    select: {
      name: true,
      id: true,
    },
  });

  return shop;
}
export default async function Home() {
  const session = await auth();
  const shopId = session?.user?.shopId;
  if (!shopId) {
    return null;
  }
  const shop = await getShop(shopId);
  const RecentOrdersData = await getRecentOrdersData(shopId);
  return (
    <main className="p-8">
      <div className="flex flex-wrap gap-6 mb-10 place-items-center justify-between">
        <div className="text_group flex flex-col gap-2">
          <h1 className="font-clash text-4xl font-medium">
            Welcome {shop?.name}
          </h1>
          <p className="text-sm mt-[-0.7em] opacity-60">
            Here’s the latest data on your store {shop?.name}
          </p>
        </div>
        <Button className="px-6 pr-4">
          Last 7 Days
          <ChevronDown />
        </Button>
      </div>
      <ChartSec className="mb-6" />
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
