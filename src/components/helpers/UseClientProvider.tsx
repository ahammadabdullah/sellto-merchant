"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
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
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </QueryClientProvider>
  );
}
