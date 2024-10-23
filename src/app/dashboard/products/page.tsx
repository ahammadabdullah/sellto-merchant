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

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  const shopId = "1279cc87-a710-4b17-bd7f-96aadde2fdc0";
  const products = await getAllProductsByShopId(shopId);
  console.log(products);
  return products;
  // return [
  //   {
  //     id: "728ed5fwaf2f",
  //     product_name: "Product N1",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 100,
  //     status: "Active",
  //     price: 100,
  //   },
  //   {
  //     id: "728fwfwaf2f",
  //     product_name: "Product N2",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 50,
  //     status: "Discontinued",
  //     price: 600,
  //   },
  //   {
  //     id: "728geaf2f",
  //     product_name: "Product N3",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "image",
  //     stock: 40,
  //     status: "Unpublished",
  //     price: 600,
  //   },
  //   {
  //     id: "728ed5fwaf2f",
  //     product_name: "Product N1",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 100,
  //     status: "Active",
  //     price: 100,
  //   },
  //   {
  //     id: "728fwfwaf2f",
  //     product_name: "Product N2",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 50,
  //     status: "Discontinued",
  //     price: 600,
  //   },
  //   {
  //     id: "728geaf2f",
  //     product_name: "Product N3",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "image",
  //     stock: 40,
  //     status: "Unpublished",
  //     price: 600,
  //   },
  //   {
  //     id: "728ed5fwaf2f",
  //     product_name: "Product N1",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 100,
  //     status: "Active",
  //     price: 100,
  //   },
  //   {
  //     id: "728fwfwaf2f",
  //     product_name: "Product N2",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 50,
  //     status: "Discontinued",
  //     price: 600,
  //   },
  //   {
  //     id: "728geaf2f",
  //     product_name: "Product N3",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "image",
  //     stock: 40,
  //     status: "Unpublished",
  //     price: 600,
  //   },
  //   {
  //     id: "728fwfwaf2f",
  //     product_name: "Product N2",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 50,
  //     status: "Discontinued",
  //     price: 600,
  //   },
  //   {
  //     id: "728geaf2f",
  //     product_name: "Product N3",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "image",
  //     stock: 40,
  //     status: "Unpublished",
  //     price: 600,
  //   },
  //   {
  //     id: "728ed5fwaf2f",
  //     product_name: "Product N1",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 100,
  //     status: "Active",
  //     price: 100,
  //   },
  //   {
  //     id: "728fwfwaf2f",
  //     product_name: "Product N2",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "file",
  //     stock: 50,
  //     status: "Discontinued",
  //     price: 600,
  //   },
  //   {
  //     id: "728geaf2f",
  //     product_name: "Product N3",
  //     image: "/product_img.png",
  //     created_at: Date.now(),
  //     type: "image",
  //     stock: 40,
  //     status: "Unpublished",
  //     price: 600,
  //   },
  // ];
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

      <Button className="fixed  z-20 top-24 right-10 shadow-xl px-5 hover:translate-y-[-5px] transition-transform">
        Add product <PackagePlus className="ml-2" />
      </Button>
    </main>
  );
}
