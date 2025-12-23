"use client";
import { Button } from "@/src/components/ui/button";
import { Mail, MapPin, Calendar/* , Download  */} from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Elementos decorativos de fundo da seção */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-primary/20 rounded-full -translate-x-1/2 translate-y-1/2 -z-10" />
      
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Lado da Imagem / Visual */}
          <div className="w-full lg:w-1/2 relative reveal">
            {/* Contêiner Principal da Imagem - GARANTIR Z-10 */}
            <div className="relative z-10 border border-border bg-card p-2">
              <Image 
                src="/banner-lintra.png" 
                alt="Lintra Tech Team Banner" 
                width={800} 
                height={600} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
              
              {/* Card Flutuante de Status */}
              <div className="absolute -bottom-6 -right-6 bg-background border border-primary p-4 shadow-[0_0_20px_rgba(17,138,240,0.2)] max-w-50 hidden md:block z-20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="font-mono text-xs font-bold">ONLINE</span>
                </div>
                <p className="text-xs text-muted-foreground">{t('contact.available')}</p>
              </div>
            </div>
            
            {/* Bordas Decorativas - Aumentamos o recuo e garantimos Z inferior */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 z-0" />
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-border z-2" />
          </div>
          
          {/* Lado do Conteúdo */}
          <div className="w-full lg:w-1/2 reveal">
            <h2 className="font-mono text-primary tracking-widest mb-2 text-sm uppercase">{t('about.subtitle')}</h2>
            <h3 className="font-display font-bold text-4xl md:text-5xl mb-8">
              {t('about.title.1')} <br />
              {t('about.title.2')} <span className="text-primary">{t('about.title.3')}</span>.
            </h3>
            
            <div className="space-y-6 text-muted-foreground text-lg font-light">
              <p>Somos uma <b className="font-bold">Empresa de Tecnologia </b>focada em transformar ideias complexas em soluções digitais elegantes. Nossa jornada começou com a visão de que o software corporativo não precisa ser chato ou difícil de usar.</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary w-5 h-5" />
                <span className="text-sm font-mono">{t('about.location')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-primary w-5 h-5" />
                <span className="text-sm font-mono">2+ {t('about.exp')}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary text-black hover:bg-primary/90 rounded-none font-mono font-bold px-8">
                <Mail className="mr-2 w-4 h-4" />
                <a target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=5531984056082&text=Ol%C3%A1%21%20Vim%20pelo%20Instagram%20e%20gostaria%20de%20conversar%20sobre%20o%20desenvolvimento%20de%20uma%20solu%C3%A7%C3%A3o%20digital%20para%20o%20meu%20neg%C3%B3cio.%20Podemos%20falar%3F">
                  {t('about.cta')}
                </a>
              </Button>
              {/* <Button variant="outline" className="border-border hover:bg-muted rounded-none font-mono px-8">
                <Download className="mr-2 w-4 h-4" /> {t('about.download')}
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}