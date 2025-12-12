"use client";

import Link from "next/link";

export function Footer() {
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

    return (
        <footer
            className="w-full bg-slate-100 dark:bg-[#0c120a] border-t border-slate-200 dark:border-[#2c4724] pt-16 pb-8 px-4 md:px-10 lg:px-40"
            id="contact"
        >
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <div className="size-6 text-[#49e619]">
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
                            <h2 className="text-lg font-bold">KredoCode</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Building the digital future with precision and passion.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="text-slate-400 hover:text-[#49e619] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-[#49e619] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-[#49e619] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-900 dark:text-white font-bold">Company</h3>
                        <div className="flex flex-col gap-2">
                            {footerLinks.company.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-500 dark:text-slate-400 hover:text-[#49e619] text-sm transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-900 dark:text-white font-bold">Services</h3>
                        <div className="flex flex-col gap-2">
                            {footerLinks.services.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-500 dark:text-slate-400 hover:text-[#49e619] text-sm transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-900 dark:text-white font-bold">Newsletter</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Subscribe to our newsletter for latest updates.
                        </p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="h-10 px-4 rounded-full bg-white dark:bg-[#20321a] border border-slate-300 dark:border-[#2c4724] text-sm focus:outline-none focus:border-[#49e619] text-slate-900 dark:text-white"
                            />
                            <button className="h-10 px-4 bg-[#49e619] text-[#152111] rounded-full font-bold text-sm hover:bg-white transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-[#2c4724] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        © 2024 KredoCode. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="#"
                            className="text-slate-500 dark:text-slate-400 hover:text-[#49e619] text-sm transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-slate-500 dark:text-slate-400 hover:text-[#49e619] text-sm transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
