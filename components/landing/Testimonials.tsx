"use client";

import { testimonials } from "@/lib/landing-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Convert testimonials to format expected by InfiniteMovingCards
const sliderItems = testimonials.map(t => ({
    quote: t.quote,
    name: t.name,
    title: t.title,
    avatar: t.avatar, // Assuming we pass this prop or need to adjust the component
}));

export function Testimonials() {
    return (
        <section className="w-full py-24 bg-white border-t border-slate-100 overflow-hidden" id="testimonials">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 mb-16 text-center">
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    Trusted by Industry Leaders
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    We collaborate with visionary companies to build the future. 
                    Here is what they say about working with us.
                </p>
            </div>

            <div className="w-full relative flex flex-col antialiased bg-white items-center justify-center overflow-hidden">
                <InfiniteMovingCards
                    items={sliderItems}
                    direction="right"
                    speed="slow"
                />
                 <InfiniteMovingCards
                    items={sliderItems}
                    direction="left"
                    speed="slow"
                    className="mt-8"
                />
            </div>
            
            <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Simple logo text placeholders for now */}
                 {["Google", "Microsoft", "Amazon", "Netflix", "Uber"].map((logo, i) => (
                     <span key={i} className="text-2xl font-black text-slate-300 hover:text-black cursor-default transition-colors">
                        {logo}
                     </span>
                 ))}
            </div>
        </section>
    );
}
