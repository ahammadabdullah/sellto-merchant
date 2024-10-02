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
import { Check } from "lucide-react";

// import card_spotlight from "@/assets/home/card_spotlight.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface classProps {
  className?: string;
  flip?: boolean;
  sub?: string;
  title?: string;
  p?: string;
  points?: string[];
  pricing: string;
  mostPopular?: boolean;
}

let pointss = [
  "Transaction Fee 5%",
  "24/7 Support",
  "Unlimited Products",
  "Customization Colors",
];
export default function LargeInfoCard({
  className,
  flip,
  sub,
  title,
  points = pointss,
  pricing,
  mostPopular,
}: classProps) {
  return (
    <Card
      className={cn(
        "bg-background grow  flex flex-col  justify-center p-2  rounded-md relative overflow-hidden",
        className
      )}
    >
      <div className="text_wrap   flex flex-col  p-6  gap-5">
        <div className="heading_wrap flex flex-wrap justify-between place-items-end w-full gap-4">
          <div className="left_wrap">
            <p className="text-primary2">{sub}</p>
            <h1 className="text-4xl font-clash font-medium max-w-[280px]">
              {title}
            </h1>
          </div>
          <div>
            <p className="text-xl mb-1">
              <span className="text-[#81B764]">$</span>
              {pricing} <span className="opacity-60">/month</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {points?.map((point) => {
            return (
              <div key={point} className="flex place-items-center gap-2">
                <Check color="#81B764" />

                <p className="opacity-60">{point}</p>
              </div>
            );
          })}
        </div>
      </div>

      <CardFooter>
        {mostPopular ? (
          <Button className="w-full">Get started</Button>
        ) : (
          <Button className="w-full" variant={"secondary"}>
            Get started
          </Button>
        )}
      </CardFooter>
      <div
        className={`spotlights_wrapper w-full h-full absolute pointer-events-none ${
          flip && "scale-y-[-1]"
        }`}
      >
        <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute top-[-70%] right-[-30%] opacity-90"></div>
        <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute bottom-[-70%] left-[-30%]   opacity-90"></div>
      </div>
    </Card>
  );
}
