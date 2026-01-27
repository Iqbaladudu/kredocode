"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-white pt-16 md:pt-24 px-4 md:px-10 lg:px-20 relative overflow-hidden" id="contact">
            


            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 max-w-[1400px] mx-auto">
                {/* Left: CTA */}
                <div className="md:col-span-5 flex flex-col justify-between">
                    <div>
                         <h3 className="text-2xl font-bold mb-6">Let&apos;s build something legacy.</h3>
                         <a href="mailto:hello@kredocode.com" className="text-3xl md:text-5xl font-bold border-b-2 border-slate-900 hover:text-slate-600 transition-colors inline-block leading-tight break-all">
                            hello@kredocode.com
                        </a>
                    </div>
                    
                    <div className="mt-12 flex items-center gap-4">
                        <button className="h-14 px-8 bg-black text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                            Start a Project
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right: Links */}
                <div className="md:col-span-7 flex flex-wrap gap-12 md:gap-24 justify-start md:justify-end">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Socials</span>
                        <Link href="#" className="font-medium hover:underline">Instagram</Link>
                        <Link href="#" className="font-medium hover:underline">LinkedIn</Link>
                        <Link href="#" className="font-medium hover:underline">Twitter</Link>
                        <Link href="#" className="font-medium hover:underline">Behance</Link>
                    </div>

                     <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sitemap</span>
                        <Link href="#" className="font-medium hover:underline">Home</Link>
                        <Link href="#services" className="font-medium hover:underline">Services</Link>
                        <Link href="#work" className="font-medium hover:underline">Work</Link>
                        <Link href="#process" className="font-medium hover:underline">Process</Link>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal</span>
                        <Link href="#" className="font-medium hover:underline">Privacy Policy</Link>
                        <Link href="#" className="font-medium hover:underline">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <div className="w-full py-6 border-t border-slate-200 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center text-sm text-slate-500 max-w-[1400px] mx-auto text-center md:text-left">
                <p>&copy; 2024 KredoCode Agency. All rights reserved.</p>
                <p>Jakarta, Indonesia</p>
            </div>
        </footer>
    );
}
