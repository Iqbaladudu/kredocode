"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-words";
import { HeroDecorations } from "./HeroDecorations";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
    const words = ["Dream App", "AI Solutions", "Digital Future", "Next Big Thing"];
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <AuroraBackground className="h-screen overflow-hidden">
            <div ref={containerRef} className="relative w-full h-full">
                {/* Decorative Background Elements */}
                <HeroDecorations />

                {/* Main Content with Parallax */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative flex flex-col items-center justify-center h-full gap-8 px-4 text-center z-10 max-w-6xl mx-auto"
                >
                    {/* Badge/Label - Simplified */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm"
                    >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-slate-700">
                            Crafting Digital Excellence Since 2020
                        </span>
                    </motion.div>

                    {/* Main Headline - Clean & Bold */}
                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.1]"
                        >
                            We Engineer Your{" "}
                            <br className="hidden md:block" />
                            <span className="relative inline-block mt-2">
                                <FlipWords words={words} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
                            </span>
                        </motion.h1>
                    </div>

                    {/* Subheadline - Clean */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative max-w-3xl"
                    >
                        <p className="text-xl md:text-2xl text-slate-600 font-normal leading-relaxed">
                            A full-service software house crafting{" "}
                            <span className="font-semibold text-slate-900">pixel-perfect</span>{" "}
                            Web, Mobile, and AI experiences for forward-thinking brands.
                        </p>
                    </motion.div>

                    {/* Feature Pills - Minimal */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        {[
                            { icon: Code2, text: "Clean Code" },
                            { icon: Zap, text: "Lightning Fast" },
                            { icon: Sparkles, text: "AI-Powered" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full"
                            >
                                <item.icon className="w-4 h-4 text-indigo-600" />
                                <span className="text-sm font-medium text-slate-700">{item.text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons - Refined */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4"
                    >
                        {/* Primary CTA - Clean Gradient */}
                        <Link href="#contact" className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300" />
                            <div className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-lg font-bold text-white gap-2 group-hover:scale-105 transition-transform duration-200">
                                Start Project
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Secondary CTA - Outlined */}
                        <Link
                            href="#portfolio"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-300 rounded-full text-lg font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300"
                        >
                            View Portfolio
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </motion.div>

                    {/* Trust Indicators - Simplified */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex items-center gap-6 mt-6 text-sm text-slate-500"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white"
                                    />
                                ))}
                            </div>
                            <span className="font-medium">100+ Happy Clients</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-slate-300" />
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="font-medium">5.0 Rating</span>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator - Minimal */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2"
                        >
                            <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </AuroraBackground>
    );
};
