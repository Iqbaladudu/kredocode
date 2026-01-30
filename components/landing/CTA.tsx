"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/animations";
import { redirect } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-4 md:px-10 lg:px-40 bg-zinc-950 text-white"
    >
      <div className=" mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold uppercase tracking-wider mb-8">
          Start Your Journey
        </span>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
          Ready to build <br /> something{" "}
          <span className="text-slate-500">extraordinary?</span>
        </h2>

        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Let's collaborate to transform your ideas into powerful digital
          solutions. We are ready when you are.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticButton strength={0.2}>
            <button
              className="h-14 px-10 bg-white text-black hover:bg-slate-200 rounded-full font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 group"
              onClick={() => redirect("https://wa.me/6281288209603")}
            >
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <button
              className="h-14 px-10 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-full font-bold text-base transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => redirect("https://wa.me/6281288209603")}
            >
              <MessageCircle className="w-5 h-5" />
              Book a Call
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
