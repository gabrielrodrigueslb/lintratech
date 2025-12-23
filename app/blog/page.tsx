"use client";

import Link from "next/link";
import Image from "next/image"; // 1. Importação necessária
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

// Mock data (Permanecem os mesmos)
const blogPosts = [
  {
    id: "future-of-fintech",
    title: "O Futuro da Fintech: Personalização Impulsionada por IA",
    excerpt: "Como a inteligência artificial está moldando a forma como interagimos com nossas finanças, desde orçamentos preditivos até estratégias de investimento automatizadas.",
    date: "12 de Out, 2025",
    author: "Equipe de Desenvolvimento",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "5 min de leitura"
  },
  {
    id: "tendencias-ux-ui-2025",
    title: "Tendências de UX/UI que vão Definir o Mercado em 2025",
    excerpt: "Do Minimalismo Espacial às interfaces geradas por IA em tempo real. Descubra o que mudará na forma como os utilizadores interagem com produtos digitais.",
    date: "15 de Dez, 2025",
    author: "Equipe de Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    readTime: "6 min de leitura"
  },
  {
    id: "seguranca-em-aplicacoes-modernas",
    title: "Segurança em Primeiro Lugar: Protegendo Aplicações Next.js",
    excerpt: "Como implementar autenticação robusta e proteger os dados dos seus utilizadores contra vulnerabilidades comuns no desenvolvimento web moderno.",
    date: "05 de Dez, 2025",
    author: "Equipe de Segurança Digital",
    category: "Desenvolvimento",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "10 min de leitura"
  },
  {
    id: "design-systems-2025",
    title: "Por que sua empresa precisa de um Design System em 2025",
    excerpt: "Escalar a consistência de design entre produtos não é apenas sobre estética — é sobre velocidade de engenharia e confiança na marca.",
    date: "15 de Set, 2025",
    author: "Equipe de Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "6 min de leitura"
  },
  {
    id: "mobile-first-architecture",
    title: "Arquitetura Mobile-First para Aplicativos Corporativos",
    excerpt: "Estratégias para construir aplicações empresariais robustas que priorizam a experiência móvel sem sacrificar a funcionalidade de desktop.",
    date: "30 de Ago, 2025",
    author: "Líder Técnico",
    category: "Arquitetura",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "7 min de leitura"
  }
];

export default function BlogList() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-24 animate-in fade-in duration-500">
        <div className="container">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="font-mono text-primary tracking-widest mb-4 text-sm uppercase">{t('blog.subtitle')}</h2>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">{t('blog.title')}</h1>
            <p className="text-xl text-muted-foreground">
              Análises, reflexões e tendências da nossa equipe de especialistas em tecnologia, design e inovação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="bg-card border-border overflow-hidden group hover:border-primary transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                    
                    {/* 2. Substituição da tag <img> pelo componente <Image /> */}
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill // Preenche o contêiner relativo pai (aspect-16/10)
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground border-border hover:bg-background">
                      {post.category}
                    </Badge>
                  </div>
                  
                  {/* ... Restante do CardHeader, Content e Footer */}
                  <CardHeader className="pb-2 pt-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="border-t border-border pt-4 mt-auto">
                    <Button variant="link" className="p-0 h-auto text-primary font-mono text-sm group-hover:translate-x-2 transition-transform">
                      {t('blog.readMore')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Contact />
    </div>
  );
}