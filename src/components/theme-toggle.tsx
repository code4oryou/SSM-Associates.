"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom"; // <-- We need this to force React to sync

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = theme === "dark";
        const newTheme = isDark ? "light" : "dark";

        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        const x = e.clientX;
        const y = e.clientY;

        document.documentElement.style.setProperty("--click-x", `${x}px`);
        document.documentElement.style.setProperty("--click-y", `${y}px`);

        document.startViewTransition(() => {
            // flushSync forces React to commit the theme change immediately, 
            // preventing the split-second stutter.
            flushSync(() => {
                setTheme(newTheme);
            });
        });
    };

    if (!mounted) {
        return <div className="w-10 h-10 rounded-full border border-muted bg-muted/50 animate-pulse" />;
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={handleToggle}
            className={`relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}
            aria-label="Toggle theme"
        >
            <Sun
                className={`absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark
                        ? "opacity-0 -rotate-90 scale-50"
                        : "opacity-100 rotate-0 scale-100 text-amber-500 drop-shadow-sm"
                    }`}
                size={20}
            />
            <Moon
                className={`absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark
                        ? "opacity-100 rotate-0 scale-100 text-blue-400 drop-shadow-sm"
                        : "opacity-0 rotate-90 scale-50"
                    }`}
                size={20}
            />
        </button>
    );
}