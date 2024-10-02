import Image from "next/image";
import Link from "next/link";

// functions
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "../ui/button";
import Circles from "@/components/waitlist/Ciecles";

import hero_company_icons from "@/assets/home/hero_company_icons.png";

import hero_img from "@/assets/home/hero_img_dark.png";
import hero_img_light from "@/assets/home/hero_img_light.png";
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
    <div className="hero_wrapper min-h-[100dvh] w-full overflow-hidden  relative grid place-items-center">
      <section className="min-h-full container flex flex-wrap gap-6 justify-between items-center place-items-center  main_hero_text opacity-0  relative">
        <div className="left_content max-[1278px]:mt-[30vw] ">
          <div className="text_content">
            <h1 className="sm:text-6xl text-5xl font-clash font-medium">
              <span className="text-primary2">The simplest</span>
              <br />
              digital store solution
              <span className="text-primary2">.</span>
            </h1>
            <p className="mt-2 min-[1278px]:mt-4 opacity-65 max-w-[565px]">
              Sellto is an all-in-one platform to start, run, and grow a digital
              business from software to communities and everything else.
            </p>
          </div>

          <Link href={"/auth/signup"}>
            <Button className="px-12 py-4 font-medium mt-8 min-[1278px]:mt-16">
              Sign up
            </Button>
          </Link>

          <div className="social_proof_wrapper flex flex-wrap place-items-center mt-8 min-[1278px]:mt-16">
            <Image
              className="max-w-[90px] max-h-[55px]"
              src={hero_company_icons}
              alt="Company Logos"
              placeholder="blur"
            />
            <p className="max-w-[340px] leading-[0.98em] font-noraml">
              101+ others <span className="opacity-55">already using</span> our
              services{" "}
              <span className="opacity-55">to grow their business</span>
            </p>
          </div>
        </div>
        <div className="right_content max-[1278px]:w-full max-[1278px]:mb-[-19%] flex items-center justify-center ">
          <Image
            src={hero_img}
            alt="Company Logos"
            placeholder="blur"
            className="max-[1278px]:w-[95%] hidden dark:block"
          />
          <Image
            src={hero_img_light}
            alt="Company Logos"
            placeholder="blur"
            className="max-[1278px]:w-[95%] dark:hidden"
          />
        </div>

        <div className="circel bg_primary_radial_gradient w-[150%] sm:w-full aspect-square rounded-full absolute top-[5%] left-[-40%] sm:top-[-18vw] sm:left-[-40%] pointer-events-none z-[-2] opacity-85"></div>
      </section>
      <div className=" bg_liner_overlay_gradient w-full h-[20%] absolute bottom-0 pointer-events-none z-[1]"></div>
      <Circles />
    </div>
  );
}
