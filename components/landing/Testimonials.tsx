"use client";

import { useEffect, useRef } from "react";
import { testimonials, trustedCompanies } from "@/lib/landing-data";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const swiperContainerRef = useRef<HTMLDivElement>(null);
    const companiesRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    // GSAP Animations
    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const swiperContainer = swiperContainerRef.current;
        const companies = companiesRef.current;

        if (!section || !header || !swiperContainer || !companies) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(header.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    once: true,
                },
            });

            // Swiper container reveal
            gsap.from(swiperContainer, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: swiperContainer,
                    start: "top 85%",
                    once: true,
                },
            });

            // Companies animation
            gsap.from(companies, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: companies,
                    start: "top 90%",
                    once: true,
                },
            });

            // Company logos stagger
            const companyLogos = companies.querySelectorAll(".company-logo");
            gsap.from(companyLogos, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: companies,
                    start: "top 85%",
                    once: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-40 bg-[#f6f8f6] dark:bg-[#152111] border-t border-slate-200/80 dark:border-[#2c4724]/60 relative overflow-hidden"
            id="testimonials"
        >
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#49e619]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#49e619]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-6"
                >
                    <div className="flex-1 max-w-xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#49e619]/10 text-[#49e619] text-xs font-bold uppercase tracking-wider mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                            Client <span className="text-[#49e619]">Stories</span>
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            Trusted by innovative companies worldwide. Here's what they have
                            to say about our collaboration.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 self-start sm:self-auto">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="group size-12 rounded-full border-2 border-slate-300 dark:border-[#2c4724] flex items-center justify-center hover:bg-[#49e619] hover:border-[#49e619] transition-all duration-300 text-slate-600 dark:text-slate-400 hover:text-[#152111]"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="group size-12 rounded-full border-2 border-slate-300 dark:border-[#2c4724] flex items-center justify-center hover:bg-[#49e619] hover:border-[#49e619] transition-all duration-300 text-slate-600 dark:text-slate-400 hover:text-[#152111]"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Swiper Testimonials */}
                <div ref={swiperContainerRef} className="pb-12">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            bulletClass: "swiper-pagination-bullet custom-bullet",
                            bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        className="testimonials-swiper"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial-card group bg-white dark:bg-[#20321a] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#2c4724] hover:border-[#49e619]/50 transition-all duration-500 flex flex-col justify-between h-full min-h-[320px] relative cursor-grab active:cursor-grabbing">
                                    {/* Hover Glow */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#49e619]/0 to-[#49e619]/0 group-hover:from-[#49e619]/10 group-hover:to-transparent rounded-2xl blur-lg transition-all duration-500 -z-10" />

                                    {/* Quote Icon */}
                                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                        <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#49e619]/20 group-hover:text-[#49e619]/40 transition-colors duration-300" />
                                    </div>

                                    <div className="relative z-10 flex-1">
                                        {/* Stars */}
                                        <div className="flex text-yellow-400 mb-6 gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 fill-current"
                                                />
                                            ))}
                                        </div>

                                        {/* Quote */}
                                        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg mb-8 leading-relaxed italic">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-4 border-t border-slate-100 dark:border-[#2c4724]/60 pt-6 mt-auto">
                                        <div className="relative">
                                            <div className="size-14 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white dark:ring-[#152111] group-hover:ring-[#49e619]/30 transition-all duration-300">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    width={56}
                                                    height={56}
                                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            {/* Online indicator */}
                                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#49e619] border-2 border-white dark:border-[#20321a]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-[#49e619] transition-colors duration-300">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {testimonial.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Trusted Companies */}
                <div
                    ref={companiesRef}
                    className="mt-8 pt-12 border-t border-slate-200/50 dark:border-[#2c4724]/30"
                >
                    <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-500 mb-8 uppercase tracking-wider font-medium">
                        Trusted by leading companies
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-6">
                        {trustedCompanies.map((company, index) => (
                            <div
                                key={index}
                                className="company-logo text-lg sm:text-xl md:text-2xl font-bold text-slate-400/70 dark:text-slate-500/70 hover:text-[#49e619] dark:hover:text-[#49e619] transition-all duration-300 cursor-pointer hover:scale-110"
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
        .testimonials-swiper {
          padding-bottom: 50px !important;
        }
        
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .custom-bullet {
          width: 10px !important;
          height: 10px !important;
          background: #2c4724 !important;
          opacity: 0.5 !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          margin: 0 6px !important;
        }
        
        .custom-bullet-active {
          width: 32px !important;
          border-radius: 5px !important;
          background: #49e619 !important;
          opacity: 1 !important;
        }
        
        .testimonials-swiper .swiper-slide {
          height: auto !important;
        }
        
        .testimonials-swiper .swiper-slide > div {
          height: 100%;
        }
      `}</style>
        </section>
    );
}
