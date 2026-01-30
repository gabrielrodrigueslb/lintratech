'use client'; // Necessário se estiver usando Next.js App Router

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Post } from '../types/project';
import { blogService } from '../services/blogService';

interface BlogContextData {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: (forceUpdate?: boolean) => Promise<void>;
  getPost: (slug: string) => Promise<Post | null>;
}

const BlogContext = createContext<BlogContextData>({} as BlogContextData);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Busca a listagem de posts
  const fetchPosts = useCallback(async (forceUpdate = false) => {
    // Se já carregou uma vez e não for forçado, não busca de novo
    if (hasLoadedOnce && !forceUpdate && posts.length > 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await blogService.getAllPosts('PUBLISHED');
      setPosts(data);
      setHasLoadedOnce(true);
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      setError('Falha ao carregar o blog.');
    } finally {
      setIsLoading(false);
    }
  }, [hasLoadedOnce, posts.length]);

  // Busca um post específico (Cache First Strategy)
  const getPost = useCallback(async (slug: string): Promise<Post | null> => {
    // 1. Tenta achar na memória (se a listagem já foi carregada)
    const existingPost = posts.find(p => p.slug === slug);
    if (existingPost) {
      return existingPost;
    }

    // 2. Se não achar (acesso direto via link ou listagem vazia), busca na API
    setIsLoading(true);
    try {
      const post = await blogService.getPostBySlug(slug);
      return post;
    } catch (err) {
      console.error(`Erro ao buscar post ${slug}:`, err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [posts]);

  return (
    <BlogContext.Provider value={{ posts, isLoading, error, fetchPosts, getPost }}>
      {children}
    </BlogContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog deve ser usado dentro de um BlogProvider');
  }
  return context;
}