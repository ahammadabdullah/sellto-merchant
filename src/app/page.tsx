"use client";

// libraries
import gsap from "gsap";
import Image from "next/image";

// functions
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <LargeInfoCardsSec></LargeInfoCardsSec>
      <InfoCardsSec></InfoCardsSec>
      <GlobalMap></GlobalMap>
      <Testimonials></Testimonials>
    </main>
  );
}
