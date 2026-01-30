"use client";

import { Play, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative w-full flex justify-center bg-[#f6f8f6] dark:bg-[#152111] py-16 md:py-32 px-4 md:px-10 lg:px-20">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex flex-col gap-6 lg:w-1/2 items-start">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#0f172b]/30 bg-[#0f172b]/10 text-[#0f172b] text-xs font-bold uppercase tracking-wider">
            Software Development Agency
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
            Scalable Software <span className="text-[#0f172b]">Solutions</span>{" "}
            for Enterprise
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-lg">
            We build robust, high-performance applications tailored to your
            business needs using cutting-edge technology. From ideation to
            deployment, we are your partners in digital transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <button className="h-12 px-8 bg-[#0f172b] hover:bg-[#0f172b]/90 text-[#152111] rounded-full font-bold text-base transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)] hover:shadow-[0_0_30px_rgba(73,230,25,0.5)]">
              Get Started
            </button>
            <button className="h-12 px-8 bg-transparent border border-slate-300 dark:border-[#2c4724] text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#20321a] rounded-full font-bold text-base transition-colors flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              View Showreel
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-[#2c4724] w-full">
            <div className="flex -space-x-3">
              <div className="size-10 rounded-full border-2 border-white dark:border-[#152111] bg-slate-200 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="size-10 rounded-full border-2 border-white dark:border-[#152111] bg-slate-200 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="size-10 rounded-full border-2 border-white dark:border-[#152111] bg-slate-200 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="size-10 rounded-full border-2 border-white dark:border-[#152111] bg-[#0f172b] text-[#152111] flex items-center justify-center text-xs font-bold pl-1">
                5k+
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Trusted by 5,000+ businesses
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 relative group">
          <div className="absolute inset-0 bg-[#0f172b]/20 blur-[100px] rounded-full opacity-50"></div>
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-[#2c4724] bg-slate-100 dark:bg-[#20321a] transform transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop"
              alt="Team of developers working"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#152111]/80 to-transparent"></div>

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
              <div className="size-10 rounded-full bg-[#0f172b] flex items-center justify-center text-[#152111]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-bold">Code Quality</p>
                <p className="text-white/70 text-xs">
                  99.9% Bug-free deployment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
