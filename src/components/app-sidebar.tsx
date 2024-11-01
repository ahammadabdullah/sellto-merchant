"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  ArrowLeftFromLine,
  LayoutDashboard,
  PackageSearch,
  ShoppingBasket,
  Ticket,
  Palette,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// import { selltoLogo as SelltoLogo } from "@/components/ui/custom/Logo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
// import selltoLogo from "@/assets/sellto_logo.svg";
import selltoIcon from "@/assets/icon.svg";
// Menu items.

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", url: "/dashboard" },
  { icon: PackageSearch, label: "Products", url: "/dashboard/products" },
  { icon: ShoppingBasket, label: "Orders", url: "/dashboard/orders" },
  { icon: Ticket, label: "Tickets", url: "/dashboard/tickets" },
  { icon: Palette, label: "Customization", url: "/dashboard/customization" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(pathname);
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  function handleButtonClick(itemUrl: string) {
    if (isMobile) setOpenMobile(!openMobile);
    setActivePage(itemUrl);
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href={navItems[0].url}
                onClick={() => handleButtonClick(navItems[0].url)}
              >
                <Image
                  src={selltoIcon}
                  alt="Sellto logo"
                  width={24}
                  height={24}
                  className="flex aspect-square size-8 items-center justify-center p-1"
                />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium  font-clash text-2xl">
                    Sellto
                  </span>
                  {/* <span className="truncate text-xs text-accent-foreground/60">
                    Admin Dashboard
                  </span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    onClick={() => handleButtonClick(item.url)}
                    className={cn(
                      "h-11 [&>svg]:size-[1.3rem] rounded-none pl-4",
                      activePage === item.url
                        ? "bg-gradient-to-r from-primary/35  via-primary/10 via-25% hover:bg-transparent "
                        : "text-muted-foreground hover:text-foreground  opacity-85 hover:opacity-100"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon
                        size={60}
                        className={cn(
                          activePage === item.url
                            ? "text-primary2 opacity-1"
                            : ""
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
