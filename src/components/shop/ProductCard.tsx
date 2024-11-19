// "use client";
// import * as React from "react";
// import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

// icon
// import { EyeOff } from "lucide-react";

// componets
import { Button } from "@/components/ui/CustomButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

import { cn } from "@/lib/utils";

// import { Product as ProductType } from "@/app/dashboard/products/columns";
export interface ProductCardType {
  className?: string;
  id: string | number;
  stockCount: number;
  image?: any;
  title: string;
  subtitle: string;
  price: string;
}

import placeHolderProduct from "@/assets/placeholder.png";
import { truncateString } from "@/lib/utils";
export function ProductCard({
  className,
  id,
  stockCount,
  image,
  title,
  subtitle,
  price,
}: ProductCardType) {
  // const { toast } = useToast();

  return (
    <Card
      className={cn(
        "w-full hover:opacity-85 hover:translate-y-[-7px] transition-all overflow-hidden",
        className
      )}
    >
      <Link href={"/products/" + id} className="">
        <div className="relative ">
          <div className=" relative z-10">
            <Image
              width={610}
              height={343}
              src={image || placeHolderProduct}
              alt={"product"}
              className="w-full h-full rounded-t-md object-cover aspect-[16/9]"
              placeholder="blur"
              blurDataURL={"https://www.sellto.io/og_img2.webp"}
            />
            {!image && (
              <h3 className="text-3xl font-bold absolute text-muted/70 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                N/A
              </h3>
            )}
            <Badge
              className="absolute top-2 right-2 shadow-lg"
              variant={stockCount > 0 ? "secondary" : "destructive"}
            >
              {stockCount > 0 ? `${stockCount} in stock` : "Out of stock"}
            </Badge>
          </div>
          <div className=" md:flex md:flex-col justify-between relative h-full ">
            <CardHeader>
              <CardTitle className="text-xl font-clash font-medium">
                {truncateString(title, 55)}
              </CardTitle>
              <p className="text-xs text-muted-foreground pb-4">
                {truncateString(subtitle, 85)}
              </p>
              <p className="text-lg ">
                <span className="text-primary2 font-bold">$</span>
                {price} <span className="text-muted-foreground">USD</span>
              </p>
            </CardHeader>

            <div className="circel bg_primary_radial_gradient w-[120%] aspect-square absolute bottom-[-90%] right-[-50%]  pointer-events-none opacity-70"></div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
