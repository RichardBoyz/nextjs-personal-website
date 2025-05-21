"use client";
import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ThemeChanger } from "@/components/ui";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: Locale }>;
  children: React.ReactNode;
};

export default function IndexPage({ params, children }: Props) {
  const t = useTranslations("home");

  return (
    <>
      <GoogleAnalytics />
      <ThemeChanger />
      <p className="max-w-[590px]">{t("title")}</p>
      <Link href="/about">123</Link>
      <div className="h-[300px] w-[300px] bg-amber-300">{children}</div>
      <div className="h-svh bg-blue-500">132123</div>
    </>
  );
}
