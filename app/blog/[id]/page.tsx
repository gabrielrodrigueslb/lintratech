"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { Badge } from "@/src/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import { useBlog } from "@/src/contexts/BlogContext";
import { useEffect, useState } from "react";
import { Post } from "@/src/types/project"; // Certifique-se que o import está correto (project ou post)

export default function BlogPost() {
  const params = useParams();
  
  const slug = typeof params?.id === 'string' ? params.id : '';
  
  const { getPost, isLoading } = useBlog();
  const [post, setPost] = useState<Post | null>(null);
  
  // Inicializa loading se tiver slug
  const [isFetching, setIsFetching] = useState(!!slug);

  useEffect(() => {
    if (slug) {
      // CORREÇÃO ESLint: Removemos setIsFetching(true) síncrono daqui.
      // Se quiser limpar o post anterior enquanto carrega o novo, use setPost(null).
      // Caso contrário, ele mostrará o post antigo até o novo carregar (melhor UX).
      
      getPost(slug)
        .then((data) => setPost(data))
        .catch((err) => console.error(err))
        .finally(() => setIsFetching(false));
    }
  }, [slug, getPost]);

  const formatPostDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  if (isFetching || (isLoading && !post)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado.</h1>
          <p className="text-muted-foreground mb-8">O artigo &quot;{slug}&quot; não existe ou foi removido.</p>
          <Link href="/blog">
            <Button>Voltar para o Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-16 animate-in fade-in duration-500">
        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          {post.featuredImage && (
            // CORREÇÃO TS2322: Casting explícito para garantir string
            <Image 
              src={post.featuredImage as string} 
              alt={post.title} 
              fill
              priority
              className="object-cover"
            />
          )}
          
          <div className="absolute bottom-0 left-0 w-full z-20 container pb-8 md:pb-12">
            <div className="flex flex-col">
              <Link href="/blog">
                <Button variant="ghost" className="mb-3 text-white hover:text-primary pl-0 gap-2 hover:bg-transparent">
                  <ArrowLeft className="w-4 h-4" /> Retornar para o Blog
                </Button>
              </Link>
              
              {post.category && (
                <Badge className="mb-3 sm:mb-4 bg-primary text-black hover:bg-primary/90 border-none w-fit">
                  {post.category.name}
                </Badge>
              )}
            </div>
            
            <h1 className="font-display font-bold text-xl sm:2xl md:text-4xl lg:text-5xl max-w-4xl mb-6 text-white shadow-black drop-shadow-lg">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80 font-mono text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatPostDate(post.publishedAt || post.createdAt)}
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Social */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <p className="text-xs font-mono text-muted-foreground uppercase mb-4">Compartilhar</p>
              <div className="space-y-4">
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-border hover:text-primary hover:border-primary">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-border hover:text-primary hover:border-primary">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-border hover:text-primary hover:border-primary">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-border hover:text-primary hover:border-primary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="lg:col-span-8 prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg">
            <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mt-6 text-3xl font-bold" {...props} />,
                  h2: ({ ...props }) => <h2 className="mt-2 text-2xl font-semibold" {...props} />,
                  h3: ({ ...props }) => <h3 className="mt-2 text-xl font-semibold" {...props} />,
                  p: ({ ...props }) => <p className="leading-relaxed text-foreground/90" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-primary pl-6 italic my-4 text-foreground/80">
                      {props.children}
                    </blockquote>
                  ),
                  ul: ({ ...props }) => <ul className="list-disc pl-6" {...props} />,
                  ol: ({ ...props }) => <ol className="list-decimal pl-6" {...props} />,
                  li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
                  a: ({ ...props }) => <a className="text-primary underline underline-offset-4" {...props} />,
                  img: ({ src, alt }) => (
                      <div className="relative w-full h-auto my-8 rounded-xl overflow-hidden">
                        {/* CORREÇÃO TS2322: Garantindo string ou fallback */}
                        <Image 
                          src={(src as string) || ""} 
                          alt={alt || "Imagem do post"}
                          width={800} 
                          height={450}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className="lg:col-span-2 hidden lg:block"></div>
        </div>
      </main>
      
      <Contact />
    </div>
  );
}