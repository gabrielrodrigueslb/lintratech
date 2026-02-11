import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { Badge } from "@/src/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { Post } from "@/src/types/project";

const SITE_URL = "https://www.lintratech.cloud";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const revalidate = 300;

async function fetchPost(slug: string): Promise<Post | null> {
  if (!API_URL) return null;

  const res = await fetch(`${API_URL}/api/posts/slug/${slug}`, {
    next: { revalidate },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Falha ao buscar post");

  return res.json();
}

function toPlainText(value?: string, maxLength = 160) {
  if (!value) return "";
  const withoutMd = value
    .replace(/\n/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (withoutMd.length <= maxLength) return withoutMd;
  return `${withoutMd.slice(0, maxLength - 3).trim()}...`;
}

function absoluteUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function formatPostDate(dateString?: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const slug = id || "";
  const post = slug ? await fetchPost(slug) : null;

  if (!post) {
    return {
      title: "Artigo nao encontrado",
      robots: { index: false, follow: false },
    };
  }

  const description = post.excerpt || toPlainText(post.content, 160);
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.featuredImage ? absoluteUrl(post.featuredImage) : undefined;

  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slug = id || "";
  const post = slug ? await fetchPost(slug) : null;

  if (!post) {
    notFound();
  }

  const description = post.excerpt || toPlainText(post.content, 160);
  const imageUrl = post.featuredImage ? absoluteUrl(post.featuredImage) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author || "Lintra Tech",
    },
    publisher: {
      "@type": "Organization",
      name: "Lintra Tech",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-24 pb-16 animate-in fade-in duration-500">
        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />

          {post.featuredImage && (
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

            <h1 className="font-display font-bold text-2xl sm:2xl md:text-4xl lg:text-5xl max-w-4xl mb-6 text-white shadow-black drop-shadow-lg line-clamp-2">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80 font-mono text-sm">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
              )}
              {(post.publishedAt || post.createdAt) && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatPostDate(post.publishedAt || post.createdAt)}
                </div>
              )}
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

          <div className="lg:col-span-8 prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                      <Image
                        src={(src as string) || ""}
                        alt={alt || "Imagem do post"}
                        width={800}
                        height={450}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ),
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
