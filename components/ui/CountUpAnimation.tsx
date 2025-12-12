"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { gsap } from "gsap";

interface CountUpProps {
    endValue: number;
    startValue?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    separator?: string;
    className?: string;
    onComplete?: () => void;
    autoPlay?: boolean;
    easing?: "linear" | "power1" | "power2" | "power3" | "power4" | "elastic" | "bounce";
    showGlow?: boolean;
    glowColor?: string;
}

export interface CountUpRef {
    play: () => void;
    reset: () => void;
    setEndValue: (value: number) => void;
}

export const CountUpAnimation = forwardRef<CountUpRef, CountUpProps>(
    (
        {
            endValue,
            startValue = 0,
            duration = 2,
            prefix = "",
            suffix = "",
            decimals = 0,
            separator = ",",
            className = "",
            onComplete,
            autoPlay = true,
            easing = "power2",
            showGlow = true,
            glowColor = "#FFD700",
        },
        ref
    ) => {
        const containerRef = useRef<HTMLSpanElement>(null);
        const valueRef = useRef({ value: startValue });
        const tweenRef = useRef<gsap.core.Tween | null>(null);
        const [currentValue, setCurrentValue] = useState(startValue);
        const [isAnimating, setIsAnimating] = useState(false);

        // Format number with separator and decimals
        const formatNumber = (num: number): string => {
            const fixed = num.toFixed(decimals);
            const parts = fixed.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
            return parts.join(".");
        };

        // Play animation
        const play = () => {
            if (tweenRef.current) {
                tweenRef.current.kill();
            }

            valueRef.current = { value: startValue };
            setIsAnimating(true);

            // Add entrance animation to container
            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
                );
            }

            tweenRef.current = gsap.to(valueRef.current, {
                value: endValue,
                duration,
                ease: `${easing}.out`,
                onUpdate: () => {
                    setCurrentValue(valueRef.current.value);
                },
                onComplete: () => {
                    setIsAnimating(false);
                    // Celebrate effect on completion
                    if (containerRef.current && showGlow) {
                        gsap.to(containerRef.current, {
                            scale: 1.1,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1,
                            ease: "power2.inOut",
                        });
                    }
                    onComplete?.();
                },
            });
        };

        // Reset animation
        const reset = () => {
            if (tweenRef.current) {
                tweenRef.current.kill();
            }
            valueRef.current = { value: startValue };
            setCurrentValue(startValue);
            setIsAnimating(false);
        };

        // Update end value
        const setEndValue = (value: number) => {
            if (tweenRef.current) {
                tweenRef.current.kill();
            }

            tweenRef.current = gsap.to(valueRef.current, {
                value: value,
                duration: duration / 2,
                ease: `${easing}.out`,
                onUpdate: () => {
                    setCurrentValue(valueRef.current.value);
                },
            });
        };

        // Expose methods via ref
        useImperativeHandle(ref, () => ({
            play,
            reset,
            setEndValue,
        }));

        // Auto-play on mount
        useEffect(() => {
            if (autoPlay) {
                play();
            }

            return () => {
                if (tweenRef.current) {
                    tweenRef.current.kill();
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <span
                ref={containerRef}
                className={`inline-block relative ${className}`}
                style={{
                    textShadow: showGlow && isAnimating
                        ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}40`
                        : undefined,
                    transition: "text-shadow 0.3s ease",
                }}
            >
                {prefix}
                <span className="tabular-nums">{formatNumber(currentValue)}</span>
                {suffix}
            </span>
        );
    }
);

CountUpAnimation.displayName = "CountUpAnimation";
