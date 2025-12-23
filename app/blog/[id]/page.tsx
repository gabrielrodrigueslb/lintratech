"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { Badge } from "@/src/components/ui/badge";
import ReactMarkdown from 'react-markdown';

// Mock data
const blogPostsData = {
  "future-of-fintech": {
    title: "The Future of Fintech: AI-Driven Personalization",
    date: "Oct 12, 2024",
    author: "Rainer Drummond",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    readTime: "5 min read",
    content: `
# The Future of Fintech is Personal

Artificial Intelligence is no longer just a buzzword in the financial sector—it's the driving force behind the next generation of banking experiences. As we move into 2025, the one-size-fits-all approach to banking is rapidly becoming obsolete.

## Hyper-Personalization at Scale

Traditional banks have always struggled to provide personalized advice to mass-market customers. Human advisors are expensive and can only handle a limited number of clients. AI changes this equation entirely.

By analyzing transaction history, spending patterns, and life events, AI algorithms can now offer tailored financial advice that was previously reserved for high-net-worth individuals.

> "The bank of the future won't just store your money; it will help you optimize it automatically."

## Predictive Budgeting

Imagine a banking app that doesn't just tell you what you spent last month, but predicts what you'll spend next month with 95% accuracy. This isn't science fiction—it's happening now.

Predictive models can alert users to upcoming bills, suggest savings opportunities based on cash flow patterns, and even negotiate subscription renewals automatically.

## Automated Investment Strategies

Robo-advisors were just the beginning. The next wave of investment tools will use generative AI to explain complex market movements in plain language and adjust portfolios in real-time based on global economic shifts.

### Key Takeaways

1. **Context-Aware Banking**: Apps that know where you are and what you need.
2. **Proactive Alerts**: Solving financial problems before they happen.
3. **Financial Health Scores**: Real-time metrics on your financial well-being.

The future of fintech isn't just about faster transactions—it's about smarter, more empathetic financial partners.
    `
  },
  "react-server-components": {
    title: "Mastering React Server Components in Next.js 14",
    date: "Sep 28, 2024",
    author: "Dev Team",
    category: "Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    readTime: "8 min read",
    content: `
# A New Paradigm for React

React Server Components (RSC) represent the biggest shift in the React ecosystem since hooks. They allow us to write components that render exclusively on the server, reducing the amount of JavaScript sent to the client.

## Why Server Components?

The main goal of RSC is to reduce the bundle size of your application. Traditional React apps send all the code to the client, even for static content. With RSC, we can keep large dependencies on the server.

\`\`\`jsx
// This component runs ONLY on the server
import db from 'database';

async function ProductList() {
  const products = await db.query('SELECT * FROM products');
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## When to use Client Components?

Client components are still essential for interactivity. Whenever you need \`useState\`, \`useEffect\`, or event listeners, you must use a Client Component.

The beauty of the App Router in Next.js is how seamlessly it interweaves Server and Client components. You can pass data from a Server Component to a Client Component as props.

## Performance Implications

By moving data fetching to the server, we eliminate the "waterfall" problem often seen in client-side fetching. The server can fetch data from the database directly, with near-zero latency, and stream the HTML to the client.

This results in significantly faster First Contentful Paint (FCP) and Largest Contentful Paint (LCP) metrics, which are crucial for SEO and user experience.
    `
  }
};

export default function BlogPost() {
  const params = useParams(); // Hook do Next.js para pegar o parâmetro da URL
  
  // Garantia de tipo para o id
  const id = typeof params?.id === 'string' ? params.id : '';
  const post = blogPostsData[id as keyof typeof blogPostsData];
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog">
            <Button>Return to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-16 animate-in fade-in duration-500">
        {/* Hero Image */}
        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full z-20 container pb-12">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 text-white hover:text-primary pl-0 gap-2 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Button>
            </Link>
            <Badge className="mb-4 bg-primary text-black hover:bg-primary/90 border-none">
              {post.category}
            </Badge>
            <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl max-w-4xl mb-6 text-white shadow-black drop-shadow-lg">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80 font-mono text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar / Share */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-32 space-y-4 ">
              <p className="text-xs font-mono text-muted-foreground uppercase mb-4">Share this article</p>
              <div className="sticky top-32 space-y-4"><Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-border hover:text-primary hover:border-primary">
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
              </Button></div>
              
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg">
            <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed ">
              <ReactMarkdown
  components={{
    h1: ({ node, ...props }) => (
      <h1 className="mt-6 text-4xl font-bold" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="mt-2 text-3xl font-semibold" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="mt-2 text-2xl font-semibold" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className=" leading-relaxed text-foreground/90" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-primary pl-6 italic my-4 text-foreground/80">
        {props.children}
      </blockquote>
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 my-6 space-y-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-6 " {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="leading-relaxed" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-primary underline underline-offset-4" {...props} />
    ),
  }}
>
  {post.content}
</ReactMarkdown>
            </div>
          </div>
          
          {/* Table of Contents (Placeholder) */}
          <div className="lg:col-span-2 hidden lg:block">
            {/* Could add TOC here later */}
          </div>
        </div>
      </main>
      
      <Contact />
    </div>
  );
}