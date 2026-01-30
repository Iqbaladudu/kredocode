"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Floating decorative elements
interface FloatingElementsProps {
  count?: number;
  color?: string;
  className?: string;
}

export function FloatingElements({
  count = 15,
  color = "#0f172b",
  className = "",
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing elements
    container.innerHTML = "";

    // Create floating elements
    for (let i = 0; i < count; i++) {
      const element = document.createElement("div");
      const size = Math.random() * 6 + 2;
      const isCircle = Math.random() > 0.5;

      element.style.position = "absolute";
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.borderRadius = isCircle ? "50%" : "2px";
      element.style.backgroundColor = color;
      element.style.opacity = `${Math.random() * 0.4 + 0.1}`;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.transform = `rotate(${Math.random() * 360}deg)`;

      container.appendChild(element);
    }

    const ctx = gsap.context(() => {
      gsap.to(container.children, {
        y: () => (Math.random() - 0.5) * 100,
        x: () => (Math.random() - 0.5) * 50,
        rotation: () => Math.random() * 360,
        duration: () => Math.random() * 5 + 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "random",
        },
      });
    });

    return () => ctx.revert();
  }, [count, color]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
}

// Particle Field with mouse interaction
interface ParticleFieldProps {
  particleCount?: number;
  color?: string;
  mouseInteraction?: boolean;
  className?: string;
}

export function ParticleField({
  particleCount = 30,
  color = "#0f172b",
  mouseInteraction = true,
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (mouseInteraction) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particlesRef.current.forEach((particle) => {
        // Mouse repulsion
        if (mouseInteraction) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.5;
            particle.vy += (dy / distance) * force * 0.5;
          }
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.globalAlpha = (1 - distance / 100) * 0.3;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (mouseInteraction) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationId);
    };
  }, [particleCount, color, mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
    />
  );
}

// Animated glow orb
interface GlowOrbProps {
  size?: number;
  color?: string;
  blur?: number;
  pulseSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function GlowOrb({
  size = 400,
  color = "#0f172b",
  blur = 120,
  pulseSpeed = 2,
  className = "",
  style = {},
}: GlowOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const ctx = gsap.context(() => {
      gsap.to(orb, {
        scale: 1.2,
        opacity: 0.6,
        duration: pulseSpeed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [pulseSpeed]);

  return (
    <div
      ref={orbRef}
      className={`rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity: 0.4,
        ...style,
      }}
    />
  );
}

// Animated Grid Background
interface AnimatedGridProps {
  gridSize?: number;
  color?: string;
  className?: string;
}

export function AnimatedGrid({
  gridSize = 50,
  color = "#0f172b",
  className = "",
}: AnimatedGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = svg.querySelectorAll("line");

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        opacity: 0,
        strokeDashoffset: 100,
        duration: 1,
        stagger: {
          each: 0.02,
          from: "center",
          grid: "auto",
        },
        ease: "power2.out",
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          once: true,
        },
      });

      // Subtle pulse animation
      gsap.to(lines, {
        opacity: 0.1,
        duration: 2,
        stagger: {
          each: 0.05,
          from: "random",
          repeat: -1,
          yoyo: true,
        },
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  const numLines = 20;

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.2 }}
    >
      {/* Horizontal lines */}
      {Array.from({ length: numLines }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={`${(i / numLines) * 100}%`}
          x2="100%"
          y2={`${(i / numLines) * 100}%`}
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="5,5"
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: numLines }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={`${(i / numLines) * 100}%`}
          y1="0"
          x2={`${(i / numLines) * 100}%`}
          y2="100%"
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="5,5"
        />
      ))}
    </svg>
  );
}
