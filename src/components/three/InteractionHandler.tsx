import useInteractiveRaycast from "@/hooks/useInteractiveRaycast";
import { useInteractionStore } from "@/stores/useInteractionStore";
import { useEffect } from "react";

export const InteractionHandler = () => {
  const hitObject: any = useInteractiveRaycast(["laptop-screen", "laptop"]);
  const setHitOjbect = useInteractionStore((s) => s.setHitObject);
  useEffect(() => {
    if (hitObject) {
      setHitOjbect(hitObject);
    } else {
      setHitOjbect(null);
    }
  }, [hitObject]);
  return null;
};
