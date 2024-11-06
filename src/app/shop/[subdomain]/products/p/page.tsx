import ProductProfile from "@/components/shop/productProfile";
import { ReactLenisProvider } from "@/components/helpers/LenisProvider";

const DUMMY_PRODUCT = {
  name: "Premium Wireless Headphones",
  soldAmount: 1234,
  shortDescription: "High-quality wireless headphones with noise cancellation",
  image: "/placeholder.svg?height=300&width=300",
  fullDescription:
    "Experience crystal-clear audio with our Premium Wireless Headphones. Featuring advanced noise cancellation technology, these headphones provide an immersive listening experience. With a comfortable over-ear design and long-lasting battery life, they're perfect for both work and leisure.",
  warranty: "1 year limited warranty",
  defaultVariant: "default",
  variants: [
    {
      name: "default",
      shortDescription: "",
      description: "",
      price: "199.99",
      currency: "USD" as const,
      customWarranty: false,
      warrantyTime: "1 year",
      warrantyText: "Standard 1-year limited warranty",
      unlimitedStock: true,
      stock: "Unlimited",
      minQuantity: "1",
      maxQuantity: "10",
    },
    {
      name: "Standard Edition",
      shortDescription: "Black color, standard features",
      description:
        "The Standard Edition comes in sleek black with all our premium features.",
      price: "199.99",
      currency: "USD" as const,
      customWarranty: false,
      warrantyTime: "1 year",
      warrantyText: "Standard 1-year limited warranty",
      unlimitedStock: false,
      stock: "50",
      minQuantity: "1",
      maxQuantity: "10",
    },
    {
      name: "Pro Edition",
      shortDescription: "Silver color, extended battery life",
      description:
        "The Pro Edition features an extended battery life and comes in a stylish silver finish.",
      price: "249.99",
      currency: "USD" as const,
      customWarranty: true,
      warrantyTime: "2 years",
      warrantyText:
        "Extended 2-year warranty with accidental damage protection",
      unlimitedStock: true,
      stock: "Unlimited",
      minQuantity: "1",
      maxQuantity: "10",
    },
  ],
};

export default function ProductPage() {
  return (
    <ReactLenisProvider>
      <main className="relative w-full">
        <div
          className="mx-auto mt-28 max-w-[1024px] max-[1025px]:px-6 mb-16"
          id="product_details"
        >
          <ProductProfile
            name={DUMMY_PRODUCT.name}
            soldAmount={DUMMY_PRODUCT.soldAmount}
            shortDescription={DUMMY_PRODUCT.shortDescription}
            fullDescription={DUMMY_PRODUCT.fullDescription}
            warranty={DUMMY_PRODUCT.warranty}
            defaultVariant={DUMMY_PRODUCT.defaultVariant}
            variants={DUMMY_PRODUCT.variants}
          />
        </div>
        <div className="circel bg_primary_radial_gradient w-[100%] aspect-square rounded-full fixed top-[-100%] left-[50%] translate-x-[-50%] pointer-events-none opacity-40 z-[-1]"></div>
      </main>
    </ReactLenisProvider>
  );
}
