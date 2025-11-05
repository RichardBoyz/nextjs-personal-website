import { useDevice } from "@/contexts/DeviceContext";
import useMobile from "@/hooks/useMobile";
import { useInteractionStore } from "@/stores/useInteractionStore";
import { useStartStore } from "@/stores/useStartStore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const InteractionUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hitObject = useInteractionStore((s) => s.hitObject);
  const t = useTranslations("common");

  const isMobile = useMobile();
  const { isTouchDevice } = useDevice();
  const { end } = useStartStore();

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      end();
    }
  };

  useEffect(() => {
    if (!isMobile || !isTouchDevice) {
      const handleDocClick = () => {
        if (hitObject) {
          setIsOpen(!isOpen);
          if (!isOpen) {
            end();
          }
        }
      };
      document.addEventListener("click", handleDocClick);
      return () => {
        document.removeEventListener("click", handleDocClick);
      };
    }
  }, [isMobile, isTouchDevice, hitObject]);

  if (!hitObject) return null;

  return (
    <>
      <div
        onClick={handleClick}
        className="absolute left-1/2 top-1/3 -translate-x-1/2 rounded bg-black px-4 py-2 text-white"
      >
        <div className="">{t("clickme")}</div>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute flex h-screen w-screen items-center justify-center bg-black/50"
        >
          <div className="text-2xl font-bold text-white">nice</div>
        </div>
      )}
    </>
  );
};
