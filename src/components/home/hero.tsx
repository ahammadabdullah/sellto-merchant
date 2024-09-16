import Image from "next/image";
import Link from "next/link";

// functions
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "../ui/button";
import Circles from "@/components/waitlist/Ciecles";

export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.to(".main_hero_text", {
      y: 0,
      opacity: 1,
      duration: 0.5,
    });
  }, {});

  return (
    <div className="hero_wrapper h-[100dvh] w-full overflow-hidden border relative">
      <section className="h-full container  flexs items-center place-content-center mt-10 main_hero_text opacity-0  relative">
        <div className="left_content">
          <div className="text_content">
            <h1 className="sm:text-6xl text-5xl font-clash font-medium">
              <span className="text-primary2">The simplest</span>
              <br />
              digital store solution
              <span className="text-primary2">.</span>
            </h1>
            <p className="mt-4 opacity-65 max-w-[565px]">
              Sellto is an all-in-one platform to start, run, and grow a digital
              business from software to communities and everything else.
            </p>
          </div>

          <Link href={"/auth/signup"}>
            <Button className="px-12 py-4 font-medium mt-14">Sign up</Button>
          </Link>
        </div>

        <div className="circel bg_primary_radial_gradient w-[150%] sm:w-full aspect-square rounded-full absolute top-[5%] left-[-40%] sm:top-[-15vw] sm:left-[-40%] pointer-events-none z-[-2] opacity-85"></div>
      </section>
      <div className=" bg_liner_overlay_gradient w-full h-[20%] absolute bottom-0 pointer-events-none z-[-1]"></div>
      <Circles />
    </div>
  );
}
