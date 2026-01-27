"use client";

import { useState, createContext, useContext } from "react";

// Context for animation state
type PageTransitionContextType = {
    isAnimationComplete: boolean;
    skipAnimation: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextType>({
    isAnimationComplete: true,
    skipAnimation: () => { },
});

export const usePageTransition = () => useContext(PageTransitionContext);

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    // Always true immediately to skip animation
    const [isAnimationComplete] = useState(true);

    const skipAnimation = () => { };

    return (
        <PageTransitionContext.Provider value={{ isAnimationComplete, skipAnimation }}>
            <div className="opacity-100">
                {children}
            </div>
        </PageTransitionContext.Provider>
    );
}
