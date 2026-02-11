import { useEffect } from 'react';
import { useBlog } from '../contexts/BlogContext';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';

import { ArrowRight, ArrowUpRight, Calendar, User } from 'lucide-react';
import { Button } from './ui/button';

export default function BlogSection() {
  const { posts, fetchPosts, isLoading } = useBlog();
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const postsFiltrados = posts.slice(0, 3); // Exibe apenas os 3 primeiros posts
  const formatPostDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  console.log(postsFiltrados);
  return (
    <section id="blogsection" className="py-24 bg-background relative overflow-hidden">
      {/* Elementos decorativos de fundo da seção */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-primary/20 rounded-full -translate-x-1/2 translate-y-1/2 -z-10" />

      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Lado do Conteúdo */}
          <div className="w-full reveal">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-mono text-primary tracking-widest mb-2 text-sm uppercase">
                  Blog
                </h2>
                <h3 className="font-display font-bold text-4xl md:text-5xl mb-8">
                  Conheça nosso <span className="text-primary">Blog</span>
                </h3>
              </div>

              <Link href="/blog">
                <Button
                  variant="outline"
                  className="rounded-none border-primary text-primary hover:bg-primary hover:text-black font-mono gap-2 group"
                >
                  Ver todas as postagens
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {isLoading && posts.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsFiltrados.map((post) => (
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
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary font-mono text-sm group-hover:translate-x-2 transition-transform"
                        >
                          Ler Artigo
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
