"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { gsap } from "gsap";

// Context for animation state
type PageTransitionContextType = {
    isAnimationComplete: boolean;
    skipAnimation: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextType>({
    isAnimationComplete: false,
    skipAnimation: () => { },
});

export const usePageTransition = () => useContext(PageTransitionContext);

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const overlay = overlayRef.current;
        const logo = logoRef.current;
        const progress = progressRef.current;
        const text = textRef.current;
        const particles = particlesRef.current;

        if (!overlay || !logo || !progress || !text || !particles) return;

        // Create particle elements
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute rounded-full bg-[#49e619]";
            particle.style.width = `${Math.random() * 8 + 4}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = "0";
            particles.appendChild(particle);
        }

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimationComplete(true);
            },
        });

        // Initial state
        gsap.set(logo, { scale: 0, rotation: -180, opacity: 0 });
        gsap.set(progress, { scaleX: 0 });
        gsap.set(text, { y: 30, opacity: 0 });

        // Animate particles floating
        gsap.to(particles.children, {
            opacity: 0.6,
            y: -20,
            duration: 2,
            stagger: 0.05,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Main animation sequence
        tl.to(logo, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
        })
            .to(text, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            }, "-=0.3")
            .to(progress, {
                scaleX: 1,
                duration: 1.2,
                ease: "power2.inOut",
            }, "-=0.2")
            // Explosion effect
            .to(logo, {
                scale: 1.2,
                duration: 0.2,
                ease: "power2.in",
            })
            .to(particles.children, {
                scale: 2,
                opacity: 0,
                x: () => (Math.random() - 0.5) * 400,
                y: () => (Math.random() - 0.5) * 400,
                duration: 0.6,
                stagger: 0.02,
                ease: "power2.out",
            })
            .to(logo, {
                scale: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power3.in",
            }, "-=0.4")
            .to(text, {
                scale: 1.5,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            }, "-=0.5")
            .to(progress, {
                opacity: 0,
                duration: 0.2,
            }, "-=0.4")
            .to(overlay, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
            });

        return () => {
            tl.kill();
        };
    }, [isClient]);

    const skipAnimation = () => {
        gsap.killTweensOf("*");
        setIsAnimationComplete(true);
    };

    if (!isClient) {
        return null;
    }

    return (
        <PageTransitionContext.Provider value={{ isAnimationComplete, skipAnimation }}>
            {/* Loading Overlay */}
            {!isAnimationComplete && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d1a09] overflow-hidden"
                    onClick={skipAnimation}
                    style={{ cursor: "pointer" }}
                >
                    {/* Particles Container */}
                    <div ref={particlesRef} className="absolute inset-0" />

                    {/* Glow Effect */}
                    <div className="absolute w-[400px] h-[400px] bg-[#49e619]/20 rounded-full blur-[120px] animate-pulse" />

                    {/* Logo */}
                    <div ref={logoRef} className="relative z-10 mb-8">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#49e619] to-[#2a8a0e] flex items-center justify-center shadow-[0_0_60px_rgba(73,230,25,0.5)]">
                            <span className="text-4xl font-black text-[#0d1a09]">K</span>
                        </div>
                    </div>

                    {/* Text */}
                    <div ref={textRef} className="relative z-10 text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Kredo<span className="text-[#49e619]">Code</span>
                        </h1>
                        <p className="text-sm text-slate-400">Building Digital Excellence</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative z-10 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            ref={progressRef}
                            className="h-full bg-gradient-to-r from-[#49e619] to-[#7fff00] origin-left"
                        />
                    </div>

                    {/* Skip Text */}
                    <p className="absolute bottom-8 text-xs text-slate-600">
                        Click anywhere to skip
                    </p>
                </div>
            )}

            {/* Main Content */}
            <div
                className={`transition-opacity duration-300 ${isAnimationComplete ? "opacity-100" : "opacity-0"
                    }`}
            >
                {children}
            </div>
        </PageTransitionContext.Provider>
    );
}
