"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/src/contexts/ThemeContext";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Importação adicionada

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false)
      });
      tl.to(".preloader-bar", { width: "100%", duration: 0.8, ease: "power4.inOut" })
        .to(".preloader-content", { opacity: 0, y: -20, duration: 0.4 })
        .to(".preloader-bg", { height: 0, duration: 0.8, ease: "expo.inOut" });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(".page-transition", { height: "100%", top: "auto", bottom: 0 })
      .to(".page-transition", { height: 0, duration: 0.8, ease: "expo.inOut", delay: 0.1 });
  }, [pathname]);

  return (
    <>
      {isLoading && (
        // Correção da classe z-index sugerida pelo log
        <div className="preloader-bg fixed inset-0 z-9999 bg-background flex flex-col items-center justify-center overflow-hidden">
          <div className="preloader-content flex flex-col items-center">
            <div className="relative w-30 h-20 mb-8 flex items-center justify-center">
               <span className="text-4xl font-bold text-primary">
                 {/* CORREÇÃO: Image do Next.js */}
                 {theme === 'dark' ? (
                   <Image src="/logo_dark.png" alt="Logo lintra tech" width={120} height={60} />
                 ) : (
                   <Image src="/logo_light.png" alt="Logo lintra tech" width={120} height={60} />
                 )}
               </span>
            </div>
            <div className="w-48 h-0.5 bg-primary/10 relative overflow-hidden">
              <div className="preloader-bar absolute top-0 left-0 h-full w-0 bg-primary" />
            </div>
            <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-primary uppercase animate-pulse">
              Initializing System
            </p>
          </div>
        </div>
      )}
      <div className="page-transition fixed left-0 right-0 top-0 z-9998 bg-primary backdrop-blur-md pointer-events-none" />
    </>
  );
}