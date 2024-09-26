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
// import { AlignRight, X, ChevronLast } from "lucide-react";

import card_spotlight from "@/assets/home/card_spotlight.png";

export interface classProps {
  className?: string;
  text1?: string;
  text2?: string;
}
export default function LargeInfoCard({ className, text1, text2 }: classProps) {
  return (
    <div className={cn(className, "py-5")}>
      <h1 className="text-4xl sm:text-5xl font-medium font-clash min-[412px]:flex min-[412px]:flex-col ">
        {text1} <span className="text-primary2">{text2}</span>
      </h1>
    </div>
  );
}
