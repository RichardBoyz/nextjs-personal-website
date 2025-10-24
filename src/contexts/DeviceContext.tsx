import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type DeviceContextType = {
  isTouchDevice: boolean;
};

export const DeviceContext = createContext<DeviceContextType>({
  isTouchDevice: false,
});

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 判斷觸控
    const checkTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();

    // 若使用者觸發觸控事件，立即標記為觸控裝置
    const handleTouch = () => setIsTouchDevice(true);

    window.addEventListener("touchstart", handleTouch, { once: true });

    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <DeviceContext.Provider value={{ isTouchDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

// Hook 方便在 component 內使用
export const useDevice = () => useContext(DeviceContext);
