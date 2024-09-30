"use client";

// libraries
import gsap from "gsap";
import Image from "next/image";
import { ReactLenis, useLenis } from "lenis/react";

// components
import { Button } from "@/components/ui/button";
import TextContent from "@/components/waitlist/TextContent";
import Form from "@/components/waitlist/form";
import Circles from "@/components/waitlist/Ciecles";
import Hero from "@/components/home/hero";
import LargeInfoCardsSec from "@/components/home/LargeInfoCardsSec";
import InfoCardsSec from "@/components/home/InfoCards";
import GlobalMap from "@/components/home/globalMap";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import Footer from "@/components/nav/Footer";

export default function Home() {
  return (
    <ReactLenis root>
      <main className="w-full">
        <Hero />
        <LargeInfoCardsSec></LargeInfoCardsSec>
        <InfoCardsSec></InfoCardsSec>
        <GlobalMap></GlobalMap>
        <Testimonials></Testimonials>
        <CTABanner></CTABanner>
        <Footer></Footer>
      </main>
    </ReactLenis>
  );
}
