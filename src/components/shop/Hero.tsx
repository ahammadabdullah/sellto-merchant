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
import Circles from "@/components/waitlist/Ciecles";
import { ChevronRight } from "lucide-react";

export interface classProps {
  className?: string;
  sub?: string;
  title?: string;
  sub_title?: string;
  link: string;
}
export function ShopHero({
  className,
  sub,
  title,
  sub_title,
  link,
}: classProps) {
  return (
    <div className={cn(className, "py-5")}>
      <div className="hero_wrapper min-h-[400px] w-full relative  grid place-items-center">
        <section className="min-h-full container flex flex-col gap-8 justify-center items-center place-items-center relative main_hero_text   text-center">
          {/* <p className="text-primary2 text-lg">Pricing</p> */}
          <div className="space-y-2 mt-4">
            <h1 className="text-3xl sm:text-5xl font-medium font-clash max-w-[850px]">
              {title}
            </h1>
            <p className="max-w-[550px] text-sm text-muted-foreground mx-auto">
              {sub_title}
            </p>
          </div>

          <Button className="gap-1" asChild={true}>
            <Link href={link}>
              Start shopping
              {/* <ChevronRight size={20} /> */}
            </Link>
          </Button>
          <div className="circel bg_primary_radial_gradient w-[150%] sm:w-[75%] aspect-square rounded-full absolute min-[850px]:top-[-50%] min-[1140px]:top-[-85%] left-[50%] translate-x-[-50%] pointer-events-none z-[-2] opacity-60"></div>
        </section>
        {/* <div className=" bg_liner_overlay_gradient w-full h-[20%] absolute bottom-0 pointer-events-none z-[1]"></div> */}
        {/* <Circles /> */}
      </div>
    </div>
  );
}
