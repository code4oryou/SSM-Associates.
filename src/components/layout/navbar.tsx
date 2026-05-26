"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X } from "lucide-react";
import { FIRM_BIO } from "@/lib/constants";
import { ThemeToggle } from "../theme-toggle";

export function Navbar() {
    const pathname = usePathname();
    // 1. Add state to track if the mobile menu is open or closed
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/services", label: "Services" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">

                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <Scale className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">{FIRM_BIO.name}</span>
                </Link>

                {/* Desktop Navigation (Hidden on mobile) */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions & Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {/* Desktop Buttons (Hidden on small mobile screens to prevent crowding) */}
                    <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                        <Link href="/login" replace>Client Portal</Link>
                    </Button>
                    <Button asChild className="hidden sm:inline-flex">
                        <Link href="/contact">Book Consultation</Link>
                    </Button>

                    {/* 2. The Hamburger Button (Hidden on Desktop) */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 text-foreground transition-colors hover:text-primary focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* 3. The Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full border-b bg-background shadow-xl animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col p-4 gap-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)} // Close menu when clicked
                                className={`p-3 rounded-md transition-colors text-sm font-medium ${pathname === link.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground hover:bg-muted"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile versions of the CTA buttons */}
                        <div className="h-px bg-border my-2" /> {/* Divider */}

                        <Link
                            href="/login"
                            replace
                            onClick={() => setIsOpen(false)}
                            className="p-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Client Portal
                        </Link>

                        <Button asChild className="w-full mt-2" onClick={() => setIsOpen(false)}>
                            <Link href="/contact">Book Consultation</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}