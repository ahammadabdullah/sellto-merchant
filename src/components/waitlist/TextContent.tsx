import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export interface classProps {
  className?: string;
  t: any;
}
export default function Component({ className, t }: classProps) {
  return (
    <>
      <h1 className="sm:text-6xl text-5xl font-clash font-medium">
        <span className="text-primary2">{t("header.first_t")}</span>
        <br />
        {t("header.second_t")}
        <span className="text-primary2">.</span>
      </h1>
      {t("header.p")}
    </>
  );
}
