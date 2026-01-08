export type Category = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  banner: string;
  images: string[];
  tags: string[];
  challenge:string,
  solution:string,
  link:string,
  technologies: string[];
  year: number;
  role: string;
  category: {
    id: number;
    name: string;
  };
};

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  contentType: 'MARKDOWN' | 'HTML'; // Baseado no seu backend
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string;
  author?: string;
  featuredImage?: string;
  readTime?: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}