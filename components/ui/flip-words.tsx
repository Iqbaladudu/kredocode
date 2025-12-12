"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
    words,
    duration = 3000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const startAnimation = useCallback(() => {
        const word = words[words.indexOf(currentWord) + 1] || words[0];
        setCurrentWord(word);
        setIsAnimating(true);
    }, [currentWord, words]);

    useEffect(() => {
        if (!isAnimating) {
            setTimeout(() => {
                startAnimation();
            }, duration);
        }
    }, [isAnimating, duration, startAnimation]);

    return (
        <AnimatePresence
            onExitComplete={() => {
                setIsAnimating(false);
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                }}
                exit={{
                    opacity: 0,
                    y: -40,
                    x: 40,
                    filter: "blur(8px)",
                    scale: 2,
                    position: "absolute",
                }}
                className={cn(
                    "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
                    className
                )}
                key={currentWord}
            >
                {currentWord.split(" ").map((word, wordIndex) => {
                    const previousWords = currentWord.split(" ").slice(0, wordIndex);
                    const previousLettersCount = previousWords.reduce((acc, w) => acc + w.length, 0);

                    return (
                        <span key={wordIndex} className="inline-block">
                            {word.split("").map((letter, letterIndex) => (
                                <motion.span
                                    key={currentWord + wordIndex + letterIndex}
                                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{
                                        delay: (previousLettersCount + letterIndex) * 0.08,
                                        duration: 0.4,
                                    }}
                                    className="inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                            {wordIndex < currentWord.split(" ").length - 1 && (
                                <span className="inline-block">&nbsp;</span>
                            )}
                        </span>
                    );
                })}
            </motion.div>
        </AnimatePresence>
    );
};
