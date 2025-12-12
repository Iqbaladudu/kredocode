"use client";

import { services } from "@/lib/landing-data";
import { ArrowRight } from "lucide-react";

export function Services() {
    return (
        <div className="w-full py-20 px-4 md:px-10 lg:px-40 bg-white dark:bg-[#0f180c]" id="services">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            What We Build
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Our comprehensive technology stack allows us to deliver end-to-end solutions for any platform.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="text-[#49e619] font-bold hover:underline flex items-center gap-1 group"
                    >
                        View all services
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl bg-slate-50 dark:bg-[#20321a] border border-slate-200 dark:border-[#2c4724] hover:border-[#49e619]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#49e619]/5"
                        >
                            <div className="size-12 rounded-full bg-white dark:bg-[#152111] flex items-center justify-center text-[#49e619] mb-4 group-hover:scale-110 transition-transform">
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {service.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
