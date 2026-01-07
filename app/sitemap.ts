import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.lintratech.cloud";

  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
    { url: `${baseUrl}/project`, priority: 0.8 },
  ];
}
