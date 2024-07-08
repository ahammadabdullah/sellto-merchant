"use client";
import { cn } from "@/lib/utils";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    // gsap code here...
    gsap.to(".main_hero_circle", { opacity: 1, stagger: 0.2 }); // <-- automatically reverted
    gsap.to(".main_hero_circle", {
      rotation: "360",
      stagger: 0.5,
      duration: 8,
      repeat: -1,
    }); // <-- automatically reverted
  }, {});
  return (
    <>
      {/* <div className="hero_circles_wrap pointer-events-none absolute top-0 z-[-5] h-full w-full grid place-items-center mt-[-10%]">
        <div className="w-[800px] circel boder_primary_gradient aspect-square rounded-full col-start-1 row-start-1"></div>
        <div className="w-[1000px] z-[-1] rotate-90 circel boder_primary_gradient aspect-square rounded-full col-start-1 row-start-1"></div>
        <div className="w-[1200px] z-[-2] rotate-45 circel boder_primary_gradient aspect-square rounded-full col-start-1 row-start-1"></div>
        <div className="w-[1400px] z-[-3] rotate-12 circel boder_primary_gradient aspect-square rounded-full col-start-1 row-start-1"></div>
      </div> */}
      <div
        className={cn(
          "hero_circles_wrap pointer-events-none absolute top-0 z-[-5] h-full w-full",
          className
        )}
      >
        <div className="opacity-0 w-[760px] sm:w-[845px] circel boder_primary_gradient aspect-square rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] main_hero_circle"></div>
        <div className="opacity-0 w-[1050px] z-[-1]  circel boder_primary_gradient aspect-square rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] main_hero_circle"></div>
        <div className="opacity-0 w-[1250px] z-[-2]  circel boder_primary_gradient aspect-square rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] main_hero_circle"></div>
        <div className="opacity-0 w-[1450px] z-[-3]  circel boder_primary_gradient aspect-square rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] main_hero_circle"></div>
      </div>
    </>
  );
}
