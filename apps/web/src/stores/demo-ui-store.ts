import { create } from "zustand";

type ContactDemoState = {
  lastContactSubmitAt: number | null;
  /** Clears the “last success” timestamp (e.g. for a future reset control). */
  setLastSubmitAt: (value: number | null) => void;
  /** Call after a successful submit; timestamp is taken inside the store (outside React render). */
  recordContactSuccess: () => void;
};

/** Minimal client store to demonstrate Zustand alongside the contact form (Phase 2). */
export const useContactDemoStore = create<ContactDemoState>((set) => ({
  lastContactSubmitAt: null,
  setLastSubmitAt: (value) => set({ lastContactSubmitAt: value }),
  recordContactSuccess: () =>
    set({
      lastContactSubmitAt: Date.now(),
    }),
}));
