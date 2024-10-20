// "use client";
// libraries
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import styles from "./LandingNav.module.css";

export default function LandingNav({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-[50px] flex place-items-center justify-end gap-2 px-5",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 flex-wrap">
          <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="mt-[-5px] sm:mt-[-1px]">
            <h2 className="font-clash font-medium">MD Rashid</h2>
            <p className="text-sm text-muted-foreground ml-[-10px] mt-[-5px]">
              @darkidop
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuItem>Account Settings</DropdownMenuItem>
          <Link href={"/"}>
            <DropdownMenuItem>Home Page</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
