/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estado para armazenar a preferência do SISTEMA OPERACIONAL
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();

  // Efeito de Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efeito de Detecção do Sistema e Montagem
  useEffect(() => {
    // 1. Resolver o estado de montagem de forma assíncrona para satisfazer o ESLint
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // 2. Lógica de detecção do tema do sistema
    if (typeof window !== 'undefined') {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      
      // Define valor inicial

      setSystemTheme(media.matches ? 'dark' : 'light');

      // Ouve mudanças (ex: usuário mudou config do Windows)
      const listener = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };

      media.addEventListener('change', listener);
      
      return () => {
        media.removeEventListener('change', listener);
        clearTimeout(timer);
      };
    }
    
    return () => clearTimeout(timer);
  }, []);

  // CÁLCULO DO TEMA RESOLVIDO
  // Se não montou (SSR), força 'dark' para evitar erro de hidratação.
  // Se montou e o tema é 'system', usa o que o Windows/Mac mandou.
  // Senão, usa a escolha manual do usuário.
  const resolvedTheme = !mounted ? 'dark' : (theme === 'system' ? systemTheme : theme);

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), href: "/#home", action: () => scrollToSection('home') },
    { name: t('nav.portfolio'), href: "/#portfolio", action: () => scrollToSection('portfolio') },
    { name: t('nav.about'), href: "/#about", action: () => scrollToSection('about') },
    { name: t('nav.services'), href: "/#services", action: () => scrollToSection('services') },
    { name: t('nav.blog'), href: "/blog", action: () => { router.push('/blog'); setIsMobileMenuOpen(false); } },
    { name: t('nav.contact'), href: "/#contact", action: () => scrollToSection('contact') },
  ];

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <div className="relative w-20 h-10 flex items-center justify-center border-primary rounded-sm">
            
            {/* Exibe o logo baseado no tema resolvido */}
            {resolvedTheme === 'dark' ? (
              <Image src="/logo_dark.png" alt="Logo" width={80} height={40} className="object-contain" priority />
            ) : (
              <Image src="/logo_light.png" alt="Logo" width={80} height={40} className="object-contain" priority />
            )}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.action}
              className="text-sm font-mono tracking-widest hover:text-primary transition-colors relative group uppercase bg-transparent border-none cursor-pointer"
            >
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3">{">"}</span>
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
            aria-label="Alternar tema"
          >
            {/* Exibe o ícone baseado no tema resolvido */}
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.action}
              className="text-left py-2 px-4 hover:bg-primary/10 hover:text-primary font-mono transition-colors border-l-2 border-transparent hover:border-primary uppercase"
            >
              {link.name}
            </button>
          ))}
          <div className="flex items-center gap-4 px-4 pt-4 border-t border-border">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
               {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}