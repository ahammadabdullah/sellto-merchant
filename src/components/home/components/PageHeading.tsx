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
import Circles from "@/components/waitlist/Ciecles";
// import { AlignRight, X, ChevronLast } from "lucide-react";

export interface classProps {
  className?: string;
  sub?: string;
  text1?: string;
  text2?: string;
}
export default function PageHeading({
  className,
  sub,
  text1,
  text2,
}: classProps) {
  return (
    <div className={cn(className, "py-5")}>
      <div className="hero_wrapper min-h-[540px] w-full relative max-[600px]:overflow-hidden grid place-items-center">
        <section className="min-h-full container flex flex-col gap-4 justify-center items-center place-items-center relative main_hero_text   text-center">
          <p className="text-primary2 text-lg">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-medium font-clash min-[412px]:flex min-[412px]:flex-col ">
            {text1} <span className="text-primary2">{text2}</span>
          </h1>
          <div className="circel bg_primary_radial_gradient w-[150%] sm:w-full aspect-square rounded-full absolute min-[850px]:top-[-50%] min-[1140px]:top-[-85%] left-[50%] translate-x-[-50%] pointer-events-none z-[-2] opacity-80"></div>
        </section>
        {/* <div className=" bg_liner_overlay_gradient w-full h-[20%] absolute bottom-0 pointer-events-none z-[1]"></div> */}
        {/* <Circles /> */}
      </div>
    </div>
  );
}
