"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { gsap } from "gsap";

interface TextRevealProps {
    text: string;
    className?: string;
    variant?: "reveal" | "typewriter" | "wave" | "glitch" | "scramble";
    duration?: number;
    staggerDelay?: number;
    onComplete?: () => void;
    autoPlay?: boolean;
    color?: string;
}

export interface TextRevealRef {
    play: () => void;
    reset: () => void;
}

// Characters for scramble effect
const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";

export const TextRevealAnimation = forwardRef<TextRevealRef, TextRevealProps>(
    (
        {
            text,
            className = "",
            variant = "reveal",
            duration = 0.8,
            staggerDelay = 0.03,
            onComplete,
            autoPlay = true,
            color,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const timelineRef = useRef<gsap.core.Timeline | null>(null);
        const scrambleIntervals = useRef<NodeJS.Timeout[]>([]);

        // Clean up scramble intervals
        const clearScrambleIntervals = () => {
            scrambleIntervals.current.forEach((interval) => clearInterval(interval));
            scrambleIntervals.current = [];
        };

        // Create character spans
        const createCharElements = () => {
            const container = containerRef.current;
            if (!container) return [];

            container.innerHTML = "";
            const chars: HTMLSpanElement[] = [];

            text.split("").forEach((char) => {
                const span = document.createElement("span");
                span.className = "inline-block";
                span.setAttribute("data-original", char);
                span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space for spaces
                span.style.display = "inline-block";
                if (color) span.style.color = color;
                container.appendChild(span);
                chars.push(span);
            });

            return chars;
        };

        // Reveal Animation - characters slide up with rotation
        const revealAnimation = (chars: HTMLSpanElement[]) => {
            gsap.set(chars, {
                y: 60,
                opacity: 0,
                rotateX: -90,
                transformOrigin: "center bottom"
            });

            const tl = gsap.timeline({
                onComplete,
            });

            tl.to(chars, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration,
                stagger: staggerDelay,
                ease: "power4.out",
            });

            return tl;
        };

        // Typewriter Animation
        const typewriterAnimation = (chars: HTMLSpanElement[]) => {
            gsap.set(chars, { opacity: 0 });

            const tl = gsap.timeline({
                onComplete,
            });

            chars.forEach((char, index) => {
                tl.to(
                    char,
                    {
                        opacity: 1,
                        duration: 0.05,
                    },
                    index * staggerDelay
                );
            });

            // Add blinking cursor effect
            const cursor = document.createElement("span");
            cursor.className = "inline-block w-0.5 h-[1em] bg-current ml-0.5 animate-pulse";
            containerRef.current?.appendChild(cursor);

            tl.add(() => {
                setTimeout(() => cursor.remove(), 1000);
            });

            return tl;
        };

        // Wave Animation - characters bounce up and down
        const waveAnimation = (chars: HTMLSpanElement[]) => {
            gsap.set(chars, { opacity: 1 });

            const tl = gsap.timeline({
                onComplete,
            });

            chars.forEach((char, index) => {
                tl.to(
                    char,
                    {
                        y: -20,
                        scale: 1.2,
                        color: color || "#FFD700",
                        duration: duration / 2,
                        ease: "power2.out",
                    },
                    index * staggerDelay
                );
                tl.to(
                    char,
                    {
                        y: 0,
                        scale: 1,
                        color: color || "inherit",
                        duration: duration / 2,
                        ease: "power2.in",
                    },
                    index * staggerDelay + duration / 2
                );
            });

            return tl;
        };

        // Glitch Animation
        const glitchAnimation = (chars: HTMLSpanElement[]) => {
            const tl = gsap.timeline({
                onComplete,
            });

            chars.forEach((char, index) => {
                const original = char.getAttribute("data-original") || "";

                // Initial hidden state
                gsap.set(char, { opacity: 0 });

                tl.add(() => {
                    char.style.opacity = "1";

                    // Glitch effect
                    let glitchCount = 0;
                    const maxGlitches = 5;

                    const glitchInterval = setInterval(() => {
                        if (glitchCount < maxGlitches) {
                            // Random color
                            char.style.color = Math.random() > 0.5 ? "#ff0040" : "#00ff90";
                            char.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)`;
                            char.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                            glitchCount++;
                        } else {
                            clearInterval(glitchInterval);
                            char.textContent = original === " " ? "\u00A0" : original;
                            char.style.color = color || "";
                            char.style.transform = "";
                        }
                    }, 50);

                    scrambleIntervals.current.push(glitchInterval);
                }, index * staggerDelay);
            });

            return tl;
        };

        // Scramble Animation - Matrix-style text reveal
        const scrambleAnimation = (chars: HTMLSpanElement[]) => {
            const tl = gsap.timeline({
                onComplete,
            });

            chars.forEach((char, index) => {
                const original = char.getAttribute("data-original") || "";
                gsap.set(char, { opacity: 1 });

                tl.add(() => {
                    let iterations = 0;
                    const maxIterations = 10;

                    const scrambleInterval = setInterval(() => {
                        if (iterations < maxIterations) {
                            char.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                            char.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
                            iterations++;
                        } else {
                            clearInterval(scrambleInterval);
                            char.textContent = original === " " ? "\u00A0" : original;
                            char.style.color = color || "";
                        }
                    }, 30);

                    scrambleIntervals.current.push(scrambleInterval);
                }, index * staggerDelay * 2);
            });

            return tl;
        };

        // Play animation
        const play = () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
            clearScrambleIntervals();

            const chars = createCharElements();
            if (chars.length === 0) return;

            switch (variant) {
                case "reveal":
                    timelineRef.current = revealAnimation(chars);
                    break;
                case "typewriter":
                    timelineRef.current = typewriterAnimation(chars);
                    break;
                case "wave":
                    timelineRef.current = waveAnimation(chars);
                    break;
                case "glitch":
                    timelineRef.current = glitchAnimation(chars);
                    break;
                case "scramble":
                    timelineRef.current = scrambleAnimation(chars);
                    break;
            }
        };

        // Reset animation
        const reset = () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
            clearScrambleIntervals();
            if (containerRef.current) {
                containerRef.current.innerHTML = text;
            }
        };

        // Expose methods via ref
        useImperativeHandle(ref, () => ({
            play,
            reset,
        }));

        // Auto-play on mount
        useEffect(() => {
            if (autoPlay) {
                play();
            } else {
                if (containerRef.current) {
                    containerRef.current.innerHTML = "";
                    text.split("").forEach((char) => {
                        const span = document.createElement("span");
                        span.className = "inline-block opacity-0";
                        span.textContent = char === " " ? "\u00A0" : char;
                        containerRef.current?.appendChild(span);
                    });
                }
            }

            return () => {
                if (timelineRef.current) {
                    timelineRef.current.kill();
                }
                clearScrambleIntervals();
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [text, variant, autoPlay]);

        return (
            <div
                ref={containerRef}
                className={`inline-block whitespace-pre-wrap ${className}`}
                style={{ perspective: "1000px" }}
            />
        );
    }
);

TextRevealAnimation.displayName = "TextRevealAnimation";
