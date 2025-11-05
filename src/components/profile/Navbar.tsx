"use client";
import { I18N } from "@/constants/i18n";
import { Link as OriginLink } from "@/i18n/navigation";
import { Bars2Icon } from "@heroicons/react/24/outline";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { MouseEvent, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { ThemeChanger } from "../ui";
import { Modal } from "../ui/Modal";

const Link = ({
  href,
  locale,
  label,
}: {
  href: string;
  locale: string;
  label: string;
}) => {
  return (
    <OriginLink
      className="w-full rounded-2xl py-4 text-center text-white transition-colors duration-300 hover:bg-black"
      href={href}
      locale={locale}
    >
      {label}
    </OriginLink>
  );
};

export const NavBar = () => {
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations();

  const handleClickLang = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    setIsOpenLang(true);
  };
  return (
    <motion.div
      className="fixed z-10 overflow-hidden rounded-full bg-transparent p-1 outline outline-1 outline-black backdrop-blur-md dark:outline-white"
      initial={{ right: "-20px", height: "48px" }}
      animate={{
        right: "16px",
        top: "16px",
        height: isExpanded ? "128px" : "48px",
      }}
      whileHover={{ height: "128px" }}
      transition={{ duration: 0.2 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="icon-container hover:bg-transparent">
        <Bars2Icon className="icon-button-basic" />
      </div>

      <ThemeChanger
        className="relative rounded-full bg-transparent hover:bg-transparent dark:hover:bg-transparent"
        moonIconClassName="group-hover:text-black"
      />
      <div className="flex size-10 cursor-pointer select-none items-center justify-center">
        <GrLanguage onClick={handleClickLang} />
      </div>
      <Modal open={isOpenLang} onClose={() => setIsOpenLang(false)}>
        <div className="flex h-1/2 w-1/2 flex-col items-center justify-center">
          {I18N.map((e) => (
            <Link
              key={e.value}
              href="/profile"
              locale={e.i18n}
              label={t(`i18n.${e.i18n}`)}
            />
          ))}
        </div>
      </Modal>
    </motion.div>
  );
};
