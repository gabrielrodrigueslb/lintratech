import { Project } from '../types/project';

export async function getSiteData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];

    const res = await fetch(
      `${apiUrl}/api/projects`,
      {
        next: {
          revalidate: 5, // Atualiza o cache a cada 5 segundos
        },
      },
    );

    if (!res.ok) throw new Error('Erro API');
    return res.json();

  } catch (error) {
    console.error('Falha ao buscar dados:', error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return null;

    const res = await fetch(
      `${apiUrl}/api/projects/${id}`,
      {
        next: {
          revalidate: 5, // Atualiza o cache a cada 5 segundos
        },
      },
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Erro ao buscar projeto');

    return res.json();
  } catch (error) {
    console.error(`Falha ao buscar projeto ${id}:`, error);
    return null;
  }
}


