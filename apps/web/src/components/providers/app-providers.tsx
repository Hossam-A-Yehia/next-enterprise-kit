"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider } from "next-themes";
import { useState, type FC, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

/** Resolves a React 19 + `next-themes` prop typing mismatch (`children` on `ThemeProvider`). */
const RootThemeProvider = ThemeProvider as FC<
  ThemeProviderProps & { children: ReactNode }
>;

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <RootThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors closeButton position="top-center" />
      </QueryClientProvider>
    </RootThemeProvider>
  );
}
