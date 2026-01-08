"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { useEffect } from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { useBlog } from "@/src/contexts/BlogContext";


export default function BlogList() {
  const { posts, fetchPosts, isLoading } = useBlog();
  const { t } = useLanguage();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const formatPostDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

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

          {isLoading && posts.length === 0 ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="bg-card border-border overflow-hidden group hover:border-primary transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                      
                      {post.featuredImage && (
                        <Image 
                          src={post.featuredImage} 
                          alt={post.title} 
                          fill 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      
                      {post.category && (
                        <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground border-border hover:bg-background">
                          {post.category.name}
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader className="pb-2 pt-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-mono">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatPostDate(post.publishedAt || post.createdAt)}
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
          )}
        </div>
      </main>
      
      <Contact />
    </div>
  );
}