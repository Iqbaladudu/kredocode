"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/landing-data";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Extended service data with colors and tags
const extendedServices = services.map((service, index) => ({
    ...service,
    color: [
        "#49e619", // Fullstack Dev - Brand Green
        "#3b82f6", // Mobile Apps - Blue
        "#8b5cf6", // Desktop Apps - Purple
        "#f59e0b", // AI & ML - Amber
        "#06b6d4", // IoT Solutions - Cyan
        "#ec4899", // E-commerce - Pink
        "#10b981", // LMS Platforms - Emerald
        "#f97316", // Travel Systems - Orange
    ][index],
    tags: [
        ["React", "Node.js", "Python"],
        ["iOS", "Android", "Flutter"],
        ["Electron", "Qt", "Native"],
        ["TensorFlow", "PyTorch", "OpenAI"],
        ["Arduino", "MQTT", "Edge"],
        ["Shopify", "WooCommerce", "Custom"],
        ["Moodle", "Canvas", "Custom"],
        ["API", "PMS", "GDS"],
    ][index],
    stat: [
        "150+ Projects",
        "50+ Apps",
        "30+ Software",
        "25+ Models",
        "40+ Devices",
        "100+ Stores",
        "20+ Platforms",
        "35+ Systems",
    ][index],
}));

export function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeCard, setActiveCard] = useState<number | null>(null);

    // Handle mouse move for spotlight effect
    const handleMouseMove = (e: React.MouseEvent, index: number) => {
        const card = e.currentTarget as HTMLElement;
        const rect = card.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setActiveCard(index);
    };

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const grid = gridRef.current;

        if (!section || !header || !grid) return;

        const ctx = gsap.context(() => {
            // Header animation with text reveal
            const headerElements = header.querySelectorAll(".header-anim");
            gsap.from(headerElements, {
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    once: true,
                },
            });

            // Grid cards with advanced stagger pattern
            const cards = grid.querySelectorAll(".service-card");

            // Set initial state for 3D transforms
            gsap.set(cards, {
                transformPerspective: 1200,
                transformOrigin: "center center",
            });

            // Stagger animation from center
            gsap.from(cards, {
                y: 100,
                opacity: 0,
                scale: 0.85,
                rotationX: -25,
                duration: 1,
                stagger: {
                    amount: 0.8,
                    from: "center",
                    grid: [2, 4],
                },
                ease: "power3.out",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                    once: true,
                },
            });

            // Icon animations
            const icons = grid.querySelectorAll(".service-icon");
            gsap.from(icons, {
                scale: 0,
                rotation: -180,
                duration: 0.8,
                stagger: {
                    amount: 0.6,
                    from: "center",
                },
                ease: "back.out(1.7)",
                delay: 0.3,
                scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                    once: true,
                },
            });

            // Tags animation
            const tags = grid.querySelectorAll(".service-tag");
            gsap.from(tags, {
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.03,
                delay: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                    once: true,
                },
            });

            // Cards are now static - no floating animation

            // Card hover animations
            cards.forEach((card) => {
                const cardEl = card as HTMLElement;
                const iconContainer = cardEl.querySelector(".icon-container");
                const arrowBtn = cardEl.querySelector(".arrow-btn");
                const statEl = cardEl.querySelector(".stat-badge");

                cardEl.addEventListener("mouseenter", () => {
                    gsap.to(cardEl, {
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(73, 230, 25, 0.15)",
                        duration: 0.4,
                        ease: "power2.out",
                    });

                    if (iconContainer) {
                        gsap.to(iconContainer, {
                            scale: 1.15,
                            rotation: 5,
                            duration: 0.4,
                            ease: "back.out(1.5)",
                        });
                    }

                    if (arrowBtn) {
                        gsap.to(arrowBtn, {
                            x: 0,
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }

                    if (statEl) {
                        gsap.to(statEl, {
                            scale: 1.05,
                            duration: 0.3,
                        });
                    }
                });

                cardEl.addEventListener("mouseleave", () => {
                    gsap.to(cardEl, {
                        y: 0,
                        scale: 1,
                        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)",
                    });

                    if (iconContainer) {
                        gsap.to(iconContainer, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.4,
                            ease: "power2.out",
                        });
                    }

                    if (arrowBtn) {
                        gsap.to(arrowBtn, {
                            x: 10,
                            opacity: 0,
                            duration: 0.3,
                        });
                    }

                    if (statEl) {
                        gsap.to(statEl, {
                            scale: 1,
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
            className="w-full py-24 md:py-32 px-4 md:px-10 lg:px-40 bg-white dark:bg-[#0f180c] relative overflow-hidden"
            id="services"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#49e619]/8 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#49e619]/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#49e619]/3 rounded-full blur-[200px]" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #49e619 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20 gap-8"
                >
                    <div className="max-w-2xl">
                        <div className="header-anim inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#49e619]/10 border border-[#49e619]/20 mb-6">
                            <Sparkles className="w-4 h-4 text-[#49e619]" />
                            <span className="text-[#49e619] text-xs font-bold uppercase tracking-wider">
                                Our Expertise
                            </span>
                        </div>
                        <h2 className="header-anim text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            Services We{" "}
                            <span className="relative">
                                <span className="text-[#49e619]">Deliver</span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 12"
                                    fill="none"
                                >
                                    <path
                                        d="M2 8C50 4 150 4 198 8"
                                        stroke="#49e619"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeDasharray="200"
                                        strokeDashoffset="200"
                                        className="animate-draw-line"
                                    />
                                </svg>
                            </span>
                        </h2>
                        <p className="header-anim text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
                            From concept to deployment, we craft digital solutions that scale with your business.
                            Our team of experts delivers excellence across every technology domain.
                        </p>
                    </div>

                    <a
                        href="#contact"
                        className="header-anim group flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-base hover:bg-[#49e619] hover:text-[#0f180c] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#49e619]/20"
                    >
                        Start a Project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Bento Grid Layout */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {extendedServices.map((service, index) => {
                        return (
                            <div
                                key={index}
                                className="service-card group relative rounded-3xl bg-slate-50 dark:bg-[#1a2c15] border border-slate-200 dark:border-[#2c4724] overflow-hidden cursor-pointer"
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                {/* Spotlight Effect */}
                                {activeCard === index && (
                                    <div
                                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${service.color}15, transparent 60%)`,
                                        }}
                                    />
                                )}

                                {/* Animated border gradient */}
                                <div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${service.color}20, transparent, ${service.color}10)`,
                                    }}
                                />

                                <div className="relative p-6 md:p-8 h-full flex flex-col min-h-[240px]">
                                    {/* Top Row: Icon + Stat */}
                                    <div className="flex items-start justify-between mb-6">
                                        {/* Icon Container */}
                                        <div
                                            className="icon-container service-icon relative"
                                        >
                                            <div
                                                className="size-14 md:size-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg"
                                                style={{
                                                    backgroundColor: `${service.color}15`,
                                                    boxShadow: `0 10px 30px -10px ${service.color}30`,
                                                }}
                                            >
                                                <service.icon
                                                    className="w-7 h-7 md:w-8 md:h-8"
                                                    style={{ color: service.color }}
                                                />
                                            </div>
                                            {/* Glow ring */}
                                            <div
                                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                                style={{ backgroundColor: `${service.color}30` }}
                                            />
                                        </div>

                                        {/* Stat Badge */}
                                        <div
                                            className="stat-badge px-3 py-1.5 rounded-full text-xs font-bold opacity-70 group-hover:opacity-100 transition-all duration-300"
                                            style={{
                                                backgroundColor: `${service.color}15`,
                                                color: service.color,
                                            }}
                                        >
                                            {service.stat}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3
                                            className="font-bold text-slate-900 dark:text-white mb-3 group-hover:translate-x-1 transition-transform duration-300 text-lg md:text-xl"
                                        >
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-sm">
                                            {service.description}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {service.tags?.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="service-tag px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#0f180c] border border-slate-200 dark:border-[#2c4724] text-slate-600 dark:text-slate-400 group-hover:border-slate-300 dark:group-hover:border-[#3d5a33] transition-colors duration-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Arrow Button */}
                                    <div
                                        className="arrow-btn absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-0 translate-x-4"
                                    >
                                        <div
                                            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                                            style={{
                                                backgroundColor: service.color,
                                            }}
                                        >
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Corner decoration */}
                                    <div
                                        className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at 100% 0%, ${service.color}, transparent 70%)`,
                                        }}
                                    />
                                </div>

                                {/* Animated border on hover */}
                                <div
                                    className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500"
                                    style={{
                                        boxShadow: `inset 0 0 0 2px transparent`,
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            boxShadow: `inset 0 0 0 2px ${service.color}30`,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        Can't find what you're looking for?{" "}
                        <a href="#contact" className="text-[#49e619] font-bold hover:underline">
                            Let's discuss your custom needs
                        </a>
                    </p>
                </div>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-line {
          animation: draw-line 1.5s ease-out forwards;
          animation-delay: 0.8s;
        }
      `}</style>
        </section>
    );
}
