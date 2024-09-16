"use client";

import * as React from "react";
import { Moon, Sun, LaptopIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-background/5 fixed right-2 bottom-2 z-[1005]"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

      <TooltipProvider>
        <RadioGroup
          defaultValue="system"
          className="flex gap-0 fixed right-2 bottom-2 z-[1005] border rounded-3xl bg-background/65 backdrop-blur-2xl"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-full  bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent"
                onClick={() => setTheme("light")}
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Sun className="h-4 w-4 " />
              </Label>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Light</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-full  bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent"
                onClick={() => setTheme("dark")}
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Moon className="h-4 w-4" />
              </Label>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Dark</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-full  bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent"
                onClick={() => setTheme("system")}
              >
                <RadioGroupItem
                  value="system"
                  id="system"
                  className="sr-only"
                />
                <LaptopIcon className="h-4 w-4" />
              </Label>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>System</p>
            </TooltipContent>
          </Tooltip>
        </RadioGroup>
      </TooltipProvider>
    </>
  );
}
