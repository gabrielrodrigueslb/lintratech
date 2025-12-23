import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"; // Importe as fontes
import "./globals.css";
import { Providers } from "@/src/components/Providers";

// Configuração da Fonte Principal (Sans)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // Define o nome da variável CSS
  display: "swap",
});

// Configuração da Fonte de Títulos (Display)
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Configuração da Fonte Mono (Código/Detalhes)
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lintra Tech",
  description: "Soluções Digitais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body 
        // Juntamos as variáveis de todas as fontes aqui
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}