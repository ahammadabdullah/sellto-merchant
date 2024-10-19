// "use client";
// libraries
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import styles from "./LandingNav.module.css";

export default function LandingNav({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-[50px] flex place-items-center justify-center gap-4",
        className
      )}
    >
      TopBar
      <Link href={"/"}>
        <Button variant={"ghost"}>Home</Button>
      </Link>
    </div>
  );
}
