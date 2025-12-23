"use client";

import { useParams } from "next/navigation"; // Removido 'notFound' pois não estava sendo usado
import Link from "next/link";
import Image from "next/image"; // Adicionado para substituir a tag <img>
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Contact from "@/src/components/Contact";
import { Badge } from "@/src/components/ui/badge";
import ReactMarkdown from 'react-markdown';

const blogPostsData = {
  "future-of-fintech": {
    title: "O Futuro da Fintech: Personalização Impulsionada por IA",
    date: "12 de Out, 2025",
    author: "Equipe de Desenvolvimento",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    readTime: "5 min de leitura",
    content: `
# O Futuro da Fintech é Pessoal

A Inteligência Artificial não é mais apenas uma tecnologia de suporte no setor financeiro — ela se tornou o núcleo estratégico da próxima geração de experiências bancárias. Em 2025, o conceito de "banco para todos" morreu, dando lugar ao "meu banco particular".

## A Era da Hiper-personalização

Tradicionalmente, bancos segmentavam clientes por faixas de renda simplistas. Hoje, a IA analisa milhares de pontos de dados: desde a frequência com que você pede café até a probabilidade de você querer comprar uma casa nos próximos 18 meses. 

Isso permite que a interface do app mude dinamicamente. Se você é um investidor agressivo, sua tela inicial destaca o mercado de ações; se está focado em pagar dívidas, o app prioriza ferramentas de amortização e economia automática.

> "A inteligência artificial transforma dados brutos em empatia digital, prevendo as necessidades do usuário antes mesmo que ele as sinta."

## Orçamentos Preditivos e Invisíveis

O grande salto de 2025 é o orçamento que se ajusta sozinho. Modelos de aprendizado de máquina identificam anomalias nos seus gastos e ajustam suas metas de economia em tempo real. Se uma conta de luz veio mais cara, o sistema sugere onde reduzir no lazer para manter sua saúde financeira intacta, sem que você precise abrir uma planilha.

### Transformações Próximas:
1. **Atendimento Cognitivo**: Chatbots que realmente entendem nuances financeiras complexas.
2. **Segurança Comportamental**: Identificação de fraudes através do seu jeito único de digitar e navegar no app.
3. **Micro-investimentos Automáticos**: Arredondamento de compras aplicado em portfólios otimizados por risco.

O futuro das fintechs não é sobre transações, mas sobre a construção de um ecossistema financeiro que respira junto com o usuário.
    `
  },
  "tendencias-ux-ui-2025": {
    title: "Tendências de UX/UI que vão Definir o Mercado em 2025",
    date: "15 de Dez, 2025",
    author: "Equipe de Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // URL Atualizada e funcional
    readTime: "6 min de leitura",
    content: `
# Redefinindo a Experiência do Usuário em 2025

O design de interfaces em 2025 é definido por uma palavra: **Contextualidade**. Saímos da era das interfaces estáticas para sistemas que se adaptam, aprendem e respondem às nuances do ambiente e do comportamento humano.

## Interfaces Gerativas e Dinâmicas

Graças aos avanços em LLMs (Large Language Models), as interfaces começam a ser geradas "on-the-fly". Isso significa que a hierarquia visual pode mudar conforme o que você está tentando realizar. Menus fixos estão sendo substituídos por campos de comando inteligente e botões que aparecem apenas no momento exato da necessidade.

## O Retorno do Esqueuomorfismo Sutil (Glassmorphism 2.0)

Após anos de minimalismo extremo e "flat design", os usuários sentem falta de texturas que remetam ao mundo físico. O uso de transparências, desfoques de fundo (blur) e profundidade (Z-axis) ajuda a criar uma hierarquia visual mais clara, reduzindo a fadiga ocular em sessões longas de uso.

> "O design moderno não é sobre o que é bonito, mas sobre como ele guia o olhar e facilita a tomada de decisão em um mundo saturado de informação."

## Sustentabilidade Digital e Dark Mode 3.0

O Dark Mode evoluiu de uma opção estética para uma necessidade de eficiência energética em telas OLED. Interfaces agora utilizam paletas de cores que economizam pixels ativos sem comprometer a acessibilidade, focando em altos contrastos para usuários com deficiência visual.

### O que observar:
* **Micro-animações baseadas em física**: Movimentos que parecem naturais e menos mecânicos.
* **Voz e Gesto**: A interface se torna multimodal, não dependendo apenas do toque.
* **Design Ético**: Interfaces que combatem padrões obscuros (dark patterns) e priorizam o bem-estar mental.
    `
  },
  "seguranca-em-aplicacoes-modernas": {
    title: "Segurança em Primeiro Lugar: Protegendo Aplicações Next.js",
    date: "05 de Dez, 2025",
    author: "Equipe de Segurança Digital",
    category: "Desenvolvimento",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    readTime: "10 min de leitura",
    content: `
# Segurança na Camada de Aplicação

A velocidade do desenvolvimento moderno com Next.js traz grandes vantagens, mas também abre novas superfícies de ataque. Em 2025, a segurança deve ser "shifted left", ou seja, integrada desde a primeira linha de código escrita.

## O Poder dos Server Components na Segurança

Um dos maiores trunfos do Next.js 14 e 15 é a separação clara entre servidor e cliente. Ao utilizar Server Components para lógicas sensíveis, chaves de API e conexões com o banco de dados nunca chegam ao navegador. Isso elimina classes inteiras de vulnerabilidades, como o vazamento de tokens no console do cliente.

## Autenticação de "Zero Confiança" (Zero-Trust)

Implementar autenticação robusta não é mais opcional. Estamos nos movendo para além das senhas tradicionais em direção às **Passkeys**. Utilizar biometria nativa do dispositivo (FaceID ou TouchID) via WebAuthn oferece uma segurança impenetrável contra ataques de phishing e força bruta.

\`\`\`typescript
// Exemplo de cabeçalhos de segurança (CSP) recomendados
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
];
\`\`\`

## Protegendo Server Actions

Com a introdução das Server Actions, o risco de CSRF (Cross-Site Request Forgery) e IDOR (Insecure Direct Object Reference) reaparece. É vital validar o estado de autenticação e as permissões do usuário *dentro* de cada action, nunca confiando apenas na UI para esconder botões.

### Checklist de Proteção:
1. **Sanitização de Input**: Valide cada entrada com bibliotecas como Zod.
2. **Rate Limiting**: Evite ataques de negação de serviço em rotas de API.
3. **Auditoria de Dependências**: Use ferramentas como \`npm audit\` ou Snyk para monitorar falhas em bibliotecas de terceiros.
    `
  },
  "design-systems-2025": {
    title: "Por que sua empresa precisa de um Design System em 2025",
    date: "15 de Set, 2025",
    author: "Equipe de Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518062-c9a79414b68e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    readTime: "6 min de leitura",
    content: `
# Escalando Design com Eficiência

Um Design System não é apenas uma biblioteca de componentes; é o sistema operacional da sua marca. Em 2025, empresas que não possuem um vocabulário visual comum perdem produtividade e diluem a confiança do cliente.

## O Fim do Desperdício de Desenvolvimento

Quantas vezes seus desenvolvedores recriaram um botão ou um modal do zero? Um Design System elimina a redundância. Ao centralizar tokens de design (cores, espaçamentos, tipografia), uma mudança global leva segundos, não semanas. Isso aumenta a velocidade de engenharia em até 35% nos primeiros meses de implementação.

## Consistência Multicanal

Hoje, seu usuário interage com sua marca no relógio inteligente, no smartphone, no desktop e até em assistentes de voz. O Design System garante que a "alma" da interface seja a mesma, independentemente da densidade de pixels ou da tecnologia de renderização.

### Pilares de um Sistema de Sucesso:
* **Tokens de Design**: A verdade única sobre sua marca.
* **Documentação Viva**: Exemplos de código reais que desenvolvedores podem copiar.
* **Governança**: Um processo claro para sugerir e aprovar novos componentes.
    `
  },
  "mobile-first-architecture": {
    title: "Arquitetura Mobile-First para Aplicativos Corporativos",
    date: "30 de Ago, 2025",
    author: "Líder Técnico",
    category: "Arquitetura",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    readTime: "7 min de leitura",
    content: `
# Mobile-First na Engenharia Enterprise

Projetar para mobile-first não é apenas sobre CSS responsivo; é sobre uma mudança na arquitetura de dados. Apps corporativos costumam ser pesados e lentos em redes 4G instáveis. Como resolvemos isso?

## Carregamento Progressivo e Hidratação Parcial

Em sistemas empresariais complexos (ERPs, Dashboards), carregar tudo de uma vez no mobile é um suicídio de UX. Utilizamos arquiteturas que priorizam o "Caminho Crítico". Primeiro, entregamos o que o usuário precisa ver (as métricas principais), depois carregamos as funcionalidades secundárias em segundo plano.

## Offline-First: A Realidade do Campo

Muitos apps corporativos são usados em depósitos, aeroportos ou áreas rurais com sinal precário. Uma arquitetura robusta deve suportar o modo offline nativamente. O uso de **Service Workers** e sincronização de dados local (IndexedDB) permite que o trabalho não pare, sincronizando as alterações assim que o sinal retorna.

> "A arquitetura mobile-first moderna foca na resiliência da conexão e na economia de recursos do hardware."

### Estratégias de Implementação:
1. **Otimização de Imagens**: Entrega automática de WebP conforme o tamanho da tela.
2. **APIs Eficientes**: Uso de GraphQL para buscar apenas os dados necessários, reduzindo o payload.
3. **Feedback Tátil**: Utilizar a vibração e sensores do mobile para enriquecer a experiência de usuário.
    `
  }
};

export default function BlogPost() {
  const params = useParams();
  
  const id = typeof params?.id === 'string' ? params.id : '';
  const post = blogPostsData[id as keyof typeof blogPostsData];
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado.</h1>
          <Link href="/blog">
            <Button>Voltar para o Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-16 animate-in fade-in duration-500">
        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          {/* SUBSTITUIÇÃO: Tag <img> por componente <Image /> */}
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full z-20 container pb-12">
            <div className="flex flex-col">
              <Link href="/blog">
                <Button variant="ghost" className="mb-6 text-white hover:text-primary pl-0 gap-2 hover:bg-transparent">
                  <ArrowLeft className="w-4 h-4" /> Retornar para o Blog
                </Button>
              </Link>
              <Badge className="mb-4 bg-primary text-black hover:bg-primary/90 border-none w-fit">
                {post.category}
              </Badge>
            </div>
            
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
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <p className="text-xs font-mono text-muted-foreground uppercase mb-4">Share this article</p>
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
            <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed ">
              <ReactMarkdown
                components={{
                  // CORREÇÃO: Removido 'node' dos argumentos para evitar erro de no-unused-vars
                  h1: ({ ...props }) => (
                    <h1 className="mt-6 text-4xl font-bold" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="mt-2 text-3xl font-semibold" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="mt-2 text-2xl font-semibold " {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className=" leading-relaxed text-foreground/90" {...props} />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-primary pl-6 italic my-4 text-foreground/80">
                      {props.children}
                    </blockquote>
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-6" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal pl-6 " {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="leading-relaxed" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a className="text-primary underline underline-offset-4" {...props} />
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