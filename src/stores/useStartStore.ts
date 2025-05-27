import { create } from "zustand";

type StartState = {
  started: boolean;
  start: () => void;
  end: () => void;
};

export const useStartStore = create<StartState>((set) => ({
  started: false,
  start: () => set({ started: true }),
  end: () => set({ started: false }),
}));
