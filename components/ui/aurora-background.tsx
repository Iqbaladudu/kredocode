"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <main
            className={cn(
                "relative flex flex-col  h-[100vh] items-center justify-center bg-slate-50 text-slate-950 transition-bg",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full opacity-20",
                        "[background-image:linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)]",
                        "[background-size:40px_40px]"
                    )}
                >
                    {/* Aurora gradient blobs - More Subtle */}
                    <div
                        className={cn(
                            `
            [--light-gradient:repeating-linear-gradient(100deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_7%,transparent_10%,transparent_12%,rgba(255,255,255,0.05)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#6366f1_10%,#06b6d4_20%,#8b5cf6_30%,#ec4899_40%,#6366f1_50%)]
            [background-image:var(--light-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[80px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--light-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-normal
            pointer-events-none
            absolute -inset-[10px] opacity-30 will-change-transform`,

                            showRadialGradient &&
                            `[mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]`
                        )}
                    ></div>
                </div>
            </div>
            {children}
        </main>
    );
};
