// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/dashboard/PageTitle";

import { ProductForm } from "./addProduct";
// import ResizableHandle from "@/components/dashboard/root/ResizableLayout";

// icons
import { PackageSearch, PackagePlus } from "lucide-react";

export default async function Home() {
  return (
    <main className="p-8">
      <PageTitle
        Icon={PackageSearch}
        title="Products"
        subTitle="(total 20 products)"
      />
      <div className="">
        <ProductForm></ProductForm>
      </div>
    </main>
  );
}
