'use client';

import Link from 'next/link';
import Image from 'next/image'; // Importação do componente otimizado
import { Button } from '@/src/components/ui/button';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Code,
} from 'lucide-react';
import Navbar from '@/src/components/Navbar';
import Contact from '@/src/components/Contact';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { Badge } from '@/src/components/ui/badge';

interface Project {
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  challenge?: string;
  solution?: string;
  technologies: string[];
  year: string;
  role: string;
  link?: string;
}

interface ClientProjectWrapperProps {
  project: Project;
}

export default function ClientProjectWrapper({
  project,
}: ClientProjectWrapperProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-24 pb-16 animate-in fade-in duration-500">
        {/* Hero Image Section */}
        <div className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-background to-transparent z-10" />

          {/* SUBSTITUIÇÃO 1: Imagem de Capa com 'fill' e 'priority' */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority // Carrega com prioridade por estar no topo (LCP)
            className="object-cover"
          />

          <div className="absolute bottom-0 left-0 w-full z-20 container pb-12">
            <Link href="/project">
              <Button
                variant="ghost"
                className="mb-6 text-muted-foreground hover:text-primary pl-0 gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> {t('project.back')}
              </Button>
            </Link>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl max-w-4xl mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/50 text-primary bg-primary/5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="container mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="font-mono text-primary tracking-widest mb-4 text-sm uppercase">
                  {t('project.overview')}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </section>

              {project.challenge && (
                <section>
                  <h2 className="font-mono text-primary tracking-widest mb-4 text-sm uppercase">
                    {t('project.challenge')}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </section>
              )}

              {project.solution && (
                <section>
                  <h2 className="font-mono text-primary tracking-widest mb-4 text-sm uppercase">
                    {t('project.solution')}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </section>
              )}

              <div className="pt-8 relative aspect-video">
                {/* SUBSTITUIÇÃO 2: Imagem de Detalhe com 'fill' */}
                <Image
                  src={project.image}
                  alt="Project Detail"
                  fill
                  className="rounded-sm border border-border grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-card border border-border p-6 rounded-sm">
                <h3 className="font-display font-bold text-xl mb-6">
                  {t('project.overview')}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase">
                        Year
                      </p>
                      <p className="font-medium">{project.year}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Layers className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase">
                        Role
                      </p>
                      <p className="font-medium">{project.role}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Code className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase">
                        {t('project.technologies')}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs border border-border px-2 py-1 rounded-sm bg-background"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold">
                        <ExternalLink className="w-4 h-4 mr-2" />{' '}
                        {t('project.visit')}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      className="w-full bg-primary text-black hover:bg-primary/90 font-bold"
                      disabled
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />{' '}
                      {t('project.visit')}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full border-border hover:bg-muted"
                  >
                    <Github className="w-4 h-4 mr-2" /> Source Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Contact />
    </div>
  );
}
