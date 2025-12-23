"use client";

import { useState } from "react";
import Link from "next/link"; 
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search, MessageSquare } from "lucide-react"; // ...outros imports
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
/* import { useLanguage } from "@/src/contexts/LanguageContext"; */
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import Image from "next/image";

const categories = ["ALL", "WEB APPLICATION", "WEB SYSTEM", "ERP"];

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
    category: 'WEB SYSTEM',
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
    category: 'ERP',
    tags: ['ERP', 'ADMINISTRATIVO', 'GESTÃO', 'NEGÓCIOS'],
    image:
      'https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1000&q=80',
    description:
      'Painel administrativo (ERP) para controle de produtos, serviços, usuários e operações, com visual moderno e foco em produtividade.',
  },
];

export default function Catalog() {
  /* const { t } = useLanguage(); */
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "ALL" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-24 animate-in fade-in duration-500">
        <div className="container">
          <div className="mb-16">
            <h2 className="font-mono text-primary tracking-widest mb-4 text-sm uppercase">Marketplace</h2>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-8">Nossas <span className="text-primary italic">Criações</span></h1>
            
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button 
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat)}
                    className="rounded-none font-mono text-xs tracking-widest"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-10 rounded-none border-border focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-card border-border overflow-hidden group rounded-none hover:border-primary transition-all duration-500 flex flex-col">
                <div className="relative aspect-4/3 overflow-hidden">
                <Link href={`/project/${project.id}`}>
                
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill // Usa o container pai (relative aspect-4/3) como referência
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-end p-6">
                    {/* <Link href={`/project/${project.id}`}>
                      <Button className="w-full bg-primary text-black hover:bg-primary/90 rounded-none font-bold mb-2">
                        VER DETALHES
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10 rounded-none"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      SOLICITAR ORÇAMENTO
                    </Button> */}
                  </div>
                  </Link>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-mono text-[10px] text-primary tracking-widest uppercase">{project.category}</h4>
                      <Link href={`/project/${project.id}`}>
                      <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">{project.title}</h3>
                      </Link>
                      
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="grow">
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-none border-border text-[10px] font-mono text-muted-foreground bg-muted/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Sob Consulta</span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:bg-transparent hover:text-primary/80 gap-2 font-mono text-xs" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    <MessageSquare className="w-3 h-3" /> CONTATO
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-muted-foreground font-mono">Nenhum projeto encontrado para sua busca.</p>
              <Button variant="link" onClick={() => {setActiveCategory("ALL"); setSearchQuery("");}} className="text-primary">
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Contact />
    </div>
  );
}
