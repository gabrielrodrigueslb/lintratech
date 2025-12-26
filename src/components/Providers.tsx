/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // Necessário pois usa Context

import { ThemeProvider } from '@/src/contexts/ThemeContext';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { Toaster } from '@/src/components/ui/sonner';
import Preloader, { ScrollToTop } from '@/src/components/Preloader';
import ErrorBoundary from '@/src/components/ErrorBoundary';
import { SiteDataProvider } from '../contexts/siteDataContext';

export function Providers({ children, siteData }: { children: React.ReactNode, siteData: any }) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LanguageProvider>
          <SiteDataProvider data={siteData}>
            <TooltipProvider>
              <Preloader />
              <ScrollToTop />
              <Toaster />
              {children}
            </TooltipProvider>
          </SiteDataProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
