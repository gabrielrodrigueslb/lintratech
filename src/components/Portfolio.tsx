'use client';
import { Button } from '@/src/components/ui/button';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { useLanguage } from '@/src/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image'; // 1. Importe o componente Image

const projects = [
  {
    id: 7,
    title: 'Hub de Links | Bio Connect',
    category: 'WEB APPLICATION',
    tags: ['REDES SOCIAIS', 'MARKETING', 'MOBILE FIRST'],
    image: '/capa-insta.png',
    description: "Uma solução de 'Link na Bio' totalmente personalizável.",
  },

  {
    id: 8,
    title: 'Sistema de Agendamentos | SmartSchedule',
    category: 'WEB APPLICATION',
    tags: ['AGENDAMENTOS', 'SAAS', 'UX/UI', 'ESCALABILIDADE'],
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
    description:
      'Plataforma para agendamentos online de barbearias e salões, com gestão de serviços, horários, profissionais e clientes.',
  },

  {
    id: 9,
    title: 'Sistema de Gestão Escolar | EduManager',
    category: 'WEB SYSTEM',
    tags: ['GESTÃO ESCOLAR', 'ADMINISTRATIVO', 'DASHBOARD', 'AUTOMAÇÃO'],
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    description:
      'Sistema web para gestão escolar com controle de matrículas, alunos, responsáveis, formulários online e painel administrativo.',
  },

  {
    id: 10,
    title: 'Painel Administrativo | ERP Empresarial',
    category: 'ADMIN DASHBOARD',
    tags: ['ERP', 'ADMINISTRATIVO', 'GESTÃO', 'NEGÓCIOS'],
    image:
      'https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1000&q=80',
    description:
      'Painel administrativo (ERP) para controle de produtos, serviços, usuários e operações, com visual moderno e foco em produtividade.',
  },
];




export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-24 bg-background relative">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 reveal">
          <div>
            <h2 className="font-mono text-primary tracking-widest mb-2 text-sm uppercase">
              {t('portfolio.subtitle')}
            </h2>
            <h3 className="font-display font-bold text-4xl md:text-5xl">
              {t('portfolio.title')}
            </h3>
          </div>
          <Link href="/project">
            <Button
              variant="outline"
              className="rounded-none border-primary text-primary hover:bg-primary hover:text-black font-mono gap-2 group"
            >
              {t('portfolio.viewAll')}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-grid">
          {projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <Card className="bg-card border-border overflow-hidden group rounded-none hover:border-primary transition-colors duration-300 cursor-pointer h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />

                  {/* 2. Substituição da tag img por Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill // Preenche o contêiner relativo pai
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw" // Ajuda o Next a escolher o tamanho da imagem
                  />

                  <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-10 w-10 bg-background/80 text-foreground hover:bg-primary hover:text-black border border-border"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-mono text-xs text-primary tracking-wider uppercase">
                        {project.category}
                      </h4>
                      <h3 className="font-display font-bold text-xl md:text-2xl group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="grow flex flex-col justify-between">
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-sm border-border text-xs font-mono text-muted-foreground bg-muted/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
