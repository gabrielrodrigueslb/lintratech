"use client"; // <--- OBRIGATÓRIO PARA USAR HOOKS (useState)

import { useState } from "react";
// Troque o Link do wouter pelo do Next
import Link from "next/link"; 
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search, MessageSquare } from "lucide-react"; // ...outros imports
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

const categories = ["ALL", "WEB APPLICATION", "FINTECH", "REACT NEXT.JS", "REACT NATIVE"];

const projects = [
  {
    id: 1,
    title: "Digital Products Platform | Get Now",
    category: "WEB APPLICATION",
    tags: ["FINTECH", "PROJECT MANAGEMENT", "ATTENTION TO DETAIL"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "A comprehensive platform for managing digital products with integrated payment processing and analytics dashboard."
  },
  {
    id: 2,
    title: "Payment Gateway & Banking App | Get Pay",
    category: "FINTECH",
    tags: ["BANKING", "PROJECT MANAGEMENT", "PROBLEM SOLVING"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Secure payment gateway solution with real-time transaction monitoring and fraud detection systems."
  },
  {
    id: 3,
    title: "Fintech Platform | SeerCard",
    category: "REACT NEXT.JS",
    tags: ["TEAM COLLABORATION", "PROBLEM SOLVING", "UI/UX"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Modern credit card management interface allowing users to track spending, set limits, and analyze financial habits."
  },
  {
    id: 4,
    title: "Banking App | Ártico Capital",
    category: "REACT NATIVE",
    tags: ["UX/UI", "ATTENTION TO DETAIL", "ANALYTICAL THINKING"],
    image: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Mobile banking application focused on investment portfolio management and crypto asset tracking."
  },
  {
    id: 5,
    title: "E-commerce Dashboard",
    category: "WEB APPLICATION",
    tags: ["DASHBOARD", "ANALYTICS", "SAAS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Powerful admin panel for e-commerce owners to manage inventory, orders, and customer data."
  },
  {
    id: 6,
    title: "Health & Fitness Tracker",
    category: "REACT NATIVE",
    tags: ["HEALTH", "FITNESS", "MOBILE"],
    image: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Mobile app for tracking workouts, nutrition, and sleep patterns with social sharing features."
  }, 
  {
    id: 7,
    title: "Hub de Links | Bio Connect",
    category: "WEB APPLICATION",
    tags: ["REDES SOCIAIS", "MARKETING", "MOBILE FIRST"],
    image: "/capa-insta.png",
    description: "Uma solução de 'Link na Bio' totalmente personalizável que centraliza sua presença digital, com métricas de cliques integradas e temas adaptáveis à identidade da marca."
  }
];

export default function Catalog() {
  const { t } = useLanguage();
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
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-end p-6">
                    <Link href={`/project/${project.id}`}>
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
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-mono text-[10px] text-primary tracking-widest uppercase">{project.category}</h4>
                      <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">{project.title}</h3>
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
