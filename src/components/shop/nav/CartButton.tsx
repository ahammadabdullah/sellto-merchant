// "use client";
// import * as React from "react";
// import gsap from "gsap";
// import Link from "next/link";
// import Image from "next/image";

// icon
import { EyeOff } from "lucide-react";

// componets
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

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
  // const { toast } = useToast();
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
      <p className=" top-[-20%] right-[-20%] font-sans opacity-65">{amount}</p>
    </Button>
  );
}
