"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Star, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "@/components/animations";
import { MagneticButton, TiltCard, GlowOrb, FloatingElements } from "@/components/animations";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function HeroAnimated() {
    const { isAnimationComplete } = usePageTransition();
    const sectionRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const socialProofRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const floatingCardRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!isAnimationComplete || hasAnimated) return;

        const section = sectionRef.current;
        const badge = badgeRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const buttons = buttonsRef.current;
        const socialProof = socialProofRef.current;
        const imageContainer = imageContainerRef.current;
        const floatingCard = floatingCardRef.current;
        const stats = statsRef.current;

        if (!section || !badge || !title || !desc || !buttons || !socialProof || !imageContainer || !floatingCard) return;

        // Set initial states
        gsap.set([badge, title, desc, buttons, socialProof], {
            opacity: 0,
            y: 50,
        });

        gsap.set(imageContainer, {
            opacity: 0,
            scale: 0.8,
            rotationY: -15,
        });

        gsap.set(floatingCard, {
            opacity: 0,
            y: 30,
            scale: 0.9,
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

        // Animate badge with glow effect
        tl.to(badge, {
            opacity: 1,
            y: 0,
            duration: 0.6,
        })
            // Animate title with split effect
            .to(title, {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, "-=0.3");

        // Split title text for character animation
        if (title) {
            const titleText = title.innerHTML;
            const words = titleText.split(" ");

            // Animate each word
            tl.fromTo(
                title,
                { opacity: 0.3, filter: "blur(10px)" },
                { opacity: 1, filter: "blur(0px)", duration: 0.8 },
                "-=0.5"
            );
        }

        // Animate description
        tl.to(desc, {
            opacity: 1,
            y: 0,
            duration: 0.6,
        }, "-=0.4")
            // Animate buttons with stagger
            .to(buttons.children, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.5,
            }, "-=0.3")
            // Animate image container with 3D effect
            .to(imageContainer, {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1,
                ease: "power2.out",
            }, "-=0.8")
            // Animate floating card
            .to(floatingCard, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
            }, "-=0.4")
            // Animate social proof
            .to(socialProof, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            }, "-=0.4");

        // Stats counter animation
        if (stats) {
            tl.to(stats.children, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.4,
            }, "-=0.3");
        }

        // Continuous floating animation for the image
        gsap.to(imageContainer, {
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1,
        });

        // Floating card pulse
        gsap.to(floatingCard, {
            y: "-=5",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5,
        });

        return () => {
            tl.kill();
        };
    }, [isAnimationComplete, hasAnimated]);

    // Mouse parallax effect for image
    useEffect(() => {
        const imageContainer = imageContainerRef.current;
        if (!imageContainer) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = imageContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = (e.clientX - centerX) / rect.width;
            const mouseY = (e.clientY - centerY) / rect.height;

            gsap.to(imageContainer, {
                rotationY: mouseX * 5,
                rotationX: mouseY * -5,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(imageContainer, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        imageContainer.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            imageContainer.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex justify-center py-16 md:py-28 px-4 md:px-10 lg:px-40 bg-[#f6f8f6] dark:bg-[#152111] overflow-hidden"
            style={{ perspective: "1000px" }}
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <GlowOrb
                    size={600}
                    color="#49e619"
                    blur={150}
                    className="absolute -top-40 -right-40 opacity-20"
                />
                <GlowOrb
                    size={400}
                    color="#49e619"
                    blur={120}
                    className="absolute bottom-0 -left-40 opacity-15"
                />
                <FloatingElements count={20} color="#49e619" className="opacity-30" />
            </div>

            <div className="w-full max-w-[1200px] flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
                {/* Left Content */}
                <div className="flex flex-col gap-6 lg:w-1/2 items-start">
                    {/* Badge */}
                    <div
                        ref={badgeRef}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#49e619]/30 bg-[#49e619]/10 text-[#49e619] text-xs font-bold uppercase tracking-wider backdrop-blur-sm group cursor-pointer hover:border-[#49e619]/60 transition-colors"
                    >
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        Software Development Agency
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white"
                    >
                        Scalable Software{" "}
                        <span className="text-[#49e619] relative">
                            Solutions
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
                                    className="animate-draw-line"
                                />
                            </svg>
                        </span>{" "}
                        for Enterprise
                    </h1>

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-lg"
                    >
                        We build robust, high-performance applications tailored to your
                        business needs using cutting-edge technology. From ideation to
                        deployment, we are your partners in digital transformation.
                    </p>

                    {/* Buttons */}
                    <div
                        ref={buttonsRef}
                        className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
                    >
                        <MagneticButton strength={0.2}>
                            <button className="h-14 px-8 bg-[#49e619] hover:bg-[#49e619]/90 text-[#152111] rounded-full font-bold text-base transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)] hover:shadow-[0_0_40px_rgba(73,230,25,0.6)] flex items-center gap-2 group">
                                Get Started
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </MagneticButton>
                        <MagneticButton strength={0.2}>
                            <button className="h-14 px-8 bg-transparent border-2 border-slate-300 dark:border-[#2c4724] text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#20321a] rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 group hover:border-[#49e619]/50">
                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                View Showreel
                            </button>
                        </MagneticButton>
                    </div>

                    {/* Stats */}
                    <div
                        ref={statsRef}
                        className="flex gap-8 mt-8 flex-wrap"
                    >
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-[#49e619]">150+</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Projects Delivered</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-[#49e619]">50+</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Happy Clients</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-[#49e619]">5+</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Years Experience</span>
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div
                        ref={socialProofRef}
                        className="flex items-center gap-4 mt-4 pt-8 border-t border-slate-200 dark:border-[#2c4724] w-full"
                    >
                        <div className="flex -space-x-3">
                            {[
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    className="size-10 rounded-full border-2 border-white dark:border-[#152111] bg-slate-200 overflow-hidden hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                                >
                                    <Image
                                        src={src}
                                        alt="User avatar"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            <div className="size-10 rounded-full border-2 border-white dark:border-[#152111] bg-[#49e619] text-[#152111] flex items-center justify-center text-xs font-bold pl-1">
                                5k+
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-yellow-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-current hover:scale-125 transition-transform"
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Trusted by 5,000+ businesses
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <TiltCard
                    tiltAmount={8}
                    className="lg:w-1/2"
                    glare
                >
                    <div
                        ref={imageContainerRef}
                        className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-[#2c4724] bg-slate-100 dark:bg-[#20321a]"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Glow backdrop */}
                        <div className="absolute inset-0 bg-[#49e619]/20 blur-[100px] rounded-full opacity-50" />

                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop"
                            alt="Team of developers working"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#152111]/80 via-transparent to-transparent" />

                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-[#49e619]/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />

                        {/* Floating Card */}
                        <div
                            ref={floatingCardRef}
                            className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors cursor-pointer group"
                        >
                            <div className="size-12 rounded-full bg-[#49e619] flex items-center justify-center text-[#152111] group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">Code Quality</p>
                                <p className="text-white/70 text-xs">99.9% Bug-free deployment</p>
                            </div>
                            <div className="ml-auto">
                                <div className="flex gap-1">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-[#49e619] animate-pulse"
                                            style={{ animationDelay: `${i * 0.2}s` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top-right badge */}
                        <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-[#49e619] text-[#152111] text-xs font-bold flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#152111] animate-pulse" />
                            Live Project
                        </div>
                    </div>
                </TiltCard>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes draw-line {
          from {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-line {
          animation: draw-line 1.5s ease-out forwards;
          animation-delay: 0.5s;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
        }
      `}</style>
        </section>
    );
}
