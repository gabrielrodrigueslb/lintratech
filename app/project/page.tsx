"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

import { Search, MessageSquare } from "lucide-react";

import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";

import { useSiteData } from "@/src/contexts/siteDataContext";
import api from "@/src/lib/axios";

import type { Project, Category } from "@/src/types/project";

export default function Catalog() {
  const projects = useSiteData() as Project[];

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Buscar categorias
  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get<Category[]>("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    }

    loadCategories();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory =
      activeCategory === "ALL" || project.category.id === activeCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container">

          {/* HEADER */}
          <div className="mb-16">
            <h2 className="font-mono text-primary tracking-widest mb-4 text-sm uppercase">
              Marketplace
            </h2>

            <h1 className="font-display font-bold text-5xl md:text-6xl mb-8">
              Nossas <span className="text-primary italic">Criações</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-6 justify-between">
              {/* FILTROS */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === "ALL" ? "default" : "outline"}
                  onClick={() => setActiveCategory("ALL")}
                  className="rounded-none font-mono text-xs"
                >
                  ALL
                </Button>

                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat.id)}
                    className="rounded-none font-mono text-xs"
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>

              {/* SEARCH */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar projetos..."
                  className="pl-10 rounded-none"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <Card
                key={project.id}
                className="group rounded-none border-border overflow-hidden hover:border-primary transition"
              >
                <Link href={`/project/${project.id}`}>
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={project.banner}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </Link>

                <CardHeader>
                  <h4 className="font-mono text-[10px] text-primary uppercase">
                    {project.category.name}
                  </h4>
                  <h3 className="font-display font-bold text-xl">
                    {project.title}
                  </h3>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {project.tags.slice(0, 2).map(tag => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">
                    Sob consulta
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    CONTATO
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* EMPTY */}
          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-muted-foreground font-mono">
                Nenhum projeto encontrado.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setActiveCategory("ALL");
                  setSearchQuery("");
                }}
              >
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
