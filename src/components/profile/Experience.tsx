import { useTranslations } from "next-intl";

export const Experience = () => {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="self-center py-4 text-3xl font-bold">
        {t("experience.title")}
      </div>
    </div>
  );
};
