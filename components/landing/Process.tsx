"use client";

import { processSteps } from "@/lib/landing-data";

export function Process() {
    return (
        <div
            className="w-full py-20 px-4 md:px-10 lg:px-40 bg-[#f6f8f6] dark:bg-[#152111] border-t border-slate-200 dark:border-[#2c4724]/30"
            id="process"
        >
            <div className="max-w-[1200px] mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16">
                    How We Work
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-transparent via-[#49e619]/50 to-transparent z-0"></div>

                    {processSteps.map((step) => (
                        <div key={step.number} className="relative z-10 flex flex-col items-center">
                            <div className="size-24 rounded-full bg-slate-100 dark:bg-[#20321a] border-4 border-white dark:border-[#152111] shadow-xl flex items-center justify-center mb-6 relative">
                                <span className="text-4xl">{step.icon}</span>
                                <div className="absolute -top-2 -right-2 size-8 bg-[#49e619] rounded-full flex items-center justify-center text-[#152111] font-bold text-sm">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
