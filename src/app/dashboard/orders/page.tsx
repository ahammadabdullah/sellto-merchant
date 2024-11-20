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

import { getAllOrdersByShopId } from "@/actions/actions";
import { auth } from "@/auth";
async function getData(shopId: string): Promise<AllOrders[]> {
  const orders = await getAllOrdersByShopId(shopId);
  return orders;
}
export default async function Home() {
  const session = await auth();
  const shopId = session?.user?.shopId;
  if (!shopId) {
    return null;
  }
  const data = await getData(shopId);
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
