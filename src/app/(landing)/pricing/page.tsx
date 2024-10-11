"use client";

import Circles from "@/components/waitlist/Ciecles";
import PageHeading from "@/components/PageHeading";
import PricingSec from "@/components/Pricing/PricingSec";

import { ReactLenis, useLenis } from "lenis/react";
export default function Home() {
  return (
    <ReactLenis root>
      <main className="w-full flex flex-col min-h-[100dvh] overflow-hidden">
        <PageHeading
          sub="Pricing"
          text1="Boost your business without"
          text2=" breaking your bank."
        ></PageHeading>
        <PricingSec></PricingSec>
      </main>
    </ReactLenis>
  );
}
