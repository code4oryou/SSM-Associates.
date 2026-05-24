"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { FIRM_BIO } from "@/lib/constants";
import { ThemeToggle } from "../theme-toggle";

export function Navbar() {
    const pathname = usePathname();

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

                {/* Desktop Navigation with Active States */}
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

                {/* Call to Action & Portal Login */}
                {/* Call to Action & Portal Login */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                        {/* Add the 'replace' prop here */}
                        <Link href="/login" replace>Client Portal</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}