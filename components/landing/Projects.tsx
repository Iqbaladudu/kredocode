"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/landing-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    const cursorLabel = cursorLabelRef.current;

    if (!section || !cursor || !cursorLabel) return;

    // Move cursor
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(cursorLabel, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const ctx = gsap.context(() => {
      // Reveal list items
      const items = section.querySelectorAll(".project-item");
      gsap.from(items, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });
    }, section);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, []);

  // Handle hover state for scale animation
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorLabel = cursorLabelRef.current;

    if (activeIndex !== null) {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(cursorLabel, { scale: 1, opacity: 1, duration: 0.3 });
    } else {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(cursorLabel, { scale: 0, opacity: 0, duration: 0.3 });
    }
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-32 px-4 md:px-10 lg:px-20 bg-slate-50 relative md:cursor-none"
      id="work"
    >
      {/* Custom Cursor Image */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[400px] h-[300px] rounded-2xl overflow-hidden pointer-events-none z-50 opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Custom Cursor Label */}
      <div
        ref={cursorLabelRef}
        className="fixed top-0 left-0 w-20 h-20 bg-[#0f172b] rounded-full flex items-center justify-center text-black font-bold text-sm pointer-events-none z-50 opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex mix-blend-difference"
      >
        VIEW
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-slate-200 pb-8">
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter">
            Selected
            <br />
            Works
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-sm mb-2">
            Showcasing our finest digital craftsmanship and technical solutions.
          </p>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-item group relative border-b border-slate-200 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between transition-colors hover:bg-white px-4 md:px-8 -mx-4 md:-mx-8"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="text-3xl md:text-5xl font-bold text-slate-800 md:text-slate-300 group-hover:text-slate-900 transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex gap-4 text-sm text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>2024</span>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 md:translate-x-4 group-hover:translate-x-0">
                {["React", "Node.js"].map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold uppercase tracking-wider bg-white"
                  >
                    {tech}
                  </span>
                ))}
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <p className="text-sm text-slate-400">Tap projects to explore</p>
        </div>
      </div>
    </section>
  );
}
