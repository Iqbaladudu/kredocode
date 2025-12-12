"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Type definitions
type GSAPAnimation = gsap.core.Tween | gsap.core.Timeline;

interface UseScrollAnimationOptions {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
    once?: boolean;
}

interface UseSplitTextOptions {
    type?: "chars" | "words" | "lines";
    stagger?: number;
    duration?: number;
    ease?: string;
    y?: number;
    delay?: number;
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
    options: UseScrollAnimationOptions = {}
) {
    const elementRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<GSAPAnimation | null>(null);

    const {
        start = "top 80%",
        end = "bottom 20%",
        scrub = false,
        markers = false,
        toggleActions = "play none none none",
        once = true,
    } = options;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            animationRef.current = gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start,
                    end,
                    scrub,
                    markers,
                    toggleActions,
                    once,
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        });

        return () => ctx.revert();
    }, [start, end, scrub, markers, toggleActions, once]);

    return elementRef;
}

// Hook for staggered children animations
export function useStaggerAnimation(
    staggerDelay: number = 0.1,
    fromVars: gsap.TweenVars = { y: 40, opacity: 0 }
) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            gsap.from(container.children, {
                ...fromVars,
                stagger: staggerDelay,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    once: true,
                },
            });
        });

        return () => ctx.revert();
    }, [staggerDelay, fromVars]);

    return containerRef;
}

// Hook for text reveal animation (split text effect)
export function useSplitTextAnimation(options: UseSplitTextOptions = {}) {
    const textRef = useRef<HTMLElement>(null);

    const {
        type = "chars",
        stagger = 0.02,
        duration = 0.6,
        ease = "power3.out",
        y = 50,
        delay = 0,
    } = options;

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        const text = element.textContent || "";
        let html = "";

        if (type === "chars") {
            html = text
                .split("")
                .map(
                    (char) =>
                        `<span class="inline-block overflow-hidden"><span class="inline-block">${char === " " ? "&nbsp;" : char
                        }</span></span>`
                )
                .join("");
        } else if (type === "words") {
            html = text
                .split(" ")
                .map(
                    (word) =>
                        `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="inline-block">${word}</span></span>`
                )
                .join("");
        } else {
            html = `<span class="inline-block overflow-hidden"><span class="inline-block">${text}</span></span>`;
        }

        element.innerHTML = html;

        const innerSpans = element.querySelectorAll(
            "span > span"
        ) as NodeListOf<HTMLSpanElement>;

        const ctx = gsap.context(() => {
            gsap.from(innerSpans, {
                y,
                opacity: 0,
                duration,
                stagger,
                ease,
                delay,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    once: true,
                },
            });
        });

        return () => {
            ctx.revert();
            element.textContent = text;
        };
    }, [type, stagger, duration, ease, y, delay]);

    return textRef;
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            gsap.to(element, {
                yPercent: speed * 100,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, [speed]);

    return elementRef;
}

// Hook for magnetic effect (cursor following)
export function useMagneticEffect(strength: number = 0.3) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
            });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return elementRef;
}

// Hook for reveal on scroll (fade + slide)
export function useRevealOnScroll(
    direction: "up" | "down" | "left" | "right" = "up",
    distance: number = 60
) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const fromVars: gsap.TweenVars = { opacity: 0 };

        switch (direction) {
            case "up":
                fromVars.y = distance;
                break;
            case "down":
                fromVars.y = -distance;
                break;
            case "left":
                fromVars.x = distance;
                break;
            case "right":
                fromVars.x = -distance;
                break;
        }

        const ctx = gsap.context(() => {
            gsap.from(element, {
                ...fromVars,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    once: true,
                },
            });
        });

        return () => ctx.revert();
    }, [direction, distance]);

    return elementRef;
}

// Custom hook for creating GSAP timelines
export function useGSAPTimeline() {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const createTimeline = useCallback((vars?: gsap.TimelineVars) => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }
        timelineRef.current = gsap.timeline(vars);
        return timelineRef.current;
    }, []);

    useEffect(() => {
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);

    return { timeline: timelineRef.current, createTimeline };
}

// Utility function for quick animations
export const quickTo = (
    element: gsap.TweenTarget,
    property: string,
    vars: gsap.TweenVars = {}
) => {
    return gsap.quickTo(element, property, {
        duration: 0.4,
        ease: "power3.out",
        ...vars,
    });
};
