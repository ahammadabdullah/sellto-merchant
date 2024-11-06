"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactLenisProvider } from "@/components/helpers/LenisProvider";

import placeHolderProduct from "@/assets/placeholder.png";
import { capitalizeFirstLetter, truncateString } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Variant {
  name: string;
  shortDescription: string;
  description: string;
  price: string;
  currency: "USD" | "EURO";
  customWarranty: boolean;
  warrantyTime: string;
  warrantyText: string;
  unlimitedStock: boolean;
  stock: string;
  minQuantity: string;
  maxQuantity: string;
}

interface ProductProps {
  name: string;
  soldAmount: number;
  shortDescription: string;
  image: string;
  fullDescription: string;
  warranty: string;
  defaultVariant: string;
  variants: Variant[];
}

const DUMMY_PRODUCT: ProductProps = {
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
      currency: "USD",
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
      currency: "USD",
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
      currency: "USD",
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

export default function Component({
  name = DUMMY_PRODUCT.name,
  soldAmount = DUMMY_PRODUCT.soldAmount,
  shortDescription = DUMMY_PRODUCT.shortDescription,
  image = placeHolderProduct.src,
  fullDescription = DUMMY_PRODUCT.fullDescription,
  warranty = DUMMY_PRODUCT.warranty,
  defaultVariant = DUMMY_PRODUCT.defaultVariant,
  variants = DUMMY_PRODUCT.variants,
}: ProductProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    variants.find((v) => v.name === defaultVariant) || variants[0]
  );
  const [quantity, setQuantity] = useState(selectedVariant.minQuantity);

  const handleVariantChange = (variantName: string) => {
    const newVariant =
      variants.find((v) => v.name === variantName) || variants[0];
    setSelectedVariant(newVariant);
    setQuantity(newVariant.minQuantity);
  };

  const totalPrice = Number(selectedVariant.price) * Number(quantity);

  const getMaxQuantity = () => {
    if (selectedVariant.unlimitedStock) {
      return Number(selectedVariant.maxQuantity);
    }
    return Math.min(
      Number(selectedVariant.maxQuantity),
      Number(selectedVariant.stock)
    );
  };

  return (
    <ReactLenisProvider>
      <main className="relative w-full">
        <div className="mx-auto mt-28 max-w-[1024px] max-[1025px]:px-6 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                src={image}
                alt={name}
                width={500}
                height={500}
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{name}</h1>
                <p className="text-xs text-gray-500 mb-4">{soldAmount} sold</p>
                <p className="text-sm mb-4">
                  {truncateString(shortDescription, 85)}
                </p>
              </div>
              <div className="mt-8">
                <h2 className=" font-semibold mb-2">Select Variant</h2>
                <Select
                  onValueChange={handleVariantChange}
                  defaultValue={selectedVariant.name}
                >
                  <SelectTrigger className="w-full px-4 py-8 bg-background/10">
                    <SelectValue
                      placeholder="Select a variant"
                      className="text-xs text-start "
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-background/35 backdrop-blur-xl">
                    {variants.map((variant) => (
                      <SelectItem
                        key={variant.name}
                        value={variant.name}
                        className="focus:bg-muted-foreground/25"
                      >
                        <div className=" text-sm text-start">
                          {defaultVariant === variant.name
                            ? capitalizeFirstLetter(variant.name)
                            : variant.name + " - " + variant.shortDescription}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <p>
                            <span className="text-muted-foreground/85">
                              Price:
                            </span>{" "}
                            {variant.price}
                          </p>
                          <Separator
                            orientation="vertical"
                            className="h-auto"
                          />
                          {variant.unlimitedStock ? (
                            "In Stock"
                          ) : (
                            <p>
                              {variant.stock}{" "}
                              <span className="text-muted-foreground/85">
                                in stock
                              </span>
                            </p>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator className="my-6" />
              {/* price and stock */}
              <div className="mb-6 flex gap-6 flex-wrap">
                <div>
                  <h3 className="text-sm font-medium mb-1">Price</h3>
                  <p className="text-base font-bold">
                    {selectedVariant.price}{" "}
                    <span className="text-muted-foreground/85">
                      {" "}
                      {selectedVariant.currency}
                    </span>
                  </p>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-auto hidden min-[260px]:block"
                />
                <div>
                  <h3 className="text-sm font-medium mb-1">Stock</h3>
                  <p
                    className={`${
                      selectedVariant.unlimitedStock ||
                      Number(selectedVariant.stock) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedVariant.unlimitedStock ||
                    Number(selectedVariant.stock) > 0
                      ? selectedVariant.unlimitedStock
                        ? "In Stock"
                        : `${selectedVariant.stock} in stock`
                      : "Out of stock"}
                  </p>
                </div>
              </div>

              {/* total price and quantity */}
              <div className="mb-6 flex gap-6 flex-wrap justify-between">
                <div>
                  <h3 className="text-base font-medium mb-1">Total Price</h3>
                  <p className="text-lg font-bold">
                    {totalPrice.toFixed(2)}{" "}
                    <span className="text-muted-foreground/85">
                      {" "}
                      {selectedVariant.currency}
                    </span>
                  </p>
                </div>
                {/* <Separator orientation="vertical" className="h-auto" /> */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Quantity</h3>
                  <Select
                    value={quantity}
                    onValueChange={(value) => setQuantity(value)}
                  >
                    <SelectTrigger className="w-32 max-w-[90px] bg-transparent">
                      <SelectValue
                        placeholder="Select quantity"
                        className="bg-background/25"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-background/35 backdrop-blur-xl">
                      {[
                        ...Array(
                          getMaxQuantity() -
                            Number(selectedVariant.minQuantity) +
                            1
                        ),
                      ].map((_, index) => (
                        <SelectItem
                          className="focus:bg-muted-foreground/25"
                          key={index}
                          value={(
                            Number(selectedVariant.minQuantity) + index
                          ).toString()}
                        >
                          {Number(selectedVariant.minQuantity) + index}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="flex-1" variant="secondary">
                  Add to Cart
                </Button>
                <Button className="flex-1">Buy Now</Button>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <p className="mb-6">{fullDescription}</p>
            {selectedVariant.name !== "default" && (
              <>
                <h3 className="text-xl font-semibold mb-2">Variant Details</h3>
                <p className="mb-6">{selectedVariant.description}</p>
              </>
            )}
            <h3 className="text-xl font-semibold mb-2">Warranty Information</h3>
            <p className="mb-2">
              {selectedVariant.customWarranty
                ? selectedVariant.warrantyText
                : warranty}
            </p>
            <p>
              Warranty period:{" "}
              {selectedVariant.customWarranty
                ? selectedVariant.warrantyTime
                : warranty}
            </p>
          </div>
        </div>
        <div className="circel bg_primary_radial_gradient w-[100%] aspect-square rounded-full fixed top-[-100%] left-[50%] translate-x-[-50%] pointer-events-none opacity-40 z-[-1]"></div>
      </main>
    </ReactLenisProvider>
  );
}
