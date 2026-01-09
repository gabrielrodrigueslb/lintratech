import api from '../lib/axios'; // Importando sua instância do axios existente
import { Post } from '../types/project';

export const blogService = {
  // Busca todos os posts (pode passar filtros query params se precisar)
  getAllPosts: async (status: string = 'PUBLISHED'): Promise<Post[]> => {
    const { data } = await api.get(`/api/posts?status=PUBLISHED`);
    return data;
  },

  // Busca post específico pelo SLUG
  getPostBySlug: async (slug: string): Promise<Post> => {
    const { data } = await api.get(`/api/posts/slug/${slug}`);
    return data;
  }
};