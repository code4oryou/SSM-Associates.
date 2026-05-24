"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Updated import path to fix the ts(2307) error
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}