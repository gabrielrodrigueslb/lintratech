import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/src/components/Providers';
import { getSiteData } from '@/src/services/projetosService';

/* =========================
   FONTES
========================= */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  // Define a cor da barra de status e do overscroll
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050505' }, // Prioridade para dark
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
};

/* =========================
   SEO / METADATA
========================= */
export const metadata: Metadata = {
  title: {
    default: 'Lintra Tech',
    template: '%s | Lintra Tech',
  },
  description:
    'A Lintra Tech desenvolve sites, sistemas e aplicações web modernas, focadas em performance, SEO e experiência do usuário.',
  keywords: [
    'sistema de agendamento',
    'crm para empresas',
    'desenvolvimento de sistemas web',
    'criação de sites profissionais',
    'next.js',
    'lintra tech',
  ],
  authors: [{ name: 'Lintra Tech' }],
  creator: 'Lintra Tech',
  publisher: 'Lintra Tech',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  category: 'technology',

  alternates: {
    canonical: 'https://www.lintratech.cloud',
  },

  openGraph: {
    title: 'Lintra Tech | Soluções Digitais Inteligentes',
    description:
      'Sites e sistemas modernos, rápidos e otimizados para SEO. Desenvolvidos com as melhores tecnologias do mercado.',
    url: 'https://www.lintratech.cloud',
    siteName: 'Lintra Tech',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/banner-lintra.png',
        width: 1200,
        height: 630,
        alt: 'Lintra Tech - Soluções Digitais',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Lintra Tech | Soluções Digitais',
    description:
      'Desenvolvimento de sites e sistemas web modernos, rápidos e escaláveis.',
    images: ['/banner-lintra.png'],
  },

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

/* =========================
   ROOT LAYOUT
========================= */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = await getSiteData();
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head><script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Lintra Tech',
            url: 'https://www.lintratech.cloud',
            logo: 'https://www.lintratech.cloud/icon.png',
            sameAs: [
              'https://www.instagram.com/lintratech',
              'https://www.linkedin.com/company/lintratech',
            ],
          }),
        }}
      /></head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers siteData={siteData}>{children}</Providers>
      </body>
      
    </html>
  );
}
