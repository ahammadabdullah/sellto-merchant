// "use client";
// libraries
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
// import { useGSAP } from "@gsap/react";
// import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { AlignRight, X, ChevronLast } from "lucide-react";

import testi_pfp_sample from "@/assets/testi_pfp_sample.png";

export interface classProps {
  className?: string;
  flip?: boolean;
  sub?: string;
  title?: string;
  p?: string;
}
export default function LargeInfoCard({ className, flip }: classProps) {
  return (
    <div className=" grow flex flex-col place-items-center basis-96">
      <div className="name_wrap flex grow w-full place-items-center gap-3 p-4 pb-3 pt-6 bg-gradient-to-t from-primary/20 mb-[-5px]">
        <Image
          className="max-w-[42px] rounded-full "
          src={testi_pfp_sample}
          alt=" "
          placeholder="blur"
        />
        <h1 className="text-1xl sm:text-2xl font-clash font-medium ">
          Farhan Ashhab Nur
        </h1>
      </div>
      <div
        className={cn(
          "bg-background border p-6 rounded-md relative overflow-hidden ",
          className
        )}
      >
        <p className=" opacity-75 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex
        </p>

        <div
          className={`spotlights_wrapper w-full h-full absolute pointer-events-none ${
            flip && "scale-y-[-1]"
          }`}
        >
          <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute bottom-[100%] left-[30%] sm:bottom-[50%] sm:left-[15%]   opacity-85"></div>
          <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute bottom-[10%] right-[40%] sm:bottom-[50%]  sm:right-[15%] opacity-85"></div>
        </div>
      </div>
    </div>
  );
}
{
  /* <Image
className="absolute right-0"
src={card_spotlight}
alt=" "
placeholder="blur"
/> */
}
