'use client';
import { Button } from '@/src/components/ui/button';
import { ArrowRight, Palette, Layout, Smartphone } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import Link from 'next/link';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Palette className="w-10 h-10 text-primary" />,
      title: t('services.card.1.title'),
      description: t('services.card.1.desc'),
      tags: ['BRANDING', 'VISUAL IDENTITY', 'DIGITAL ILLUSTRATION'],
    },
    {
      icon: <Layout className="w-10 h-10 text-primary" />,
      title: t('services.card.2.title'),
      description: t('services.card.2.desc'),
      tags: ['SOFTWARE', 'LANDING PAGES', 'ECOMMERCE', 'UI/UX'],
    },
    {
      icon: <Smartphone className="w-10 h-10 text-primary" />,
      title: t('services.card.3.title'),
      description: t('services.card.3.desc'),
      tags: ['MOBILE APP DESIGN', 'HYBRID', 'UI/UX DEVELOPMENT'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-card/30 relative">
      <div className="container">
        <div className="mb-16 max-w-3xl reveal items-center">
          <h2 className="font-mono text-primary tracking-widest mb-2 text-sm uppercase">
            {t('services.subtitle')}
          </h2>
          <h3 className="font-display font-bold text-4xl md:text-5xl mb-6">
            {t('services.title.1')} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
              {t('services.title.2')}
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background border border-border p-8 hover:border-primary transition-all duration-300 group flex flex-col h-full"
            >
              <div className="mb-6 p-4 bg-primary/5 w-fit rounded-sm group-hover:bg-primary/10 transition-colors">
                {service.icon}
              </div>

              <h4 className="font-display font-bold text-2xl mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h4>

              <p className="text-muted-foreground mb-8 grow">
                {service.description}
              </p>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono border border-border px-2 py-1 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href="/project">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary font-mono text-sm group-hover:translate-x-2 transition-transform"
                  >
                    {t('services.viewProjects')}{' '}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
