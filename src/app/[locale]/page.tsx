"use client";
import { Locale, useTranslations } from "next-intl";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ThemeChanger } from "@/components/ui";
import ThreeCanvas from "@/components/three/ThreeCanvas";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  const t = useTranslations("home");

  return (
    <>
      <GoogleAnalytics />
      <ThemeChanger />
      <ThreeCanvas />
    </>
  );
}
