"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

// Mock data for blog posts (Mantido igual)
const blogPosts = [
  {
    id: "future-of-fintech",
    title: "The Future of Fintech: AI-Driven Personalization",
    excerpt: "How artificial intelligence is reshaping the way we interact with our finances, from predictive budgeting to automated investment strategies.",
    date: "Oct 12, 2024",
    author: "Rainer Drummond",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read"
  },
  {
    id: "react-server-components",
    title: "Mastering React Server Components in Next.js 14",
    excerpt: "A deep dive into the new paradigm of React development. Understanding when to use server components vs client components for optimal performance.",
    date: "Sep 28, 2024",
    author: "Dev Team",
    category: "Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "8 min read"
  },
  {
    id: "design-systems-2025",
    title: "Why Your Company Needs a Design System in 2025",
    excerpt: "Scaling design consistency across products isn't just about aesthetics—it's about engineering velocity and brand trust.",
    date: "Sep 15, 2024",
    author: "Design Team",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read"
  },
  {
    id: "mobile-first-architecture",
    title: "Mobile-First Architecture for Enterprise Apps",
    excerpt: "Strategies for building robust enterprise applications that prioritize the mobile experience without sacrificing desktop functionality.",
    date: "Aug 30, 2024",
    author: "Tech Lead",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "7 min read"
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
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground border-border hover:bg-background">
                      {post.category}
                    </Badge>
                  </div>
                  
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