"use client";

import { projects } from "@/lib/landing-data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Projects() {
    return (
        <div className="w-full py-20 px-4 md:px-10 lg:px-40 bg-white dark:bg-[#0f180c]" id="work">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
                    Featured Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#20321a] border border-slate-200 dark:border-[#2c4724] flex flex-col"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-[#152111]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#49e619] border border-[#49e619]/20">
                                    {project.category}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#49e619] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                                    {project.description}
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white hover:text-[#49e619] transition-colors gap-2 group/link"
                                >
                                    View Case Study
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
