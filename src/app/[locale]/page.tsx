"use client";
import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  const t = useTranslations("home");

  return (
    <>
      <GoogleAnalytics />
      <p className="max-w-[590px]">{t("title")}</p>
    </>
  );
}
