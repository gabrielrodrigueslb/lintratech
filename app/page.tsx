"use client";
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import Portfolio from '@/src/components/Portfolio';
import About from '@/src/components/About';
import Services from '@/src/components/Services';
import Contact from '@/src/components/Contact';
import { useScrollReveal } from '@/src/hooks/useScrollReveal';

export default function HomePage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
      </main>
      <Contact />
    </div>
  );
}
