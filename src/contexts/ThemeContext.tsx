"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  
  // Inicialização "Lazy" para evitar erro de hidratação/renderização
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme) {
        return savedTheme;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove classes anteriores para evitar conflitos
    root.classList.remove("light", "dark");

    // Lógica SYSTEM
    if (theme === "system") {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      if (systemIsDark) {
        // Se sistema é Dark, remove .light (volta pro root escuro)
        root.classList.remove("light");
      } else {
        // Se sistema é Light, adiciona .light
        root.classList.add("light");
      }
      return;
    }

    // Lógica MANUAL
    if (theme === "light") {
      root.classList.add("light");
    } else {
      // Se for dark, garante que não tenha a classe light
      root.classList.remove("light");
    }
    
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);