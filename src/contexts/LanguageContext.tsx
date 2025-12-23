"use client"; // <--- ESTA LINHA É OBRIGATÓRIA PARA CONTEXTOS

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Navbar
    'nav.home': 'INÍCIO',
    'nav.portfolio': 'PROJETOS',
    'nav.about': 'SOBRE',
    'nav.services': 'SERVIÇOS',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTATO',
    
    // Hero
    'hero.badge': 'INOVAÇÃO & TECNOLOGIA',
    'hero.title.1': 'Soluções Digitais que',
    'hero.title.2': 'Impulsionam o Futuro.',
    'hero.subtitle': 'Combinamos precisão técnica com excelência estética para construir produtos digitais que performam tão bem quanto parecem.',
    'hero.cta.services': 'NOSSOS SERVIÇOS',
    'hero.cta.contact': 'FALE CONOSCO',
    
    // Portfolio
    'portfolio.subtitle': 'TRABALHOS EM DESTAQUE',
    'portfolio.title': 'Projetos Selecionados',
    'portfolio.viewAll': 'VER TODOS OS PROJETOS',
    'portfolio.viewCase': 'VER CASE',
    
    // About
    'about.subtitle': 'SOBRE NÓS',
    'about.title.1': 'Paixão, Criatividade',
    'about.title.2': 'e',
    'about.title.3': 'Código',
    'about.p1': 'Somos uma Empresa de Tecnologia focada em transformar ideias complexas em soluções digitais elegantes. Nossa jornada começou com a visão de que o software corporativo não precisa ser chato ou difícil de usar.',
    'about.p2': 'Ao longo dos anos, entregamos projetos de alto impacto no setor financeiro, varejo e startups, processando milhões em transações e impactando milhares de usuários. Valorizamos arquitetura robusta, performance e consistência de interface.',
    'about.p3': 'Nosso foco é transformar sua visão em produtos reais, combinando expertise em UX/UI com desenvolvimento Full-stack avançado e as melhores práticas de engenharia de software.',
    'about.location': 'Brasil (Remoto Global)',
    'about.exp': 'Anos de Experiência',
    'about.cta': 'ENTRE EM CONTATO',
    'about.download': 'NOSSO MEDIA KIT',
    
    // Services
    'services.subtitle': 'SERVIÇOS',
    'services.title.1': 'Transformando Ideias em',
    'services.title.2': 'Soluções Digitais',
    'services.card.1.title': 'Design de Marca & Visual',
    'services.card.1.desc': 'Identidade visual estratégica e comunicação de marca. Criamos logotipos distintos, guias de marca abrangentes e ilustrações digitais que ressoam com seu público.',
    'services.card.2.title': 'Desenv. Web & UI/UX',
    'services.card.2.desc': 'Desenvolvimento web full-stack e design centrado no usuário. Construímos sites rápidos e responsivos e aplicações web com frameworks modernos.',
    'services.card.3.title': 'Desenv. Mobile',
    'services.card.3.desc': 'Desenvolvimento de apps multiplataforma. Criamos aplicações móveis de alta performance com sensação nativa e animações fluidas.',
    'services.viewProjects': 'Ver Projetos Realizados',
    
    // Blog
    'blog.subtitle': 'CONHECIMENTO',
    'blog.title': 'Últimas do Blog',
    'blog.readMore': 'Ler Artigo',
    'blog.empty': 'Em breve novos artigos.',
    
    // Contact
    'contact.subtitle': 'VAMOS COMEÇAR?',
    'contact.title.1': 'Vamos criar algo',
    'contact.title.2': 'extraordinário',
    'contact.title.3': 'juntos.',
    'contact.desc': 'Seja um site impressionante, um app poderoso ou uma identidade de marca completa, estamos aqui para dar vida às suas ideias.',
    'contact.cta': 'INICIAR PROJETO',
    'contact.sitemap': 'MAPA DO SITE',
    'contact.info': 'CONTATO',
    'contact.available': 'Disponível para novos projetos',
    'contact.rights': 'Todos os direitos reservados.',
    
    // Project Details
    'project.back': 'Voltar para Projetos',
    'project.overview': 'Visão Geral',
    'project.challenge': 'O Desafio',
    'project.solution': 'A Solução',
    'project.technologies': 'Tecnologias',
    'project.visit': 'Visitar Site',
  },
  en: {
    // Navbar
    'nav.home': 'HOME',
    'nav.portfolio': 'PORTFOLIO',
    'nav.about': 'ABOUT',
    'nav.services': 'SERVICES',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACT',
    
    // Hero
    'hero.badge': 'INNOVATION & TECHNOLOGY',
    'hero.title.1': 'Digital Solutions that',
    'hero.title.2': 'Drive the Future.',
    'hero.subtitle': 'Combining technical precision with aesthetic excellence to build digital products that perform as beautifully as they look.',
    'hero.cta.services': 'VIEW SERVICES',
    'hero.cta.contact': 'GET IN TOUCH',
    
    // Portfolio
    'portfolio.subtitle': 'FEATURED WORKS',
    'portfolio.title': 'Selected Projects',
    'portfolio.viewAll': 'VIEW ALL PROJECTS',
    'portfolio.viewCase': 'VIEW CASE',
    
    // About
    'about.subtitle': 'ABOUT US',
    'about.title.1': 'Passion, Creativity,',
    'about.title.2': 'and',
    'about.title.3': 'Code',
    'about.p1': 'We are a **Technology Company** focused on transforming complex ideas into elegant digital solutions. Our journey started with the vision that enterprise software doesn\'t have to be boring or hard to use.',
    'about.p2': 'Over the years, we\'ve delivered high-impact projects in the financial sector, retail, and startups, processing millions in transactions and impacting thousands of users. We value robust architecture, performance, and interface consistency.',
    'about.p3': 'Our focus is on transforming your vision into real products, combining UX/UI expertise with advanced Full-stack development and software engineering best practices.',
    'about.location': 'Brazil (Remote Global)',
    'about.exp': 'Years Experience',
    'about.cta': 'CONTACT US',
    'about.download': 'OUR MEDIA KIT',
    
    // Services
    'services.subtitle': 'SERVICES',
    'services.title.1': 'Transforming Ideas into',
    'services.title.2': 'Digital Solutions',
    'services.card.1.title': 'Brand & Visual Design',
    'services.card.1.desc': 'Strategic brand identity design and visual communication services. Crafting distinctive logos, comprehensive brand guidelines, and compelling digital illustrations.',
    'services.card.2.title': 'Web Development & UI/UX',
    'services.card.2.desc': 'Full-stack web development and user-centered design services. Building fast, responsive websites and web applications with modern frameworks.',
    'services.card.3.title': 'Mobile App Development',
    'services.card.3.desc': 'Cross-platform mobile app development. Creating high-performance mobile applications with native feel and seamless animations.',
    'services.viewProjects': 'View Completed Projects',
    
    // Blog
    'blog.subtitle': 'KNOWLEDGE',
    'blog.title': 'Latest from Blog',
    'blog.readMore': 'Read Article',
    'blog.empty': 'New articles coming soon.',
    
    // Contact
    'contact.subtitle': 'READY TO START?',
    'contact.title.1': 'Let\'s create something',
    'contact.title.2': 'extraordinary',
    'contact.title.3': 'together.',
    'contact.desc': 'Whether you need a stunning website, a powerful mobile app, or a complete brand identity, we\'re here to bring your ideas to life.',
    'contact.cta': 'START PROJECT',
    'contact.sitemap': 'SITEMAP',
    'contact.info': 'CONTACT',
    'contact.available': 'Available for new projects',
    'contact.rights': 'All rights reserved.',
    
    // Project Details
    'project.back': 'Back to Projects',
    'project.overview': 'Overview',
    'project.challenge': 'The Challenge',
    'project.solution': 'The Solution',
    'project.technologies': 'Technologies',
    'project.visit': 'Visit Website',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}