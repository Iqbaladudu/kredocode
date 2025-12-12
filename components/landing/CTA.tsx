"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

export function CTA() {
    return (
        <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-40 bg-[#f6f8f6] dark:bg-[#152111]">
            <div className="max-w-[1200px] mx-auto bg-linear-to-br from-[#20321a] via-[#1a2915] to-[#152111] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 text-center relative overflow-hidden border border-[#2c4724]/50">
                {/* Glow Effects */}
                <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-[#49e619]/15 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-[#49e619]/15 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

                {/* Decorative Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle, #49e619 1px, transparent 1px)`,
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#49e619]/10 border border-[#49e619]/30 mb-4 sm:mb-6">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#49e619] animate-pulse" />
                        <span className="text-[#49e619] text-xs sm:text-sm font-semibold">
                            Let's Build Together
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                        Ready to transform{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#49e619] to-emerald-400">
                            your business?
                        </span>
                    </h2>

                    <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                        Let's discuss your next project. We help innovative companies build the future with scalable and secure software.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <button className="group w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 md:px-10 bg-[#49e619] hover:bg-[#3dd514] text-[#152111] rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg shadow-[#49e619]/25 hover:shadow-xl hover:shadow-[#49e619]/40 hover:scale-105 flex items-center justify-center gap-2">
                            Start Your Project
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>

                        <button className="group w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#49e619]/50 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2">
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            Schedule a Call
                        </button>
                    </div>

                    {/* Trust Indicator */}
                    <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500">
                        No commitment required • Free consultation • Response within 24h
                    </p>
                </div>
            </div>
        </div>
    );
}
