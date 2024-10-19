// "use client";
// libraries
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
// import { useGSAP } from "@gsap/react";
// import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/CustomButton";
// import { AlignRight, X, ChevronLast } from "lucide-react";

import card_spotlight from "@/assets/home/card_spotlight.png";

export interface classProps {
  className?: string;
  flip?: boolean;
  sub?: string;
  title?: string;
  p?: string;
}
export default function LargeInfoCard({ className, flip }: classProps) {
  return (
    <div
      className={cn(
        "bg-background border grow text-center flex flex-col place-items-center justify-center py-10 min-h-[390px] sm:min-h-[490px] rounded-md relative overflow-hidden",
        className
      )}
    >
      <div className="text_wrap max-w-[300px] text-center flex flex-col place-items-center px-4 z-[1]">
        <h3 className="text-primary2">Ecommerce</h3>
        <h1 className="text-3xl sm:text-4xl font-clash font-medium max-w-[280px]">
          If it’s digital, sell it on Sellto
        </h1>
        <p className="pt-4 opacity-55 text-sm">
          Sell digital products online with tools built for internet businesses.
        </p>
        <Link href={"/"} className="pt-12">
          <Button className="px-7 font-medium">Learn more</Button>
        </Link>
      </div>
      <div
        className={`spotlights_wrapper w-full h-full absolute pointer-events-none ${
          flip && "scale-y-[-1]"
        }`}
      >
        <Image
          className="absolute right-0"
          src={card_spotlight}
          alt=" "
          placeholder="blur"
        />
        <Image
          className="absolute left-0 scale-x-[-1]"
          src={card_spotlight}
          alt=" "
          placeholder="blur"
        />
        <div className="bg_primary_radial_gradient w-[150%]  aspect-square rounded-full absolute top-[-45%] left-[50%]  translate-x-[-50%] opacity-85"></div>
        <div className="bg_primary_radial_gradient w-[120%]  aspect-square rounded-full absolute bottom-[-52%] sm:bottom-[-70%] left-[50%]  translate-x-[-50%] opacity-85"></div>
      </div>
    </div>
  );
}
