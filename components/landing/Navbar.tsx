"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Services", href: "#services" },
        { name: "Process", href: "#process" },
        { name: "Work", href: "#work" },
        { name: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100"
                    : "bg-white"
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image 
                            src="/DARK_LOGO.png" 
                            alt="KredoCode" 
                            width={120}
                            height={40}
                            className="w-auto h-8 md:h-10 object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="h-10 px-6 bg-black text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">
                            Get Quote
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden size-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
                    <div className="px-4 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 py-3 px-4 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="mt-3 h-12 px-6 bg-black text-white rounded-lg font-bold text-base hover:bg-slate-800 transition-colors">
                            Get Quote
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
