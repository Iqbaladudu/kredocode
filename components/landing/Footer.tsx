"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const footerLinks = {
        company: [
            { name: "About Us", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Contact", href: "#" },
        ],
        services: [
            { name: "Web Development", href: "#" },
            { name: "Mobile Development", href: "#" },
            { name: "Cloud Solutions", href: "#" },
            { name: "AI & Data Science", href: "#" },
        ],
    };

    useEffect(() => {
        const footer = footerRef.current;
        const grid = gridRef.current;
        const bottom = bottomRef.current;

        if (!footer || !grid || !bottom) return;

        const ctx = gsap.context(() => {
            // Grid columns animation
            const columns = grid.querySelectorAll(".footer-column");
            gsap.from(columns, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footer,
                    start: "top 90%",
                    once: true,
                },
            });

            // Bottom bar animation
            gsap.from(bottom, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footer,
                    start: "top 85%",
                    once: true,
                },
            });

            // Social icons hover effect
            const socialIcons = footer.querySelectorAll(".social-icon");
            socialIcons.forEach((icon) => {
                icon.addEventListener("mouseenter", () => {
                    gsap.to(icon, {
                        scale: 1.2,
                        y: -3,
                        duration: 0.3,
                        ease: "back.out(1.7)",
                    });
                });
                icon.addEventListener("mouseleave", () => {
                    gsap.to(icon, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });
            });
        }, footer);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="w-full bg-slate-100 dark:bg-[#0c120a] border-t border-slate-200 dark:border-[#2c4724] pt-20 pb-8 px-4 md:px-10 lg:px-40 relative overflow-hidden"
            id="contact"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#49e619]/5 rounded-full blur-[150px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#49e619]/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="footer-column flex flex-col gap-5">
                        <div className="flex items-center gap-3 text-slate-900 dark:text-white group cursor-pointer">
                            <div className="size-10 text-[#49e619] group-hover:scale-110 transition-transform duration-300">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        clipRule="evenodd"
                                        d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    />
                                    <path
                                        clipRule="evenodd"
                                        d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">KredoCode</h2>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Software Agency</span>
                            </div>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Building the digital future with precision and passion. We transform ideas into scalable solutions.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-2">
                            {[
                                { icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                                { icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                                { icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                                { icon: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="social-icon w-10 h-10 rounded-full bg-white dark:bg-[#20321a] border border-slate-200 dark:border-[#2c4724] flex items-center justify-center text-slate-400 hover:text-[#49e619] hover:border-[#49e619]/50 transition-colors duration-300"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="footer-column flex flex-col gap-5">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg">Company</h3>
                        <div className="flex flex-col gap-3">
                            {footerLinks.company.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group text-slate-500 dark:text-slate-400 hover:text-[#49e619] text-sm transition-all duration-300 flex items-center gap-2"
                                >
                                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-300">
                                        <ArrowRight className="w-3 h-3 text-[#49e619]" />
                                    </span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services Links */}
                    <div className="footer-column flex flex-col gap-5">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg">Services</h3>
                        <div className="flex flex-col gap-3">
                            {footerLinks.services.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group text-slate-500 dark:text-slate-400 hover:text-[#49e619] text-sm transition-all duration-300 flex items-center gap-2"
                                >
                                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-300">
                                        <ArrowRight className="w-3 h-3 text-[#49e619]" />
                                    </span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-column flex flex-col gap-5">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg">Stay Updated</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Subscribe to our newsletter for the latest updates and insights.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#49e619] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-12 pl-11 pr-4 rounded-full bg-white dark:bg-[#20321a] border-2 border-slate-200 dark:border-[#2c4724] text-sm focus:outline-none focus:border-[#49e619] text-slate-900 dark:text-white transition-colors duration-300"
                                />
                            </div>
                            <button className="group h-12 px-6 bg-[#49e619] text-[#152111] rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#49e619]/30 hover:scale-105">
                                Subscribe
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-200/50 dark:border-[#2c4724]/50">
                            <a href="mailto:hello@kredocode.com" className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#49e619] transition-colors flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                hello@kredocode.com
                            </a>
                            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Jakarta, Indonesia
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    ref={bottomRef}
                    className="border-t border-slate-200 dark:border-[#2c4724] pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        © 2024 KredoCode. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-slate-500 dark:text-slate-400 hover:text-[#49e619] text-sm transition-colors relative group"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#49e619] group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
