"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Services", href: "#services" },
        { name: "Process", href: "#process" },
        { name: "Work", href: "#work" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#f6f8f6]/95 dark:bg-[#152111]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#2c4724]/60 shadow-sm dark:shadow-none">
            <div className="px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3 text-slate-900 dark:text-white transition-all duration-300 hover:opacity-80">
                    <div className="size-9 text-[#49e619] transition-transform duration-300 group-hover:scale-110">
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
                    <h2 className="text-lg font-bold leading-tight tracking-tight">KredoCode</h2>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                    <div className="flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#49e619] dark:hover:text-[#49e619] transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-[#49e619] after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <button className="group relative flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-[#49e619] text-[#152111] text-sm font-bold leading-normal tracking-wide shadow-lg shadow-[#49e619]/25 transition-all duration-300 hover:shadow-[#49e619]/40 hover:shadow-xl hover:scale-105">
                        <span className="relative z-10">Get Quote</span>
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#2c4724]/50 transition-colors duration-200"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#f6f8f6] dark:bg-[#1a2c15] border-t border-slate-200/80 dark:border-[#2c4724]/60 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-5 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#49e619] dark:hover:text-[#49e619] hover:bg-slate-100 dark:hover:bg-[#2c4724]/30 transition-all duration-200 py-3 px-4 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="w-full h-12 mt-2 px-6 bg-[#49e619] text-[#152111] hover:bg-[#3dd514] transition-all duration-300 text-sm font-bold rounded-full shadow-lg shadow-[#49e619]/25 hover:shadow-xl hover:shadow-[#49e619]/40">
                            Get Quote
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
