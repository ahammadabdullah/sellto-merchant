"use client";

// multi lang
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import lang_globals_en from "@/lang/en/globals.json";
import lang_globals_sb from "@/lang/sb/globals.json";
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

import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
