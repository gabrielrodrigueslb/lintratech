import { Project } from '../types/project';

// src/lib/api.ts
export async function getSiteData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    {
      cache: 'force-cache', // cache global
      next: {
        revalidate: 60 * 10, // 10 minutos
      },
    },
  );

  if (!res.ok) throw new Error('Erro ao buscar dados');

  return res.json();
}

export async function getProjectById(id: string): Promise<Project | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`,
    {
      cache: 'force-cache',
      next: {
        revalidate: 60 * 10, // 10 minutos
      },
    },
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Erro ao buscar projeto');
  }

  return res.json();
}
