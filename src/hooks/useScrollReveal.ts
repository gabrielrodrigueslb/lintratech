"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Staggered reveal for grids
    const revealGrids = document.querySelectorAll(".reveal-grid");
    revealGrids.forEach((grid) => {
      const children = grid.children;
      gsap.fromTo(
        children,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
