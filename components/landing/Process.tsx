"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/lib/landing-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const line = lineRef.current;
        const steps = stepsRef.current;

        if (!section || !title || !steps) return;

        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(title, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    once: true,
                },
            });

            // Connection line animation
            if (line) {
                gsap.fromTo(
                    line,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.5,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: steps,
                            start: "top 75%",
                            once: true,
                        },
                    }
                );
            }

            // Steps animation with stagger
            const stepElements = steps.querySelectorAll(".process-step");

            gsap.from(stepElements, {
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: steps,
                    start: "top 80%",
                    once: true,
                },
            });

            // Icon circle animation
            const iconCircles = steps.querySelectorAll(".icon-circle");

            gsap.from(iconCircles, {
                scale: 0,
                rotation: -180,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: steps,
                    start: "top 80%",
                    once: true,
                },
            });

            // Number badges pop animation
            const numberBadges = steps.querySelectorAll(".number-badge");

            gsap.from(numberBadges, {
                scale: 0,
                duration: 0.5,
                stagger: 0.2,
                delay: 0.3,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: steps,
                    start: "top 80%",
                    once: true,
                },
            });

            // Continuous floating animation for icons
            iconCircles.forEach((circle, index) => {
                gsap.to(circle, {
                    y: -8,
                    duration: 2 + index * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.2,
                });
            });

            // Hover effects
            stepElements.forEach((step) => {
                step.addEventListener("mouseenter", () => {
                    gsap.to(step, {
                        y: -10,
                        duration: 0.3,
                        ease: "power2.out",
                    });

                    const circle = step.querySelector(".icon-circle");
                    if (circle) {
                        gsap.to(circle, {
                            scale: 1.1,
                            boxShadow: "0 0 40px rgba(73, 230, 25, 0.4)",
                            duration: 0.3,
                        });
                    }
                });

                step.addEventListener("mouseleave", () => {
                    gsap.to(step, {
                        y: 0,
                        duration: 0.4,
                        ease: "elastic.out(1, 0.5)",
                    });

                    const circle = step.querySelector(".icon-circle");
                    if (circle) {
                        gsap.to(circle, {
                            scale: 1,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            duration: 0.3,
                        });
                    }
                });
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-24 px-4 md:px-10 lg:px-40 bg-[#f6f8f6] dark:bg-[#152111] border-t border-slate-200 dark:border-[#2c4724]/30 relative overflow-hidden"
            id="process"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#49e619]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#49e619]/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1200px] mx-auto text-center relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#49e619]/10 text-[#49e619] text-xs font-bold uppercase tracking-wider mb-4">
                        Our Process
                    </span>
                    <h2
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white"
                    >
                        How We <span className="text-[#49e619]">Work</span>
                    </h2>
                </div>

                <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connection Line */}
                    <div
                        ref={lineRef}
                        className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-transparent via-[#49e619] to-transparent z-0 origin-left"
                    >
                        {/* Animated dots on line */}
                        <div className="absolute inset-0 flex justify-around items-center">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-[#49e619] animate-pulse"
                                    style={{ animationDelay: `${i * 0.3}s` }}
                                />
                            ))}
                        </div>
                    </div>

                    {processSteps.map((step, index) => (
                        <div
                            key={step.number}
                            className="process-step relative z-10 flex flex-col items-center cursor-pointer"
                        >
                            {/* Icon Circle */}
                            <div className="icon-circle relative size-28 rounded-full bg-slate-100 dark:bg-[#20321a] border-4 border-white dark:border-[#152111] shadow-2xl flex items-center justify-center mb-6 group">
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-full bg-[#49e619]/0 group-hover:bg-[#49e619]/20 blur-xl transition-all duration-300" />

                                {/* Icon */}
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </span>

                                {/* Number Badge */}
                                <div className="number-badge absolute -top-2 -right-2 size-10 bg-[#49e619] rounded-full flex items-center justify-center text-[#152111] font-bold text-lg shadow-lg">
                                    {step.number}
                                </div>

                                {/* Rotating ring */}
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#49e619]/30 animate-spin-slow"
                                    style={{
                                        animationDuration: '20s',
                                        animationDelay: `${index * 0.5}s`
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#49e619] transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                                {step.description}
                            </p>

                            {/* Mobile connector */}
                            {index < processSteps.length - 1 && (
                                <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-[#49e619] to-transparent mt-6" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom animation keyframes */}
            <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </section>
    );
}
