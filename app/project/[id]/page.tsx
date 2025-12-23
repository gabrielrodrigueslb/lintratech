import { notFound } from "next/navigation";
import { projectsData } from "@/src/lib/projectsData"; // Importe seus dados
import ClientProjectWrapper from "./ClientProjectWrapper";

// No Next.js 15 params é uma Promise, no 14 é objeto direto. 
// Para garantir, vamos tratar como assíncrono.
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    notFound(); // Redireciona automaticamente para a página 404 do Next
  }

  // Se você precisa usar useLanguage (que é hook) aqui, você tem duas opções:
  // 1. Transformar essa página inteira em 'use client'
  // 2. Passar os dados do projeto para um componente filho 'use client' (ClientProjectWrapper)
  
  // Vamos assumir opção 1 para facilitar a migração rápida:
  return <ClientProjectWrapper project={project} />;
}