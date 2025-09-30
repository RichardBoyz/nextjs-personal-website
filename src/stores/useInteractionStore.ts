import { create } from "zustand";

type InteractionState = {
  hitObject: string | null;
  setHitObject: (name: string | null) => void;
};

export const useInteractionStore = create<InteractionState>((set) => ({
  hitObject: null,
  setHitObject: (name) => set({ hitObject: name }),
}));
