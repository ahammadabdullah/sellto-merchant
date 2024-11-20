import PageTitle from "@/components/dashboard/PageTitle";

import { ProductForm } from "../EditProduct";

import { PackageSearch, PackagePlus } from "lucide-react";
import prisma from "@/lib/db";

const getProduct = async (productId: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      variants: true,
    },
  });
  return data;
};

export default async function Home({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;

  const product = await getProduct(productId);
  console.log(product);

  return (
    <main className="p-8">
      <PageTitle
        Icon={PackageSearch}
        title={"Edit Product - " + product?.productName}
        subTitle="(total 20 products)"
      />
      <div className="">
        <ProductForm data={product} />
      </div>
    </main>
  );
}
