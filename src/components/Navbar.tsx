"use client";
import { useState, useEffect } from "react";
// Removido o Link não usado
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Moon, Sun/* , Globe */ } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import Image from "next/image"; // Importação do Image

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const { t, /* language, setLanguage */ } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  /* const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt'); */
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
            {/* CORREÇÃO: Usando Image do Next.js */}
            {theme === 'dark' ? (
              <Image src="/logo_dark.png" alt="Logo" width={80} height={40} className="object-contain" />
            ) : (
              <Image src="/logo_light.png" alt="Logo" width={80} height={40} className="object-contain" />
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
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          {/* <Button variant="ghost" size="sm" className="gap-2 font-mono" onClick={toggleLanguage}>
            <Globe className="w-4 h-4" />
            {language.toUpperCase()}
          </Button> */}
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
               {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            {/* <Button variant="ghost" size="sm" className="gap-2 font-mono" onClick={toggleLanguage}>
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </Button> */}
          </div>
        </div>
      )}
    </nav>
  );
}