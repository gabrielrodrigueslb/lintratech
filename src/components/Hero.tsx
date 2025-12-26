"use client";
import { Button } from "@/src/components/ui/button";
import { ArrowRight} from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

export default function Hero() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Animated Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-primary uppercase">
              {t('hero.badge')}
            </span>
          </div>
          
          <div className="relative mb-12">
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-[82px] leading-[1.1] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {t('hero.title.1')} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
                {t('hero.title.2')}
              </span>
            </h1>
          </div>
          
          <p className="text-muted-foreground max-w-xl text-lg md:text-lg mb-12 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-7 text-base font-mono tracking-wider group transition-all duration-500 shadow-[0_0_30px_rgba(17,138,240,0.3)] hover:shadow-[0_0_50px_rgba(17,138,240,0.5)]"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta.services')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-border hover:bg-muted rounded-none px-10 py-7 text-base font-mono tracking-wider group transition-all duration-500"
              onClick={() => setIsModalOpen(true)}
            >
              {t('hero.cta.contact')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:-rotate-45 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Decorative Side Text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="rotate-90 origin-left text-[10px] font-mono tracking-[0.5em] text-muted-foreground/30 uppercase whitespace-nowrap">
          Innovation • Technology • Design • Excellence
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-bounce">
        <div className="w-px h-16 bg-linear-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
