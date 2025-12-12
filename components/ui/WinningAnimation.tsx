"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { gsap } from "gsap";

// Types
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    gravity: number;
    opacity: number;
    type: "confetti" | "sparkle" | "star";
}

interface WinningAnimationProps {
    duration?: number;
    colors?: string[];
    particleCount?: number;
    message?: string;
    subMessage?: string;
    onComplete?: () => void;
    className?: string;
}

export interface WinningAnimationRef {
    play: () => void;
    stop: () => void;
}

// Premium Color Palette
const defaultColors = [
    "#FFD700", // Gold
    "#FF6B6B", // Coral Red
    "#4ECDC4", // Teal
    "#A855F7", // Purple
    "#3B82F6", // Blue
    "#F97316", // Orange
    "#10B981", // Emerald
    "#EC4899", // Pink
    "#FBBF24", // Amber
    "#8B5CF6", // Violet
];

export const WinningAnimation = forwardRef<WinningAnimationRef, WinningAnimationProps>(
    (
        {
            duration = 5000,
            colors = defaultColors,
            particleCount = 150,
            message = "🎉 Congratulations! 🎉",
            subMessage = "You've achieved something amazing!",
            onComplete,
            className = "",
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const particlesRef = useRef<Particle[]>([]);
        const animationFrameRef = useRef<number>(0);
        const isAnimatingRef = useRef(false);
        const messageRef = useRef<HTMLDivElement>(null);
        const overlayRef = useRef<HTMLDivElement>(null);
        const starsContainerRef = useRef<HTMLDivElement>(null);
        const timelineRef = useRef<gsap.core.Timeline | null>(null);

        // Create random particle
        const createParticle = (canvasWidth: number, canvasHeight: number): Particle => {
            const types: Particle["type"][] = ["confetti", "sparkle", "star"];
            const type = types[Math.floor(Math.random() * types.length)];

            return {
                x: Math.random() * canvasWidth,
                y: -20 - Math.random() * 100,
                vx: (Math.random() - 0.5) * 8,
                vy: Math.random() * 4 + 2,
                size: type === "star" ? Math.random() * 15 + 10 : Math.random() * 12 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.15,
                opacity: 1,
                type,
            };
        };

        // Draw particle based on type
        const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.translate(particle.x, particle.y);
            ctx.rotate((particle.rotation * Math.PI) / 180);

            switch (particle.type) {
                case "confetti":
                    // Rectangle confetti
                    ctx.fillStyle = particle.color;
                    ctx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
                    break;

                case "sparkle":
                    // Diamond sparkle
                    ctx.fillStyle = particle.color;
                    ctx.beginPath();
                    ctx.moveTo(0, -particle.size / 2);
                    ctx.lineTo(particle.size / 4, 0);
                    ctx.lineTo(0, particle.size / 2);
                    ctx.lineTo(-particle.size / 4, 0);
                    ctx.closePath();
                    ctx.fill();
                    break;

                case "star":
                    // 5-point star
                    ctx.fillStyle = particle.color;
                    drawStar(ctx, 0, 0, 5, particle.size / 2, particle.size / 4);
                    break;
            }

            ctx.restore();
        };

        // Draw 5-point star
        const drawStar = (
            ctx: CanvasRenderingContext2D,
            cx: number,
            cy: number,
            spikes: number,
            outerRadius: number,
            innerRadius: number
        ) => {
            let rot = (Math.PI / 2) * 3;
            let x = cx;
            let y = cy;
            const step = Math.PI / spikes;

            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);

            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }

            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fill();
        };

        // Animation loop
        const animate = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx || !isAnimatingRef.current) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, index) => {
                // Update physics
                particle.vy += particle.gravity;
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation += particle.rotationSpeed;

                // Wind effect
                particle.vx += (Math.random() - 0.5) * 0.1;

                // Fade out near bottom
                if (particle.y > canvas.height - 100) {
                    particle.opacity -= 0.02;
                }

                // Draw particle
                if (particle.opacity > 0) {
                    drawParticle(ctx, particle);
                }

                // Reset particle if completely faded or off-screen
                if (particle.opacity <= 0 || particle.y > canvas.height + 50) {
                    particlesRef.current[index] = createParticle(canvas.width, canvas.height);
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Initialize canvas particles
        const initParticles = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            particlesRef.current = [];
            for (let i = 0; i < particleCount; i++) {
                // Stagger the initial y positions for a cascade effect
                const particle = createParticle(canvas.width, canvas.height);
                particle.y = -Math.random() * canvas.height;
                particlesRef.current.push(particle);
            }
        };

        // Create floating stars in the background
        const createFloatingStars = () => {
            if (!starsContainerRef.current) return;

            starsContainerRef.current.innerHTML = "";

            for (let i = 0; i < 20; i++) {
                const star = document.createElement("div");
                star.className = "absolute text-2xl sm:text-4xl";
                star.innerHTML = ["✨", "⭐", "🌟", "💫"][Math.floor(Math.random() * 4)];
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.opacity = "0";
                starsContainerRef.current.appendChild(star);

                gsap.to(star, {
                    opacity: 1,
                    scale: 1.5,
                    duration: 0.5,
                    delay: Math.random() * 0.5,
                    ease: "power2.out",
                });

                gsap.to(star, {
                    y: -100 + Math.random() * -200,
                    x: (Math.random() - 0.5) * 200,
                    opacity: 0,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    delay: 0.5 + Math.random() * 0.5,
                    ease: "power1.out",
                });
            }
        };

        // GSAP Text Animation
        const animateText = () => {
            if (!messageRef.current) return;

            // Kill previous timeline if exists
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            const tl = gsap.timeline();
            timelineRef.current = tl;

            // Split message into characters for staggered animation
            const mainText = messageRef.current.querySelector(".main-message");
            const subText = messageRef.current.querySelector(".sub-message");
            const celebration = messageRef.current.querySelector(".celebration-icon");

            if (celebration) {
                tl.fromTo(
                    celebration,
                    { scale: 0, rotation: -180 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    }
                );

                // Continuous pulsing animation
                gsap.to(celebration, {
                    scale: 1.1,
                    duration: 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                });
            }

            if (mainText) {
                tl.fromTo(
                    mainText,
                    { y: 100, opacity: 0, scale: 0.5 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "elastic.out(1, 0.5)",
                    },
                    "-=0.3"
                );
            }

            if (subText) {
                tl.fromTo(
                    subText,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );
            }
        };

        // Play animation
        const play = () => {
            if (isAnimatingRef.current) return;

            isAnimatingRef.current = true;

            // Show overlay
            if (overlayRef.current) {
                gsap.set(overlayRef.current, { display: "flex" });
                gsap.fromTo(
                    overlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3 }
                );
            }

            // Initialize and start canvas animation
            initParticles();
            animate();

            // Create floating stars
            createFloatingStars();

            // Animate text
            animateText();

            // Auto-stop after duration
            setTimeout(() => {
                stop();
            }, duration);
        };

        // Stop animation
        const stop = () => {
            isAnimatingRef.current = false;
            cancelAnimationFrame(animationFrameRef.current);

            // Fade out overlay
            if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (overlayRef.current) {
                            gsap.set(overlayRef.current, { display: "none" });
                        }
                        onComplete?.();
                    },
                });
            }

            // Kill timeline
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };

        // Expose methods via ref
        useImperativeHandle(ref, () => ({
            play,
            stop,
        }));

        // Handle resize
        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const handleResize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                cancelAnimationFrame(animationFrameRef.current);
                if (timelineRef.current) {
                    timelineRef.current.kill();
                }
            };
        }, []);

        return (
            <div ref={containerRef} className={className}>
                {/* Full-screen overlay */}
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] hidden flex-col items-center justify-center"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.95) 100%)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {/* Canvas for particles */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 pointer-events-none"
                    />

                    {/* Floating stars container */}
                    <div
                        ref={starsContainerRef}
                        className="absolute inset-0 pointer-events-none overflow-hidden"
                    />

                    {/* Glowing background orbs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "0.5s" }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
                    </div>

                    {/* Message content */}
                    <div
                        ref={messageRef}
                        className="relative z-10 text-center px-4"
                    >
                        {/* Trophy/Celebration Icon */}
                        <div className="celebration-icon text-7xl sm:text-9xl mb-6">
                            🏆
                        </div>

                        {/* Main Message */}
                        <h1 className="main-message text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mb-4 drop-shadow-2xl">
                            {message}
                        </h1>

                        {/* Sub Message */}
                        <p className="sub-message text-lg sm:text-2xl text-white/80 font-medium max-w-2xl mx-auto">
                            {subMessage}
                        </p>

                        {/* Decorative line */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="text-amber-400 text-2xl">✦</div>
                            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
                        </div>
                    </div>

                    {/* Click to close hint */}
                    <button
                        onClick={stop}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm hover:text-white/80 transition-colors cursor-pointer"
                    >
                        Click anywhere to close
                    </button>
                </div>
            </div>
        );
    }
);

WinningAnimation.displayName = "WinningAnimation";
