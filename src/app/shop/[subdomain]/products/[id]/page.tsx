import { ReactLenisProvider } from "@/components/helpers/LenisProvider";
import ProductProfile from "@/components/shop/productProfile";
import prisma from "@/lib/db";
import { Product, Variant } from "@/types/types";

interface ProductPageParams {
  id: string;
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductWithVariants extends Product {
  variants: Variant[];
}

export default async function ProductPage({
  params,
}: {
  params: ProductPageParams;
}) {
  const { id } = params;

  const product: ProductWithVariants | null = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
    },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ReactLenisProvider>
      <main className="relative w-full">
        <div
          className="mx-auto mt-28 max-w-[1024px] max-[1025px]:px-6 mb-16"
          id="product_details"
        >
          <ProductProfile data={product} />
        </div>
        <div className="circle bg_primary_radial_gradient w-[100%] aspect-square rounded-full fixed top-[-100%] left-[50%] translate-x-[-50%] pointer-events-none opacity-40 z-[-1]"></div>
      </main>
    </ReactLenisProvider>
  );
}
