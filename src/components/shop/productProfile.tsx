"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter, truncateString } from "@/lib/utils";

export interface ProductProfileProps {
  data: Product;
}
export interface CartItem {
  id: string;
  variant: string;
  quantity: number;
  price: string;
  name: string;
  image: string | null;
  shortDescription?: string;
  productId: string;
  variantId: string;
}
import placeHolderProduct from "@/assets/placeholder.png";
import { Product, Variant } from "@/types/types";
import { toast } from "@/components/hooks/use-toast";

export default function ProductProfile({ data }: ProductProfileProps) {
  const {
    productName,
    image,
    soldCount,
    shortDescription,
    fullDescription,
    defaultWarrantyText,
    variants,
  } = data;
  const defaultVariant = variants[0]?.name;
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    variants.find((v) => v.name === defaultVariant) || variants[0]
  );
  const [quantity, setQuantity] = useState<number>(
    Number(selectedVariant.minQuantity)
  );

  const handleVariantChange = (variantName: string) => {
    const newVariant =
      variants.find((v) => v.name === variantName) || variants[0];
    setSelectedVariant(newVariant);
    setQuantity(Number(newVariant.minQuantity));
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
  const handleAddToCart = () => {
    let item = {} as CartItem;
    item.id = data.id;
    item.name = productName;
    item.variant = selectedVariant.name;
    item.quantity = quantity;
    item.price = Number(selectedVariant.price).toFixed(2);
    item.image = image || null;
    item.shortDescription =
      selectedVariant.shortDescription || item.shortDescription;
    item.productId = data.id;
    item.variantId = selectedVariant.id;
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItems = JSON.parse(cart) as CartItem[];
      const itemIndex = cartItems.findIndex(
        (i) => i.id === item.id && i.variantId === item.variantId
      );
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += item.quantity;
      } else {
        cartItems.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      const cartItems: CartItem[] = [item];
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    const event = new Event("cart-updated");
    window.dispatchEvent(event);
    toast({
      title: "Success",
      description: `${productName}- ${selectedVariant.name} added to cart`,
      variant: "default",
    });
  };
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={image ? image : placeHolderProduct}
            alt={productName}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{productName}</h1>
            <p className="text-xs text-gray-500 mb-4">{soldCount} sold</p>
            <p className="text-sm mb-4">
              {truncateString(shortDescription || "", 85)}
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
                        <span className="text-muted-foreground/85">Price:</span>{" "}
                        {variant.price}
                      </p>
                      <Separator orientation="vertical" className="h-auto" />
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
                value={quantity?.toString()}
                onValueChange={(value) => setQuantity(Number(value))}
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
                      getMaxQuantity() - Number(selectedVariant.minQuantity) + 1
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
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              variant="secondary"
            >
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
            : defaultWarrantyText || "No warranty information available"}
        </p>
        <p>
          Warranty period:{" "}
          {selectedVariant.customWarranty
            ? selectedVariant.warrantyTime
            : defaultWarrantyText || "No warranty information available"}
        </p>
      </div>
    </>
  );
}
