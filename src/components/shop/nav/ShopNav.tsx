"use client";
// libraries
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button as CustomButton } from "@/components/ui/CustomButton";
import { Button } from "@/components/ui/button";
import { CartButton } from "./CartButton";

import { AlignRight, ChevronLast } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import styles from "./ShopLandingNav.module.css";

import { LinkType } from "@/types/types";
const NavLinks: LinkType[] = [
  { url: "/", label: "Home" },
  { url: "/products", label: "Products" },
  { url: "/contact", label: "Contact" },
];

type ShopNavTypes = {
  className?: string;
  proUser: boolean;
  shopLogo: any;
  shopName: string;
};
export default function LandingNav({
  className,
  shopLogo,
  shopName,
}: ShopNavTypes) {
  const [menuOn, setMenuOn] = useState<boolean>(false);
  const [mobileNav, setmobileNav] = useState<boolean>(false);

  // gsap init
  gsap.registerPlugin(useGSAP);

  // movile nav handler
  const navHandlder = useCallback(
    (buttonType: string) => {
      if (buttonType === "resizeOpener") {
        gsap.to(".landing_mobile_nav_wrap", {
          x: 0,
          duration: 0.25,
        });
      } else if (buttonType === "opener") {
        gsap.to(".landing_mobile_nav_wrap", {
          x: 0,
          duration: 0.25,
        });
        setMenuOn(true);
      } else if (buttonType === "closer" && mobileNav) {
        gsap.to(".landing_mobile_nav_wrap", {
          x: "100%",
          duration: 0.3,
        });
        setMenuOn(false);
      }
    },
    [mobileNav]
  );

  // Close the navbar when the user clicks outside of it && handle window resizes
  useEffect(() => {
    if (window.innerWidth < 639) setmobileNav(true);
    const closeNavbarOnOutsideClick = (event: any) => {
      const navbar = document.querySelector(".landing_mobile_nav_wrap");
      const navbarOpener = document.querySelector(".landing_mobile_nav_opener");
      if (
        navbar &&
        !navbar.contains(event.target) &&
        !navbarOpener?.contains(event.target) &&
        menuOn
      ) {
        // console.log("dfw");
        navHandlder("closer");
      }
    };

    const handleResize = () => {
      // Check window width and open menu if it's larger than a certain threshold
      const windowWidth = window.innerWidth;
      if (windowWidth > 639) {
        setmobileNav(false);
        navHandlder("resizeOpener");
      } else {
        setmobileNav(true);
        navHandlder("closer");
      }
    };

    document.addEventListener("click", closeNavbarOnOutsideClick);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("click", closeNavbarOnOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [setmobileNav, menuOn, navHandlder]);

  return (
    <nav
      className={cn(
        "rounded-lg border bg-card/55 text-card-foreground shadow-md sm:shadow-sm p-[.60rem] max-w-[1044px] w-[98%] fixed top-1 sm:top-[1rem] left-[50%] translate-x-[-50%] flex justify-between place-items-center gap-6 z-[1000] backdrop-blur-lg backdrop-saturate-150",
        className
      )}
    >
      <div className="hover:opacity-60 transition-opacity min-[640px]:min-w-fit max-w-fit">
        <Link
          href={NavLinks[0].url}
          className="flex flex-wrap gap-1 place-items-center"
        >
          <Image
            src={shopLogo}
            alt="icon"
            width={35}
            height={35}
            className="rounded-full object-cover"
          ></Image>
          <h1 className="font-clash font-medium max-w-[400px] text-lg overflow-hidden">
            {shopName}
          </h1>
        </Link>
      </div>
      <div
        className={cn(
          styles.buttons_wrap,
          "landing_mobile_nav_wrap flex flex-wrap flex-col sm:flex-row justify-end items-end  sm:justify-end place-items-center sm:gap-2 gap-6 sm:w-full fixed sm:static p-4 pr-5 sm:p-0 pb-16 border sm:border-none"
        )}
      >
        <div className="mobile_nav_logo_wrap flex w-full justify-between px-2 sm:hidden gap-4">
          <div className="hover:opacity-60 transition-opacity max-w-fit">
            <Link
              href={"/"}
              className="flex flex-wrap gap-1 place-items-center"
            >
              <Image
                src={shopLogo}
                alt="icon"
                width={35}
                height={35}
                className="rounded-full object-cover"
              ></Image>
              <h1 className="font-clash max-w-[400px] text-lg overflow-hidden">
                {shopName}
              </h1>
            </Link>
          </div>
          <CustomButton
            variant={"secondary"}
            size={"icon"}
            onClick={() => navHandlder("closer")}
          >
            <ChevronLast />
          </CustomButton>
        </div>

        <div className="left_wrap flex flex-wrap flex-col sm:flex-row justify-center place-items-center w-full sm:w-auto gap-2 pb-20 sm:pb-0">
          {NavLinks?.map((navLink) => (
            <Link
              href={navLink.url}
              className="w-full sm:w-auto"
              key={navLink.url}
            >
              <Button
                variant={"ghost"}
                className={cn(styles.link_button, "justify-start")}
                onClick={() => navHandlder("closer")}
              >
                {navLink.label}
              </Button>
            </Link>
          ))}
        </div>
        <div className="right_wrap flex flex-wrap flex-col sm:flex-row  gap-1 w-full sm:w-auto">
          <CartButton navCloserFunc={navHandlder} styles={styles} amount={0} />
        </div>
      </div>
      {/* mobile hamberg */}
      <Button
        variant={"ghost"}
        size={"icon"}
        className="sm:hidden landing_mobile_nav_opener"
        onClick={() => navHandlder("opener")}
      >
        <AlignRight />
      </Button>
    </nav>
  );
}
