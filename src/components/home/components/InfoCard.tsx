// "use client";
// libraries
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
// import { useGSAP } from "@gsap/react";
// import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// import { AlignRight, X, ChevronLast } from "lucide-react";

import card_spotlight from "@/assets/home/card_spotlight.png";

export interface classProps {
  className?: string;
  flip?: boolean;
  sub?: string;
  title?: string;
  p?: string;
  points: string[];
}

let pointss = [
  "Software & keys",
  "Accounts",
  "Digital Assets",
  "Content & videos",
  "Discord roles",
  "Game powerups",
];
export default function LargeInfoCard({
  className,
  flip,
  title,
  points = pointss,
}: classProps) {
  return (
    <div
      className={cn(
        "bg-background border grow  flex flex-col  justify-center   rounded-md relative overflow-hidden",
        className
      )}
    >
      <div className="text_wrap max-w-[300px]  flex flex-col p-6  sm:p-9  gap-5">
        <h1 className="text-4xl font-clash font-medium max-w-[280px]">
          {title}
        </h1>
        <div className="flex flex-col gap-3">
          {points?.map((point) => {
            return (
              <div key={point} className="flex place-items-center gap-2">
                <div className="aspect-square w-[5px] bg-primary2 rounded-full"></div>
                <p className="opacity-60">{point}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`spotlights_wrapper w-full h-full absolute pointer-events-none ${
          flip && "scale-y-[-1]"
        }`}
      >
        <div className="bg_primary_radial_gradient w-[150%]  aspect-square rounded-full absolute top-[-70%] left-[10%] opacity-85"></div>
        <div className="bg_primary_radial_gradient w-[150%]  aspect-square rounded-full absolute bottom-[-65%]  right-[10%]   opacity-60"></div>
      </div>
    </div>
  );
}
