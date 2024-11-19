"use client";

// components
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CartItem } from "../productProfile";

interface CopyButton {
  className?: string;
  styles?: any;
  navCloserFunc: CallableFunction;
  amount: number;
}
export function CartButton({
  className,
  styles,
  navCloserFunc,
  amount = 0,
}: CopyButton) {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const items = JSON.parse(cart);
        const total = items.reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        );
        setTotalItems(total);
      } else {
        setTotalItems(0);
      }
    };

    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);
  return (
    <Button
      className={cn(
        styles?.link_button,
        "justify-center place-items-center gap-1  relative px-2 min-[649px]:bg-transparent",
        className
      )}
      variant={"secondary"}
      onClick={() => navCloserFunc("closer")}
    >
      <ShoppingCart size={23} />
      <p className=" top-[-20%] right-[-20%] font-sans opacity-65">
        {totalItems}
      </p>
    </Button>
  );
}
