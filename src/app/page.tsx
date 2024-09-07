"use client";

// libraries
import gsap from "gsap";
import Image from "next/image";

// functions
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import { Button } from "@/components/ui/button";
import TextContent from "@/components/waitlist/TextContent";
import Form from "@/components/waitlist/form";
import Circles from "@/components/waitlist/Ciecles";

import uk from "@/assets/lang/uk.png";
import sb from "@/assets/lang/sb.png";
import NotionMagicLinkEmail from "@/emails/notion-magic-link";

export default function Home() {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.to(".main_hero_text", {
      y: 0,
      opacity: 1,
      duration: 0.5,
    });
  }, {});

  // multi lang button handling
  const [t, i18n] = useTranslation("globals");
  const [lang, setLang] = useState("en");
  const language = lang === "en" ? "sb" : "en";
  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <main className="h-[100dvh] grid place-items-center overflow-hidden relative">
      <Button
        className="fixed right-0 top-0 m-4 text-sm"
        onClick={() => handleChange(language)}
      >
        <Image
          className="max-w-5"
          src={lang === "en" ? sb : uk}
          alt="language"
        />{" "}
        <span className="ml-1">{lang === "en" ? "Serbian" : "English"}</span>
      </Button>
      <section className="container text-center flex flex-col gap-4 items-center place-content-center mt-10 main_hero_text opacity-0 translate-y-[70%]">
        <div className="img_wrap mb-[-3rem] relative z-[-3]">
          <Image src="/hero_img.png" width={520} height={300} alt="hero" />
          <div className=" bg_primary_radial_gradient w-[700px] aspect-square rounded-full absolute top-[-300%] sm:top-[-130%] left-[50%] translate-x-[-50%] pointer-events-none z-[-3] animate-pulse"></div>
          {/* <div className="hero_overlay w-[700px] h-[230px]  bg-gradient-to-b from-background/0 to-background absolute bottom-[-100%] left-[50%] translate-x-[-50%]  z-[-2]"></div> */}
        </div>
        <TextContent t={t} />
        <Form t={t} className="mt-14" />
        <p className="max-w-[580px] opacity-65">{t("input.sub")}</p>
      </section>
      <div className="circel bg_primary_radial_gradient w-[1600px] aspect-square rounded-full absolute top-[6rem] pointer-events-none z-[-1] opacity-85"></div>
      <Circles />
    </main>
  );
}
