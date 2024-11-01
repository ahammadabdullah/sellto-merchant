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
import { Separator } from "@/components/ui/separator";

import styles from "./LandingNav.module.css";

export default function LandingNav({
  className,
  SidebarTrigger,
}: {
  className?: string;
  SidebarTrigger: any;
}) {
  return (
    <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
      <SidebarTrigger className="-ml-1 [&>svg]:size-[1.3rem]" />
      {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}

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
    </header>
  );
}
