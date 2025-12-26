import { Project } from '../types/project';

// src/lib/api.ts
export async function getSiteData() {
  try {
    // Verifica se a URL da API está definida
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL não está definida. Retornando dados vazios.");
      return [];
    }

    const res = await fetch(
      `${apiUrl}/api/projects`,
      {
        cache: 'force-cache', 
        next: {
          revalidate: 0, // 5 segundos
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Erro API: ${res.status} ${res.statusText}`);
    }

    return res.json();

  } catch (error) {
    // 🔥 IMPORTANTE: O catch evita que o build quebre se o backend estiver offline
    console.error('⚠️ Falha ao buscar dados no build (Backend offline?):', error);
    return []; // Retorna lista vazia para o build continuar
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return null;

    const res = await fetch(
      `${apiUrl}/api/projects/${id}`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 5,
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
  } catch (error) {
    console.error(`⚠️ Falha ao buscar projeto ${id}:`, error);
    return null;
  }
}