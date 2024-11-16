// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/dashboard/PageTitle";
import { DataTable } from "@/components/helpers/data-table";
// import ResizableHandle from "@/components/dashboard/root/ResizableLayout";

// icons
import { PackageSearch, PackagePlus } from "lucide-react";

import { columns, Product } from "./columns";
import { getAllProductsByShopId } from "@/actions/actions";
import Link from "next/link";
import { auth } from "@/auth";

async function getData() {
  const session = await auth();
  const shopId = session?.user.shopId;
  let products: Product[] = [];
  if (shopId) {
    const products = await getAllProductsByShopId(shopId);
    return products;
  }
  return products;
}
export default async function Home() {
  const data = await getData();
  return (
    <main className="p-8">
      <PageTitle
        Icon={PackageSearch}
        title="Products"
        subTitle="(total 20 products)"
      />
      <div className="bg-background rounded p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>

      <Button
        className="fixed  z-20 top-24 right-10 shadow-xl px-5 hover:translate-y-[-5px] transition-transform"
        asChild
      >
        <Link href="/dashboard/products/new">
          Add product <PackagePlus className="ml-2" />
        </Link>
      </Button>
    </main>
  );
}
