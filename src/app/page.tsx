"use client";
import Image from "next/image";
import TextContent from "@/components/waitlist/TextContent";
import Form from "@/components/waitlist/form";
import Circles from "@/components/waitlist/Ciecles";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    // gsap.to(".main_hero_circle", { opacity: 1, stagger: 0.2 }); // <-- automatically reverted
    // gsap.to(".main_hero_circle", {
    //   rotation: "360",
    //   stagger: 0.5,
    //   duration: 8,
    //   repeat: -1,
    // }); // <-- automatically reverted
    gsap.to(".main_hero_text", {
      y: 0,
      opacity: 1,
      duration: 0.5,
    });
  }, {});
  return (
    <main className="h-[100dvh] grid place-items-center overflow-hidden relative">
      <section className="container text-center flex flex-col gap-4 items-center place-content-center mt-10 main_hero_text opacity-0 translate-y-[70%]">
        <div className="img_wrap mb-[-3rem] relative z-[-3]">
          <Image src="/hero_img.png" width={520} height={300} alt="hero" />
          <div className=" bg_primary_radial_gradient w-[700px] aspect-square rounded-full absolute top-[-300%] sm:top-[-130%] left-[50%] translate-x-[-50%] pointer-events-none z-[-3] animate-pulse "></div>
          {/* <div className="hero_overlay w-[700px] h-[230px]  bg-gradient-to-b from-background/0 to-background absolute bottom-[-100%] left-[50%] translate-x-[-50%]  z-[-2]"></div> */}
        </div>
        <TextContent />
        <Form className="mt-14" />
        <p className="max-w-[580px] opacity-65">
          Join the beta tester waitlist with 110+ others
        </p>
      </section>
      <div className="circel bg_primary_radial_gradient w-[1600px] aspect-square rounded-full absolute top-[6rem] pointer-events-none z-[-1] opacity-85"></div>
      <Circles />
    </main>
  );
}
