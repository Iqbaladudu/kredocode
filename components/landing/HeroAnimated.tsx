"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "@/components/animations";
import { MagneticButton, TiltCard } from "@/components/animations";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function HeroAnimated() {
    const { isAnimationComplete } = usePageTransition();
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!isAnimationComplete || hasAnimated) return;

        const section = sectionRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const buttons = buttonsRef.current;
        const imageContainer = imageContainerRef.current;
        const stats = statsRef.current;

        if (!section || !title || !desc || !buttons || !imageContainer) return;

        // Set initial states
        gsap.set([title, desc, buttons], {
            opacity: 0,
            y: 30,
        });

        gsap.set(imageContainer, {
            opacity: 0,
            scale: 0.95,
        });

        if (stats) {
            gsap.set(stats.children, {
                opacity: 0,
                y: 20,
            });
        }

        // Create master timeline
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => setHasAnimated(true),
        });

        // Animate title
        tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
        })
            // Animate description
            .to(desc, {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, "-=0.6")
            // Animate buttons
            .to(buttons.children, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
            }, "-=0.4")
            // Animate image container
            .to(imageContainer, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
            }, "-=0.8");

        // Stats counter animation
        if (stats) {
            tl.to(stats.children, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
            }, "-=0.6");
        }

        return () => {
            tl.kill();
        };
    }, [isAnimationComplete, hasAnimated]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex justify-center py-16 md:py-32 px-4 md:px-10 lg:px-20 bg-white overflow-hidden"
        >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-black animate-grid opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent" />
                {/* Radial mask for vignette effect */}
                <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-center gap-12 md:gap-24 relative z-10">
                {/* Left Content */}
                <div className="flex flex-col gap-6 md:gap-8 lg:w-1/2 items-start text-center lg:text-left">
                    
                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900"
                    >
                        Building Digital <br />
                        <span className="relative inline-block">
                             Excellence
                             <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-3 bg-black/5 -z-10 transform -rotate-1 rounded-sm"></span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-slate-600 text-base md:text-xl leading-relaxed max-w-lg font-medium mx-auto lg:mx-0"
                    >
                        We craft premium software solutions that empower your business. 
                        Minimalist design, maximum performance.
                    </p>

                    {/* Buttons */}
                    <div
                        ref={buttonsRef}
                        className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto justify-center lg:justify-start"
                    >
                        <MagneticButton strength={0.3}>
                            <button className="h-12 md:h-14 px-8 md:px-10 bg-black text-white rounded-full font-semibold text-sm md:text-base transition-all hover:bg-slate-800 flex items-center justify-center gap-2 group shadow-xl shadow-black/10 w-full sm:w-auto">
                                Start a Project
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </MagneticButton>
                        <MagneticButton strength={0.3}>
                            <button className="h-12 md:h-14 px-8 md:px-10 bg-white border border-slate-200 text-slate-900 rounded-full font-semibold text-sm md:text-base transition-all hover:bg-slate-50 flex items-center justify-center gap-2 group hover:border-slate-300 w-full sm:w-auto">
                                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                Showreel
                            </button>
                        </MagneticButton>
                    </div>

                    {/* Stats */}
                    <div
                        ref={statsRef}
                        className="flex flex-wrap gap-8 md:gap-12 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-100 w-full justify-center lg:justify-start"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-slate-900">150+</span>
                            <span className="text-sm font-medium text-slate-500">Projects Done</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-slate-900">98%</span>
                            <span className="text-sm font-medium text-slate-500">Client Satisfaction</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-slate-900">24/7</span>
                            <span className="text-sm font-medium text-slate-500">Support</span>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <TiltCard
                    tiltAmount={5}
                    className="lg:w-1/2 w-full"
                >
                    <div
                        ref={imageContainerRef}
                        className="relative w-full aspect-square md:aspect-5/4 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200"
                    >
                         <Image
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Modern office architecture"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    </div>
                </TiltCard>
            </div>
        </section>
    );
}
