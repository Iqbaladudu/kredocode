"use client";

import { useEffect, useRef, MouseEvent } from "react";
import { services } from "@/lib/landing-data";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Tilt Card Component
function TiltCard({
  children,
  className,
  isDark,
}: {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative rounded-[2rem] p-8 md:p-10 border overflow-hidden transition-colors duration-500", // Increased padding/rounding
        isDark
          ? "bg-[#0c0c0c] border-white/10 text-white"
          : "bg-white border-slate-200 text-slate-900",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gloss/Noise Effect Overlay */}
      {isDark && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
      )}

      {/* Gradient Hover Effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          isDark
            ? "bg-gradient-to-br from-white/10 to-transparent"
            : "bg-gradient-to-br from-slate-100 to-white"
        )}
      />

      <div
        className="relative z-10 h-full flex flex-col justify-between transform transition-transform duration-300 group-hover:translate-z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const items = grid.children;

      gsap.from(items, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getBentoClass = (index: number) => {
    // Pattern: Big (Dark), Small, Small, Big (Dark) ...
    if (index === 0 || index === 3 || index === 6) {
      return "md:col-span-2 md:row-span-2 md:min-h-[400px]";
    }
    return "md:col-span-1 md:row-span-1 md:min-h-[320px]";
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-32 px-4 md:px-10 lg:px-20 bg-slate-50 relative"
      id="services"
    >
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="block text-black text-sm font-bold uppercase tracking-wider mb-6">
              Our Expertise
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.95] tracking-tighter">
              Engineering <br />
              <span className="text-slate-400">Excellence.</span>
            </h2>
          </div>
          <p className="text-xl text-slate-500 max-w-md leading-relaxed">
            We don&apos;t just write code. We architect scalable, future-proof
            digital ecosystems.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            // Feature specific cards as Dark Mode
            const isDark = index === 0 || index === 3 || index === 6;

            return (
              <TiltCard
                key={index}
                className={cn(
                  getBentoClass(index),
                  "shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-shadow duration-500"
                )}
                isDark={isDark}
              >
                <div className="flex justify-between items-start mb-8">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                      isDark ? "bg-white/10 text-white" : "bg-black text-white"
                    )}
                  >
                    <service.icon className="w-7 h-7" />
                  </div>

                  <div
                    className={cn(
                      "w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300",
                      isDark
                        ? "border-white/20 text-white bg-white/10"
                        : "border-slate-200 text-black bg-white"
                    )}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3
                    className={cn(
                      "text-3xl font-bold mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300",
                      isDark ? "text-white" : "text-slate-900"
                    )}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "text-base leading-relaxed max-w-xs",
                      isDark ? "text-slate-400" : "text-slate-500"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
