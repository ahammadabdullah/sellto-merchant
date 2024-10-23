// "use client";
// import * as React from "react";
// import gsap from "gsap";
// import Link from "next/link";
// import Image from "next/image";

// icon
import { Copy } from "lucide-react";

// componets
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useToast } from "@/components/hooks/use-toast";
// import { toast as SonnerToast } from "sonner";

interface CopyButton {
  className?: string;
  alertTitle?: string;
  copyContent: string;
  iconSize?: number;
  buttonSize?: "sm" | "lg" | "icon" | "default";
  varient?:
    | "ghost"
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "link";
}
export function CopyButton({
  className,
  alertTitle,
  copyContent,
  iconSize = 15,
  buttonSize = "sm",
  varient = "ghost",
}: CopyButton) {
  const { toast } = useToast();
  return (
    <Button
      className={cn("", className)}
      variant={varient}
      size={buttonSize}
      onClick={() => {
        navigator.clipboard.writeText(copyContent).then(() => {
          toast({
            title: alertTitle ? alertTitle : "Copied: ",
            description: copyContent,
          });
        });
      }}
    >
      <Copy size={iconSize} />
    </Button>
  );
}
