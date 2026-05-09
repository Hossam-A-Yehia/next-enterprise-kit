"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True after client hydration; avoids `useEffect` + `setState` for theme/UI that must not SSR. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
