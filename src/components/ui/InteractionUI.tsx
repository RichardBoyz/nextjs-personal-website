import useMobile from "@/hooks/useMobile";
import { useInteractionStore } from "@/stores/useInteractionStore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const InteractionUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hitObject = useInteractionStore((s) => s.hitObject);
  const t = useTranslations("common");

  const isMobile = useMobile();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      const handleDocClick = () => {
        if (hitObject) {
          setIsOpen(!isOpen);
        }
      };
      document.addEventListener("click", handleDocClick);
      return () => {
        document.removeEventListener("click", handleDocClick);
      };
    }
  }, [isMobile, hitObject]);

  if (!hitObject) return null;

  return (
    <>
      <div
        onClick={handleClick}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded"
      >
        <div className="">{t("clickme")}</div>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute h-screen w-screen bg-black/50 flex items-center justify-center"
        >
          <div className="text-2xl text-white font-bold">nice</div>
        </div>
      )}
    </>
  );
};
