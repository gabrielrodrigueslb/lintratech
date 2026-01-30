import { notFound } from 'next/navigation';
import { getProjectById } from '@/src/services/projetosService';
import ClientProjectWrapper from './ClientProjectWrapper';

// ATUALIZAÇÃO: Params agora é uma Promise no Next.js 15+
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
  // CORREÇÃO: Aguarde o params ser resolvido
  const { id } = await params;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ClientProjectWrapper project={project} />;
}
