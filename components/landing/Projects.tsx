"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/landing-data";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const cardsContainer = cardsContainerRef.current;

        if (!section || !title || !cardsContainer) return;

        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(title.children, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    once: true,
                },
            });

            // Cards animation
            const cards = cardsContainer.querySelectorAll(".project-card");

            cards.forEach((card, index) => {
                const direction = index % 2 === 0 ? -1 : 1;

                gsap.from(card, {
                    x: direction * 100,
                    opacity: 0,
                    rotationY: direction * 10,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        once: true,
                    },
                });

                // Image parallax on scroll
                const image = card.querySelector(".project-image");
                if (image) {
                    gsap.to(image, {
                        yPercent: -15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    });
                }
            });

            // Card hover animations
            cards.forEach((card) => {
                const cardEl = card as HTMLElement;
                const image = cardEl.querySelector(".project-image");
                const content = cardEl.querySelector(".project-content");
                const overlay = cardEl.querySelector(".project-overlay");

                cardEl.addEventListener("mouseenter", () => {
                    gsap.to(cardEl, {
                        y: -12,
                        duration: 0.4,
                        ease: "power2.out",
                    });

                    if (image) {
                        gsap.to(image, {
                            scale: 1.1,
                            duration: 0.6,
                            ease: "power2.out",
                        });
                    }

                    if (overlay) {
                        gsap.to(overlay, {
                            opacity: 0.6,
                            duration: 0.3,
                        });
                    }
                });

                cardEl.addEventListener("mouseleave", () => {
                    gsap.to(cardEl, {
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)",
                    });

                    if (image) {
                        gsap.to(image, {
                            scale: 1,
                            duration: 0.6,
                            ease: "power2.out",
                        });
                    }

                    if (overlay) {
                        gsap.to(overlay, {
                            opacity: 0,
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
            className="w-full py-24 px-4 md:px-10 lg:px-40 bg-white dark:bg-[#0f180c] relative overflow-hidden"
            id="work"
            style={{ perspective: "1000px" }}
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 right-0 w-96 h-96 bg-[#49e619]/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-40 left-0 w-96 h-96 bg-[#49e619]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Header */}
                <div ref={titleRef} className="mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#49e619]/10 text-[#49e619] text-xs font-bold uppercase tracking-wider mb-4">
                        Our Work
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                            Featured <span className="text-[#49e619]">Projects</span>
                        </h2>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-[#49e619] font-bold text-lg hover:gap-3 transition-all group"
                        >
                            View All Projects
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Projects Grid */}
                <div
                    ref={cardsContainerRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card group rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#20321a] border border-slate-200 dark:border-[#2c4724] flex flex-col cursor-pointer relative"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Image Container */}
                            <div className="h-72 overflow-hidden relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="project-image object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#152111] via-transparent to-transparent" />

                                {/* Hover Overlay */}
                                <div className="project-overlay absolute inset-0 bg-[#49e619] opacity-0 mix-blend-overlay transition-opacity" />

                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 bg-[#152111]/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#49e619] border border-[#49e619]/20 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#49e619] animate-pulse" />
                                    {project.category}
                                </div>

                                {/* External Link Icon - appears on hover */}
                                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <ExternalLink className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                {/* Project Number */}
                                <div className="absolute bottom-4 left-6 text-white/20 text-6xl font-black">
                                    0{index + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="project-content p-8 flex flex-col flex-1 relative">
                                {/* Decorative line */}
                                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#49e619]/30 to-transparent" />

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#49e619] transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {["React", "Node.js", "PostgreSQL"].map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-[#152111] text-slate-600 dark:text-slate-400 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <a
                                    href="#"
                                    className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white hover:text-[#49e619] transition-colors gap-2 group/link w-fit"
                                >
                                    <span className="relative">
                                        View Case Study
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#49e619] group-hover/link:w-full transition-all duration-300" />
                                    </span>
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                                </a>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#49e619]/50 transition-colors duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
