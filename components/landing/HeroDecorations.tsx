"use client";
import React from "react";
import { motion } from "framer-motion";

export const HeroDecorations = () => {
    return (
        <>
            {/* Organic Blob Shapes - Top Right - More Subtle */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-20 right-20 w-[500px] h-[500px] pointer-events-none"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="relative w-full h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] blur-3xl" />
                </motion.div>
            </motion.div>

            {/* Organic Blob Shapes - Bottom Left - More Subtle */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute bottom-20 left-20 w-[400px] h-[400px] pointer-events-none"
            >
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="relative w-full h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/20 to-blue-500/20 rounded-[30%_70%_70%_30%/30%_60%_40%_70%] blur-3xl" />
                </motion.div>
            </motion.div>

            {/* Minimal Floating Accent - Single Element */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-1/3 w-24 h-24 pointer-events-none opacity-40"
            >
                <div className="w-full h-full border-2 border-indigo-400/50 rounded-2xl rotate-12" />
            </motion.div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
                        backgroundSize: '48px 48px',
                    }}
                />
            </div>
        </>
    );
};
