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
  title: string;
  icon?: any;
  metric: string;
  percentage: string | number;
  previousMetric: string;
  danger?: boolean;
}

let pointss = [
  "Transaction Fee 5%",
  "24/7 Support",
  "Unlimited Products",
  "Customization Colors",
];
export default function LargeInfoCard({
  className,
  title,
  icon,
  metric,
  percentage,
  previousMetric,
  danger,
}: classProps) {
  return (
    <Card
      className={cn(
        "bg-background grow rounded-md relative overflow-hidden min-[290px]:min-w-[280px]",
        className
      )}
    >
      <CardHeader>
        <p className="text-sm opacity-80">{title}</p>
        <div className="flex gap-1">
          <h1 className="text-xl sm:text-3xl font-clash font-medium text-primary2">
            {icon}
          </h1>

          <h1 className="text-xl sm:text-3xl font-clash font-medium max-w-[280px]">
            {metric}
          </h1>
        </div>
      </CardHeader>
      <CardFooter className="flex  gap-1 text-sm">
        {danger ? (
          <h2 className="bg-orange-600/30 p-2 rounded text-orange-500">
            {percentage}
          </h2>
        ) : (
          <h2 className="bg-green-600/30 p-2 rounded text-green-500">
            {percentage}
          </h2>
        )}
        <h2 className="bg-foreground/15 p-2 pl-3 rounded text-foreground/65 w-full">
          {previousMetric}
        </h2>
      </CardFooter>
    </Card>
  );
}
