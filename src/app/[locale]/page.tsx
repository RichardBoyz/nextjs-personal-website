"use client";
import { Locale, useTranslations } from "next-intl";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ThemeChanger } from "@/components/ui";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  const t = useTranslations("home");

  return (
    <>
      <GoogleAnalytics />
      <ThemeChanger />
      <p className="max-w-[590px]">{t("title")}</p>
    </>
  );
}
