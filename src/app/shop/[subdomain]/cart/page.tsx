"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "@/components/shop/productProfile";
import placeHolderProduct from "@/assets/placeholder.png";

export default function Component() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
      const total = JSON.parse(cartItems)
        .reduce(
          (acc: number, item: CartItem) =>
            acc + Number(item.price) * Number(item.quantity),
          0
        )
        .toFixed(2);
      setTotalPrice(Number(total));
    }
  }, []);

  const handleChangeQty = (value: string, idx: number) => {
    const updatedCartItems = [...cartItems];
    if (Number(value) === 0) {
      updatedCartItems.splice(idx, 1);
    } else {
      updatedCartItems[idx].quantity = Number(value);
    }
    setCartItems(updatedCartItems);

    const total = updatedCartItems
      .reduce(
        (acc: number, item: CartItem) =>
          acc + Number(item.price) * Number(item.quantity),
        0
      )
      .toFixed(2);
    setTotalPrice(total as unknown as number);

    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    const event = new Event("cart-updated");
    window.dispatchEvent(event);
  };
  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 mx-auto  max-w-[1024px] max-[1025px]:px-[0.5rem] px-4 md:px-6 py-12 my-20">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Review the items in your cart and proceed to checkout.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-3">
              <span className="font-medium text-center ">Product</span>
              <span className="font-medium text-right  ">Price</span>
              <span className="font-medium  text-right">Quantity</span>
            </div>
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[100px_1fr_100px] items-center gap-4 px-4 py-3 border-t dark:border-gray-700"
              >
                <Image
                  src={item.image || placeHolderProduct}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">
                    {item.name} - {item.variant}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-medium">${item.price}</span>
                  <Select
                    onValueChange={(val) => handleChangeQty(val, idx)}
                    defaultValue={item.quantity.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Qty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${totalPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium">$0.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
