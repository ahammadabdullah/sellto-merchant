import { ReactLenisProvider } from "@/components/helpers/LenisProvider";
import { ProductHero } from "@/components/shop/ProductHero";
import { ProductCard } from "@/components/shop/ProductCard";
import prisma from "@/lib/db";
import SearchBar from "@/components/shop/SearchBar";
import placeHolderProduct from "@/assets/placeholder.png";

interface ProductsPageProps {
  searchParams: { query: string };
  params: { subdomain: string };
}

export default async function ProductsPage({
  searchParams,
  params,
}: ProductsPageProps) {
  const searchQuery = searchParams.query || "";
  const { subdomain } = params;
  console.log(subdomain, "from products page");
  const products = await prisma.product.findMany({
    where: {
      productName: {
        contains: searchQuery,
        mode: "insensitive",
      },
      shopSubDomain: subdomain,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ReactLenisProvider>
      <main className="w-full overflow-x-hidden">
        <ProductHero />
        <section className="mx-auto max-w-[1024px] max-[1025px]:px-[0.5rem] mb-16">
          <div className="my-10">
            <SearchBar initialQuery={searchQuery} />
          </div>

          <div className="flex flex-wrap justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {products.length === 0 ? (
              <p>No products found</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  className="sm:basis-[325px]"
                  id={product.id}
                  stockCount={0}
                  title={product.productName}
                  subtitle={
                    product.shortDescription || "No description available"
                  }
                  price={product.price.toString()}
                  image={product.image || placeHolderProduct}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </ReactLenisProvider>
  );
}
