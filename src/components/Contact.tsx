"use client";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Mail, Instagram } from "lucide-react"; // Removido 'Linkedin'
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { useTheme } from "@/src/contexts/ThemeContext";
import Image from "next/image"; // Importado para otimização

export default function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme(); // Removido 'setTheme' pois não era usado
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer id="contact" className="bg-background pt-24 pb-8 border-t border-border relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="font-mono text-primary tracking-widest mb-4 text-sm uppercase">{t('contact.subtitle')}</h2>
          <h3 className="font-display font-bold text-5xl md:text-7xl mb-8 max-w-4xl">
            {t('contact.title.1')} <br />
            <span className="text-foreground">{t('contact.title.2')}</span> {t('contact.title.3')}
          </h3>
          
          <p className="text-muted-foreground max-w-2xl text-lg mb-12">
            {t('contact.desc')}
          </p>
          
          <Button 
            size="lg" 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-black hover:bg-primary/90 rounded-none px-10 py-8 text-lg font-mono font-bold tracking-wider group shadow-[0_0_20px_rgba(17,138,240,0.3)] hover:shadow-[0_0_40px_rgba(17,138,240,0.5)] transition-all duration-300"
          >
            {t('contact.cta')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-border pt-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-sm relative"> {/* Adicionado 'relative' para o Image fill */}
                {/* Substituído <img> por <Image /> com otimização */}
                {theme === 'dark' ? (
                  <Image src="/logo_dark.png" alt="Logo lintra tech" width={40} height={40} />
                ) : (
                  <Image src="/logo_light.png" alt="Logo lintra tech" width={40} height={40} />
                )}
              </div>
              <span className="font-display font-bold text-xl">Lintra Tech</span>
            </div>
            <p className="text-muted-foreground max-w-xs mb-6">
              {t('hero.title.1')} {t('hero.title.2')}
            </p>
            <div className="flex gap-4">
              <a href="https://api.whatsapp.com/send?phone=5531984056082&text=Ol%C3%A1%21%20Vim%20pelo%20site%20gostaria%20de%20conversar%20sobre%20o%20desenvolvimento%20de%20uma%20solu%C3%A7%C3%A3o%20digital%20para%20o%20meu%20neg%C3%B3cio.%20Podemos%20falar%3F" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors bg-card">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/lintratech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors bg-card">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-foreground font-bold mb-6">{t('contact.sitemap')}</h4>
            <ul className="space-y-3 text-muted-foreground font-mono text-sm">
              <li><a href="#home" className="hover:text-primary transition-colors">{t('nav.home')}</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">{t('nav.portfolio')}</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{t('nav.about')}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t('nav.services')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-foreground font-bold mb-6">{t('contact.info')}</h4>
            <ul className="space-y-3 text-muted-foreground font-mono text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:lintratechnologies@gmail.com" className="hover:text-primary transition-colors">lintratechnologies@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{t('contact.available')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <p>© 2025 Lintra Technologies. {t('contact.rights')}</p>
        </div>
      </div>
    </footer>
  );
}