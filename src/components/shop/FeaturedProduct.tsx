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
export interface FeaturedProductType {
  className?: string;
  id: string | number;
  stockCount: number;
  image?: any;
  title: string;
  subtitle: string;
  price: string;
}

import sampleProduct from "@/assets/sample_product.png";

export function FeaturedProduct({
  className,
  id,
  stockCount,
  image = sampleProduct,
  title,
  subtitle,
  price,
}: FeaturedProductType) {
  // const { toast } = useToast();

  return (
    <Card className={cn("w-full mx-auto ", className)}>
      <div className="md:flex">
        <div className="relative h-full ">
          <Image
            width={610}
            src={image}
            alt={"wffa"}
            className="w-full h-full md:rounded-l-md max-[767px]:rounded-t-md object-cover aspect-[16/9]"
          ></Image>

          <Badge
            className="absolute top-2 right-2 shadow-lg"
            variant={stockCount > 0 ? "secondary" : "destructive"}
          >
            {stockCount > 0 ? `${stockCount} in stock` : "Out of stock"}
          </Badge>
        </div>
        <div className=" md:flex md:flex-col justify-between relative overflow-hidden ">
          <CardHeader>
            <CardTitle className="text-2xl font-clash font-medium">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground pb-4">{subtitle}</p>
            <p className="text-lg ">
              <span className="text-primary2 font-bold">$</span>
              {price} <span className="text-muted-foreground">USD</span>
            </p>
          </CardHeader>
          <CardFooter className="gap-2 max-[300px]:flex-col">
            <Button
              className="w-full"
              variant={"secondary"}
              size={"sm"}
              asChild
            >
              <Link href={"/product/" + id}>View</Link>
            </Button>
            <Button className="w-full" disabled={stockCount === 0} size={"sm"}>
              {stockCount > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardFooter>
          <div className="circel bg_primary_radial_gradient w-[120%] aspect-square absolute bottom-[-50%] right-[-50%] md:bottom-[-75%]  pointer-events-none opacity-70"></div>
        </div>
      </div>
    </Card>
  );
}
