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

export default function Home() {
  return (
    <main className=" w-full ">
      <Hero />

      <h2 className="text-4xl text-center w-full min-h-screen bg-slate-50/10 grid place-items-center">
        {" "}
        Section
      </h2>
    </main>
  );
}
