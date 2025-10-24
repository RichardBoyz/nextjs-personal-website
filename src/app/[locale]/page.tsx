"use client";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import { ThemeChanger } from "@/components/ui";
import { LangSwitcher } from "@/components/ui/LangSwitcher";
import { DeviceProvider } from "@/contexts/DeviceContext";
import { Locale } from "next-intl";
import { GoogleAnalytics } from "nextjs-google-analytics";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  return (
    <>
      <DeviceProvider>
        <GoogleAnalytics />
        <ThemeChanger className="bg-black" moonIconClassName="text-white" />
        <LangSwitcher />
        <ThreeCanvas />
      </DeviceProvider>
    </>
  );
}
