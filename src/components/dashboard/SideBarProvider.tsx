"use client";

// import { useState } from "react";

import SideBar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";

// components
import { Button } from "@/components/ui/button";

export default function MultiLangWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full  flex flex-col  mx-auto">
      <TopBar className="bg-red-400"></TopBar>

      <div className=" h-full w-full flex flex-grow mx-auto overflow-hidden">
        <SideBar className="w-[13%] min-w-[175px]"></SideBar>

        <ScrollArea className="content_wrap w-full h-full border-l border-t rounded-tl-lg">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
