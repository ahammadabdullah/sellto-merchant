"use client";

import { useState } from "react";

// components
import { Button } from "@/components/ui/button";

// multi lang
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import lang_globals_en from "@/lang/en/globals.json";
import lang_globals_sb from "@/lang/sb/globals.json";
import { useTranslation } from "react-i18next";
i18next.init({
  interpolation: { escapeValue: true },
  lng: "en",
  resources: {
    en: {
      globals: lang_globals_en,
    },
    sb: {
      globals: lang_globals_sb,
    },
  },
});
// icons
import uk from "@/assets/lang/uk.png";
import sb from "@/assets/lang/sb.png";

export default function MultiLangWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
