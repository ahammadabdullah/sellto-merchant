// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/CustomButton";
// import ResizableHandle from "@/components/dashboard/root/ResizableLayout";

import { ShoppingBasket, Ticket, Palette } from "lucide-react";

import { AllOrders, columns } from "./columns";
import { DataTable } from "@/components/helpers/data-table";

import PageTitle from "@/components/dashboard/PageTitle";

import {
  getAllOrdersByShopId,
  getRecentOrdersByShopId,
} from "@/actions/actions";
async function getData(): Promise<AllOrders[]> {
  // Fetch data from your API here.
  const shopId = "1279cc87-a710-4b17-bd7f-96aadde2fdc0";
  const orders = await getAllOrdersByShopId(shopId);
  return orders;
}
export default async function Home() {
  const data = await getData();
  return (
    <main className="p-8">
      <PageTitle
        Icon={ShoppingBasket}
        title="Orders"
        subTitle="(total 5 orders)"
      />
      <div className="bg-background rounded p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </main>
  );
}
