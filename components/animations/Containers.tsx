"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reveal Container - animates children on scroll
interface RevealContainerProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function RevealContainer({
  children,
  direction = "up",
  distance = 60,
  duration = 0.8,
  delay = 0,
  className = "",
  once = true,
}: RevealContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
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
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once,
        },
      });
    });

    return () => ctx.revert();
  }, [direction, distance, duration, delay, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Stagger Container - staggers children animations
interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  direction = "up",
  distance = 40,
  duration = 0.6,
  delay = 0,
  className = "",
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
      gsap.from(container.children, {
        ...fromVars,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [stagger, direction, distance, duration, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Scale on Hover - smooth scale animation on hover
interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export function ScaleOnHover({
  children,
  scale = 1.05,
  duration = 0.3,
  className = "",
}: ScaleOnHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scale, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Tilt Card - 3D tilt effect on hover
interface TiltCardProps {
  children: ReactNode;
  tiltAmount?: number;
  perspective?: number;
  scale?: number;
  duration?: number;
  className?: string;
  glare?: boolean;
}

export function TiltCard({
  children,
  tiltAmount = 10,
  perspective = 1000,
  scale = 1.02,
  duration = 0.3,
  className = "",
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glareElement = glareRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount;
      const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale,
        duration,
        ease: "power2.out",
      });

      if (glare && glareElement) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        gsap.to(glareElement, {
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      if (glare && glareElement) {
        gsap.to(glareElement, {
          background: "transparent",
          duration: 0.3,
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [tiltAmount, scale, duration, glare]);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{ borderRadius: "inherit" }}
        />
      )}
    </div>
  );
}

// Magnetic Button Effect
interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.4,
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={buttonRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

// Scroll Progress Indicator
interface ScrollProgressProps {
  color?: string;
  height?: number;
  className?: string;
}

export function ScrollProgress({
  color = "#0f172b",
  height = 3,
  className = "",
}: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={progressRef}
      className={`fixed top-0 left-0 right-0 z-50 origin-left ${className}`}
      style={{
        height,
        backgroundColor: color,
        transform: "scaleX(0)",
      }}
    />
  );
}
