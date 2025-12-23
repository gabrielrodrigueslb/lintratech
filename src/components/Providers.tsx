"use client"; // Necessário pois usa Context

import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { Toaster } from "@/src/components/ui/sonner";
import Preloader, { ScrollToTop } from "@/src/components/Preloader";
import ErrorBoundary from "@/src/components/ErrorBoundary";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LanguageProvider>
          <TooltipProvider>
            <Preloader />
            <ScrollToTop />
            <Toaster />
            {children}
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}