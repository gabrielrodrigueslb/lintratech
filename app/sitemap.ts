import { MetadataRoute } from "next";
import { Post } from "@/src/types/project";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.lintratech.cloud";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let posts: Post[] = [];

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/posts?status=PUBLISHED`, {
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        posts = await res.json();
      }
    } catch (error) {
      console.error("Falha ao montar sitemap de posts:", error);
    }
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
    { url: `${baseUrl}/project`, priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || post.createdAt,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
