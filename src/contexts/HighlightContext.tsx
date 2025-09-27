import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { Object3D } from "three";

type HighlightContextType = {
  register: (obj: Object3D) => void;
  unregister: (obj: Object3D) => void;
  isHighlighted: (obj: Object3D | null) => boolean;
  current: Object3D | null;
  setCurrent: (obj: Object3D | null) => void;
  targets: Object3D[];
};

export const HighlightContext = createContext<HighlightContextType>({
  register: () => {},
  unregister: () => {},
  isHighlighted: () => false,
  current: null,
  setCurrent: () => {},
  targets: [],
});

export const HighlightProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState<Object3D | null>(null);
  const targetsRef = useRef<Object3D[]>([]);

  const register = useCallback((obj: Object3D) => {
    if (!targetsRef.current.includes(obj)) {
      targetsRef.current.push(obj);
    }
  }, []);

  const unregister = useCallback((obj: Object3D) => {
    targetsRef.current = targetsRef.current.filter((o) => o !== obj);
  }, []);

  const isHighlighted = useCallback(
    (obj: Object3D | null) => obj?.uuid === current?.uuid,
    [current]
  );

  return (
    <HighlightContext.Provider
      value={{
        register,
        unregister,
        isHighlighted,
        current,
        setCurrent,
        targets: targetsRef.current,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};

// Optional Hook
export const useHighlight = () => useContext(HighlightContext);
