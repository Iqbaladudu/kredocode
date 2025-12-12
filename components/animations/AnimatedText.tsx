"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
    children: string;
    type?: "chars" | "words" | "lines";
    animation?: "fadeUp" | "fadeIn" | "slideIn" | "scramble" | "typewriter" | "wave";
    stagger?: number;
    duration?: number;
    delay?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    triggerOnScroll?: boolean;
    onComplete?: () => void;
}

export function AnimatedText({
    children,
    type = "words",
    animation = "fadeUp",
    stagger = 0.03,
    duration = 0.6,
    delay = 0,
    className = "",
    as: Component = "div",
    triggerOnScroll = true,
    onComplete,
}: AnimatedTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || isAnimated) return;

        const text = children;
        let elements: string[] = [];

        // Split text based on type
        if (type === "chars") {
            elements = text.split("");
        } else if (type === "words") {
            elements = text.split(" ");
        } else {
            elements = [text];
        }

        // Generate HTML
        const html = elements
            .map((item, index) => {
                const content = item === " " || item === "" ? "&nbsp;" : item;
                const spacing = type === "words" && index < elements.length - 1 ? " " : "";
                return `<span class="inline-block overflow-hidden"><span class="animated-char inline-block" style="will-change: transform, opacity;">${content}${spacing}</span></span>`;
            })
            .join(type === "chars" ? "" : "");

        container.innerHTML = html;

        const chars = container.querySelectorAll(".animated-char");

        const ctx = gsap.context(() => {
            let animationVars: gsap.TweenVars = {};

            switch (animation) {
                case "fadeUp":
                    animationVars = {
                        y: 40,
                        opacity: 0,
                        rotationX: -45,
                    };
                    break;
                case "fadeIn":
                    animationVars = {
                        opacity: 0,
                        scale: 0.8,
                    };
                    break;
                case "slideIn":
                    animationVars = {
                        x: 50,
                        opacity: 0,
                    };
                    break;
                case "scramble":
                    // Special handling for scramble
                    break;
                case "typewriter":
                    animationVars = {
                        opacity: 0,
                        display: "none",
                    };
                    break;
                case "wave":
                    animationVars = {
                        y: 30,
                        opacity: 0,
                        rotationZ: 5,
                    };
                    break;
            }

            const scrollTriggerConfig = triggerOnScroll
                ? {
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        once: true,
                    },
                }
                : {};

            if (animation === "scramble") {
                // Scramble effect
                chars.forEach((char, index) => {
                    const originalText = char.textContent || "";
                    const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                    gsap.fromTo(
                        char,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 0.1,
                            delay: delay + index * stagger,
                            onStart: () => {
                                let iterations = 0;
                                const interval = setInterval(() => {
                                    char.textContent = chars[Math.floor(Math.random() * chars.length)];
                                    iterations++;
                                    if (iterations > 5) {
                                        char.textContent = originalText;
                                        clearInterval(interval);
                                    }
                                }, 30);
                            },
                            ...scrollTriggerConfig,
                        }
                    );
                });
            } else if (animation === "wave") {
                gsap.from(chars, {
                    ...animationVars,
                    duration,
                    stagger: {
                        each: stagger,
                        from: "start",
                    },
                    ease: "elastic.out(1, 0.5)",
                    delay,
                    ...scrollTriggerConfig,
                    onComplete: () => {
                        setIsAnimated(true);
                        onComplete?.();
                    },
                });
            } else {
                gsap.from(chars, {
                    ...animationVars,
                    duration,
                    stagger,
                    ease: "power3.out",
                    delay,
                    ...scrollTriggerConfig,
                    onComplete: () => {
                        setIsAnimated(true);
                        onComplete?.();
                    },
                });
            }
        });

        return () => {
            ctx.revert();
        };
    }, [children, type, animation, stagger, duration, delay, triggerOnScroll, isAnimated, onComplete]);

    return (
        <Component
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className={`${className}`}
            style={{ perspective: "1000px" }}
        >
            {children}
        </Component>
    );
}

// Animated Counter component
interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    delay?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
    triggerOnScroll?: boolean;
}

export function AnimatedCounter({
    from = 0,
    to,
    duration = 2,
    delay = 0,
    suffix = "",
    prefix = "",
    className = "",
    triggerOnScroll = true,
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);
    const valueRef = useRef({ value: from });

    useEffect(() => {
        const counter = counterRef.current;
        if (!counter) return;

        const ctx = gsap.context(() => {
            const scrollTriggerConfig = triggerOnScroll
                ? {
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 85%",
                        once: true,
                    },
                }
                : {};

            gsap.to(valueRef.current, {
                value: to,
                duration,
                delay,
                ease: "power2.out",
                ...scrollTriggerConfig,
                onUpdate: () => {
                    if (counter) {
                        const formattedValue = Math.round(valueRef.current.value).toLocaleString();
                        counter.textContent = `${prefix}${formattedValue}${suffix}`;
                    }
                },
            });
        });

        return () => ctx.revert();
    }, [from, to, duration, delay, suffix, prefix, triggerOnScroll]);

    return (
        <span ref={counterRef} className={className}>
            {prefix}{from}{suffix}
        </span>
    );
}

// Gradient Text Animation
interface GradientTextProps {
    children: string;
    className?: string;
    colors?: string[];
    animationDuration?: number;
}

export function GradientText({
    children,
    className = "",
    colors = ["#49e619", "#7fff00", "#32cd32", "#49e619"],
    animationDuration = 3,
}: GradientTextProps) {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        const gradient = colors.join(", ");
        text.style.backgroundImage = `linear-gradient(90deg, ${gradient})`;
        text.style.backgroundSize = "200% 100%";
        text.style.backgroundClip = "text";
        text.style.webkitBackgroundClip = "text";
        text.style.color = "transparent";

        const ctx = gsap.context(() => {
            gsap.to(text, {
                backgroundPosition: "-200% 0",
                duration: animationDuration,
                ease: "none",
                repeat: -1,
            });
        });

        return () => ctx.revert();
    }, [colors, animationDuration]);

    return (
        <span ref={textRef} className={className}>
            {children}
        </span>
    );
}
