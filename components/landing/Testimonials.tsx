"use client";

import { useState } from "react";
import { testimonials, trustedCompanies } from "@/lib/landing-data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Calculate visible cards based on screen size
    const getVisibleCards = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }
        return 1;
    };

    return (
        <div
            className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-40 bg-[#f6f8f6] dark:bg-[#152111] border-t border-slate-200/80 dark:border-[#2c4724]/60"
            id="testimonials"
        >
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6">
                    <div className="flex-1 max-w-xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                            Client Testimonials
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            Trusted by innovative companies worldwide. Here is what they have to say about our collaboration.
                        </p>
                    </div>
                    <div className="flex gap-2 self-start sm:self-auto shrink-0">
                        <button
                            onClick={prev}
                            className="size-9 sm:size-10 rounded-full border border-slate-300 dark:border-[#2c4724] flex items-center justify-center hover:bg-white dark:hover:bg-[#20321a] hover:border-[#49e619] active:scale-95 transition-all duration-200 text-slate-600 dark:text-slate-400"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            onClick={next}
                            className="size-9 sm:size-10 rounded-full border border-slate-300 dark:border-[#2c4724] flex items-center justify-center hover:bg-white dark:hover:bg-[#20321a] hover:border-[#49e619] active:scale-95 transition-all duration-200 text-slate-600 dark:text-slate-400"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel Indicators - Mobile Only */}
                <div className="flex sm:hidden justify-center gap-1.5 mb-4">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-6 bg-[#49e619]'
                                    : 'w-1.5 bg-slate-300 dark:bg-[#2c4724]'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Testimonials Carousel */}
                <div className="overflow-hidden pb-4 sm:pb-6 md:pb-8">
                    <div
                        className="flex gap-4 sm:gap-5 md:gap-6 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="min-w-full sm:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-16px)] bg-white dark:bg-[#20321a] p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-[#2c4724] shadow-sm hover:shadow-md dark:shadow-none hover:border-[#49e619]/30 transition-all duration-300 flex flex-col justify-between relative"
                            >
                                {/* Quote Mark */}
                                <div className="absolute top-3 sm:top-4 md:top-5 left-4 sm:left-5 md:left-6 text-4xl sm:text-5xl md:text-6xl text-[#49e619]/15 font-serif select-none leading-none">
                                    "
                                </div>

                                <div className="relative z-10">
                                    {/* Stars */}
                                    <div className="flex text-yellow-400 mb-4 sm:mb-5 md:mb-6 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-7 md:mb-8 leading-relaxed line-clamp-4 sm:line-clamp-none">
                                        {testimonial.quote}
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3 sm:gap-4 border-t border-slate-100 dark:border-[#2c4724]/60 pt-4 sm:pt-5 md:pt-6 mt-auto">
                                    <div className="size-10 sm:size-11 md:size-12 rounded-full bg-slate-200 overflow-hidden shrink-0 ring-2 ring-white dark:ring-[#152111]">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base truncate">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                                            {testimonial.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots - Tablet & Desktop */}
                <div className="hidden sm:flex justify-center gap-2 mt-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-[#49e619]'
                                    : 'w-2 bg-slate-300 dark:bg-[#2c4724] hover:bg-slate-400 dark:hover:bg-[#3d5a33]'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Trusted Companies */}
                <div className="mt-12 sm:mt-14 md:mt-16 pt-8 sm:pt-10 md:pt-12 border-t border-slate-200/50 dark:border-[#2c4724]/30">
                    <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-500 mb-6 sm:mb-8 uppercase tracking-wider font-medium">
                        Trusted by leading companies
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-4 sm:gap-y-6">
                        {trustedCompanies.map((company, index) => (
                            <div
                                key={index}
                                className="text-base sm:text-lg md:text-xl font-bold text-slate-400/80 dark:text-slate-500/80 hover:text-[#49e619] dark:hover:text-[#49e619] transition-colors duration-300 cursor-default"
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
