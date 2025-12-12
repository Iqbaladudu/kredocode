"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/animations";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function CTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLParagraphElement>(null);
    const glow1Ref = useRef<HTMLDivElement>(null);
    const glow2Ref = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const badge = badgeRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const buttons = buttonsRef.current;
        const trust = trustRef.current;
        const glow1 = glow1Ref.current;
        const glow2 = glow2Ref.current;
        const particles = particlesRef.current;

        if (!section || !container || !badge || !title || !desc || !buttons || !trust) return;

        const ctx = gsap.context(() => {
            // Container reveal with scale
            gsap.from(container, {
                scale: 0.9,
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    once: true,
                },
            });

            // Badge animation
            gsap.from(badge, {
                y: 30,
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    once: true,
                },
            });

            // Title animation with word split
            gsap.from(title, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                },
            });

            // Description fade
            gsap.from(desc, {
                y: 40,
                opacity: 0,
                duration: 0.7,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                },
            });

            // Buttons stagger
            gsap.from(buttons.children, {
                y: 30,
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                stagger: 0.15,
                delay: 0.3,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                },
            });

            // Trust indicator
            gsap.from(trust, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                delay: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                },
            });

            // Glow animations
            if (glow1 && glow2) {
                gsap.to(glow1, {
                    x: 30,
                    y: 30,
                    scale: 1.2,
                    duration: 4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });

                gsap.to(glow2, {
                    x: -30,
                    y: -30,
                    scale: 1.3,
                    duration: 5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            // Floating particles
            if (particles) {
                const particleElements = particles.children;
                gsap.to(particleElements, {
                    y: -30,
                    opacity: 0.8,
                    duration: 3,
                    stagger: {
                        each: 0.2,
                        repeat: -1,
                        yoyo: true,
                    },
                    ease: "sine.inOut",
                });
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 lg:px-40 bg-[#f6f8f6] dark:bg-[#152111]"
        >
            <div
                ref={containerRef}
                className="max-w-[1200px] mx-auto bg-gradient-to-br from-[#20321a] via-[#1a2915] to-[#152111] rounded-3xl p-6 sm:p-10 md:p-12 lg:p-20 text-center relative overflow-hidden border border-[#2c4724]/50"
            >
                {/* Animated Glow Effects */}
                <div
                    ref={glow1Ref}
                    className="absolute top-0 left-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#49e619]/20 rounded-full blur-[100px] sm:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                />
                <div
                    ref={glow2Ref}
                    className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#49e619]/20 rounded-full blur-[100px] sm:blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"
                />

                {/* Floating Particles */}
                <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-[#49e619]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: 0.3,
                            }}
                        />
                    ))}
                </div>

                {/* Animated Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle, #49e619 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Decorative Lines */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#49e619]/20 to-transparent" />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#49e619]/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Badge */}
                    <div
                        ref={badgeRef}
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#49e619]/10 border border-[#49e619]/30 mb-6 sm:mb-8 group cursor-pointer hover:bg-[#49e619]/20 transition-colors"
                    >
                        <Sparkles className="w-4 h-4 text-[#49e619] animate-pulse" />
                        <span className="text-[#49e619] text-xs sm:text-sm font-bold uppercase tracking-wider">
                            Let's Build Together
                        </span>
                    </div>

                    {/* Title */}
                    <h2
                        ref={titleRef}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight"
                    >
                        Ready to transform{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#49e619] via-emerald-400 to-[#49e619] bg-[length:200%_auto] animate-gradient">
                            your business?
                        </span>
                    </h2>

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 max-w-xl md:max-w-2xl mx-auto leading-relaxed"
                    >
                        Let's discuss your next project. We help innovative companies build
                        the future with scalable and secure software.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        ref={buttonsRef}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <MagneticButton strength={0.15}>
                            <button className="group w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 bg-[#49e619] hover:bg-[#3dd514] text-[#152111] rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-[0_0_30px_rgba(73,230,25,0.3)] hover:shadow-[0_0_50px_rgba(73,230,25,0.5)] flex items-center justify-center gap-3">
                                Start Your Project
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </button>
                        </MagneticButton>

                        <MagneticButton strength={0.15}>
                            <button className="group w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-[#49e619]/50 text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3">
                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Schedule a Call
                            </button>
                        </MagneticButton>
                    </div>

                    {/* Trust Indicator */}
                    <p
                        ref={trustRef}
                        className="mt-8 sm:mt-10 text-xs sm:text-sm text-slate-500 flex flex-wrap items-center justify-center gap-3"
                    >
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#49e619]" />
                            No commitment required
                        </span>
                        <span className="hidden sm:inline text-slate-600">•</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#49e619]" />
                            Free consultation
                        </span>
                        <span className="hidden sm:inline text-slate-600">•</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#49e619]" />
                            Response within 24h
                        </span>
                    </p>
                </div>
            </div>

            {/* Custom CSS for gradient animation */}
            <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
        </section>
    );
}
