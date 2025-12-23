export const projectsData = {
  "1": {
    title: "Digital Products Platform | Get Now",
    category: "WEB APPLICATION",
    tags: ["FINTECH", "PROJECT MANAGEMENT", "ATTENTION TO DETAIL"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description: "A comprehensive platform for managing digital products with integrated payment processing and analytics dashboard.",
    challenge: "The client needed a robust platform to handle thousands of digital product transactions daily, with real-time analytics and a seamless user experience for both sellers and buyers. The existing solution was slow and difficult to scale.",
    solution: "We architected a microservices-based solution using Next.js for the frontend and Node.js for the backend. We implemented a custom caching layer to ensure sub-second load times and integrated Stripe Connect for complex payment flows.",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe API"],
    year: "2024",
    role: "Full Stack Development & UI/UX Design"
  },
  "2": {
    title: "Payment Gateway & Banking App | Get Pay",
    category: "FINTECH",
    tags: ["BANKING", "PROJECT MANAGEMENT", "PROBLEM SOLVING"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description: "Secure payment gateway solution with real-time transaction monitoring and fraud detection systems.",
    challenge: "Building a secure, compliant payment gateway that could detect fraudulent transactions in real-time without adding significant latency to the checkout process.",
    solution: "We developed a machine learning model for fraud detection and integrated it into a high-performance Go backend. The frontend was built with React Native to provide a native mobile experience for merchants to track their sales.",
    technologies: ["Go", "React Native", "Python (ML)", "AWS", "Docker"],
    year: "2023",
    role: "Backend Engineering & Mobile Dev"
  },
  "3": {
    title: "Fintech Platform | SeerCard",
    category: "REACT NEXT.JS",
    tags: ["TEAM COLLABORATION", "PROBLEM SOLVING", "UI/UX"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description: "Modern credit card management interface allowing users to track spending, set limits, and analyze financial habits.",
    challenge: "Users found traditional banking apps confusing and cluttered. The goal was to create a clean, intuitive interface that made financial management accessible to everyone.",
    solution: "We adopted a 'design-first' approach, creating extensive prototypes in Figma before writing code. The final application uses extensive data visualization to help users understand their spending habits at a glance.",
    technologies: ["React", "D3.js", "TypeScript", "GraphQL", "Figma"],
    year: "2023",
    role: "Frontend Lead & UI Design"
  },
  "4": {
    title: "Banking App | Ártico Capital",
    category: "REACT NATIVE",
    tags: ["UX/UI", "ATTENTION TO DETAIL", "ANALYTICAL THINKING"],
    image: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description: "Mobile banking application focused on investment portfolio management and crypto asset tracking.",
    challenge: "Integrating traditional stock market data with real-time crypto feeds in a single, unified mobile interface without draining battery or data.",
    solution: "We utilized WebSockets for real-time data updates and implemented an efficient local database for offline caching. The UI was optimized for dark mode to reduce battery consumption on OLED screens.",
    technologies: ["React Native", "Redux", "WebSockets", "SQLite", "Firebase"],
    year: "2024",
    role: "Mobile Development"
  },
  "7": {
    title: "Hub de Links | Bio Connect",
    category: "WEB APPLICATION",
    tags: ["REDES SOCIAIS", "MARKETING", "MOBILE FIRST"],
    image: "/insa.png",
    description: "Uma solução centralizadora de presença digital projetada para converter seguidores em clientes. Permite que criadores e empresas agrupem todos os seus canais importantes em uma única página de alta conversão.",
    challenge: "O maior desafio no marketing de redes sociais hoje é a limitação de 'um único link' na bio. Ferramentas existentes muitas vezes são lentas, têm design genérico ou cobram caro por funcionalidades básicas de personalização. O objetivo era criar uma alternativa rápida, bonita e que o cliente tivesse controle total.",
    solution: "Desenvolvemos uma aplicação 'Mobile First' focada em velocidade de carregamento instantâneo. Implementamos um sistema de temas dinâmicos que permite ao usuário alinhar a página com sua identidade visual exata. Além disso, integramos um rastreador de cliques próprio que não depende de cookies de terceiros, garantindo privacidade e dados precisos.",
    technologies: ["React", "Tailwind CSS", "PostgreSQL"],
    year: "2025",
    role: "Product Design & Full Stack Dev"
  }
};