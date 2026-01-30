"use client";

import { useRef } from "react";
import { processSteps } from "@/lib/landing-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>(".process-step-card");
      const indicators = gsap.utils.toArray<HTMLElement>(".process-indicator");
      const totalSteps = steps.length;

      let mm = gsap.matchMedia();

      mm.add(
        {
          // Desktop
          isDesktop: "(min-width: 768px)",
          // Mobile
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };

          // SHARED / DESKTOP SETUP
          if (isDesktop) {
            // ... Existing Desktop Logic ...
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${totalSteps * 100}%`,
                pin: true,
                scrub: 1,
              },
            });

            // Initial states
            gsap.set(steps.slice(1), {
              yPercent: 120,
              opacity: 0,
              scale: 0.9,
              rotationX: 10,
            });
            gsap.set(steps[0], {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
            });

            steps.forEach((step, i) => {
              if (i === 0) return;
              const prevStep = steps[i - 1];

              tl.to(
                prevStep,
                {
                  scale: 0.9,
                  opacity: 0,
                  filter: "blur(10px)",
                  duration: 1,
                  ease: "power2.inOut",
                },
                `step-${i}`
              );

              tl.to(
                step,
                {
                  yPercent: 0,
                  opacity: 1,
                  scale: 1,
                  rotationX: 0,
                  duration: 1,
                  ease: "power2.out",
                },
                `step-${i}`
              );

              // Desktop Indicator Logic
              const currentInd = indicators[i];
              tl.to(currentInd, { opacity: 1, duration: 0.5 }, `step-${i}`);
              tl.to(
                currentInd.querySelector(".indicator-circle"),
                {
                  backgroundColor: "#000",
                  color: "#fff",
                  borderColor: "#000",
                  scale: 1.1,
                  duration: 0.5,
                },
                `step-${i}`
              );
              tl.to(
                currentInd.querySelector(".indicator-text"),
                { color: "#000", duration: 0.5 },
                `step-${i}`
              );

              if (i > 0) {
                const prevInd = indicators[i - 1];
                tl.to(prevInd, { opacity: 0.3, duration: 0.5 }, `step-${i}`);
                tl.to(
                  prevInd.querySelector(".indicator-circle"),
                  {
                    backgroundColor: "transparent",
                    color: "#94a3b8",
                    borderColor: "#cbd5e1",
                    scale: 1,
                    duration: 0.5,
                  },
                  `step-${i}`
                );
                tl.to(
                  prevInd.querySelector(".indicator-text"),
                  { color: "#94a3b8", duration: 0.5 },
                  `step-${i}`
                );
              }

              // Line Progress
              const totalProgressHeight = (i / (totalSteps - 1)) * 100;
              gsap.to(".progress-fill", {
                height: `${totalProgressHeight}%`,
                ease: "none",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top top",
                  end: `+=${(i / (totalSteps - 1)) * 100}%`,
                  scrub: 1,
                },
              });
            });

            // Initial Active
            const firstInd = indicators[0];
            gsap.set(firstInd, { opacity: 1 });
            gsap.set(firstInd.querySelector(".indicator-circle"), {
              backgroundColor: "#000",
              color: "#fff",
              borderColor: "#000",
              scale: 1.1,
            });
            gsap.set(firstInd.querySelector(".indicator-text"), {
              color: "#000",
            });
          }

          // MOBILE SETUP
          if (isMobile) {
            // Mobile Animation: Simpler stacking, no sidebar pinning
            // We pin the container but the layout is different
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top", // Lock when top of section hits top of view
                end: `+=${totalSteps * 80}%`, // Shorter scroll for mobile
                pin: true,
                scrub: 0.5, // Faster scrub for mobile feel
              },
            });

            // Initial states for mobile
            gsap.set(steps.slice(1), {
              yPercent: 120,
              opacity: 1,
              scale: 0.95,
            }); // Less opacity fade, more slide
            gsap.set(steps[0], { yPercent: 0, opacity: 1, scale: 1 });

            steps.forEach((step, i) => {
              if (i === 0) return;
              const prevStep = steps[i - 1];

              // Mobile Stacking
              tl.to(
                prevStep,
                {
                  scale: 0.9,
                  opacity: 0.5,
                  filter: "blur(5px)",
                  duration: 1,
                },
                `step-${i}`
              );

              tl.to(
                step,
                {
                  yPercent: 0,
                  scale: 1,
                  duration: 1,
                  ease: "power2.out",
                },
                `step-${i}`
              );

              // Mobile Indicator (Simple counter or bar) update could go here if implemented in DOM
            });
          }
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      className="w-full bg-slate-50 relative"
      id="process"
    >
      <div
        ref={containerRef}
        className="h-screen w-full flex flex-col md:flex-row md:justify-center mx-auto overflow-hidden relative py-6 md:py-8 px-4 md:px-10 lg:px-20"
      >
        {/* HEADLINE: Mobile Only */}
        <div className="md:hidden pb-6 relative z-20">
          <span className="text-black font-bold uppercase tracking-wider mb-8">
            How We Work
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
            Our Proven <br />
            <span className="text-slate-300">Process.</span>
          </h2>
        </div>

        {/* LEFT COLUMN: Desktop Only Indicators */}
        <div className="hidden md:flex md:w-1/3 flex-col justify-center h-full relative z-20 py-6 pl-4">
          <span className="text-black font-bold uppercase tracking-wider mb-5 text-xl">
            How We Work
          </span>
          <h2 className="text-5xl md:text-8xl font-extrabold text-slate-900 mb-10 leading-[1.1] tracking-tighter">
            Our Proven <br />
            <span className="text-slate-300">Process.</span>
          </h2>

          {/* Lateral Indicators */}
          <div
            ref={indicatorRef}
            className="flex-col gap-10 relative pl-4 hidden md:flex"
          >
            {/* <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-slate-100">
              <div className="progress-fill w-full bg-black h-0 origin-top" />
            </div> */}
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="process-indicator flex items-center gap-6 text-slate-400 transition-all duration-300 opacity-30 z-10 cursor-pointer"
              >
                <div className="indicator-circle w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-sm font-bold transition-all duration-500">
                  0{index + 1}
                </div>
                <span className="indicator-text text-3xl font-extrabold tracking-tight transition-all duration-500">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Stacking Cards (Desktop & Mobile) */}
        {/* On mobile, this takes full width/height. On Desktop, it's 2/3 */}
        <div
          ref={wrapperRef}
          className="w-full md:w-2/3 flex-1 relative flex items-center justify-center perspective-[2000px] md:h-full h-fit"
        >
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "process-step-card absolute inset-4 md:inset-6 w-auto md:max-w-2xl bg-[#0a0a0a] rounded-3xl md:rounded-4xl border border-white/10 shadow-2xl p-5 md:p-8 flex flex-col justify-between origin-bottom",
                // Use explicit height constraints to prevent overflow
                "max-h-[450px]  md:max-h-[550px] md:m-auto"
              )}
              style={{
                zIndex: index + 10,
              }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4 md:mb-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 border border-white/10 text-white flex items-center justify-center text-2xl md:text-3xl backdrop-blur-md">
                  {step.icon}
                </div>
                <div className="text-right">
                  <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
                    Step
                  </span>
                  <span className="block text-4xl md:text-5xl font-black text-white leading-none">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex-1 flex flex-col justify-center mb-10">
                <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-base md:text-xl text-white/60 leading-relaxed font-normal line-clamp-4 md:line-clamp-none">
                  {step.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-6 md:pt-8 border-t border-white/10 mt-auto">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/40 mb-3 block">
                  Key Deliverables
                </span>
                <div className="flex flex-wrap gap-2">
                  {(index === 0
                    ? ["Market Analysis", "User Personas", "Roadmap"]
                    : index === 1
                      ? ["UI/UX Design", "Frontend Dev", "API Integration"]
                      : ["QA Testing", "Cloud Deploy", "Monitoring"]
                  ).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-white/80 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}
