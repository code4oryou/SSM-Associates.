import { PRACTICE_AREAS, FIRM_BIO } from "@/lib/constants";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 1. Next.js Metadata API for SEO
export const metadata: Metadata = {
    title: "Tax & Legal Services",
    description: "Comprehensive GST, Income Tax, and dispute resolution services provided by SSM & Associates.",
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden text-foreground">

            {/* Subtle background glow for depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Expert Legal & Taxation Services
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {FIRM_BIO.description}
                    </p>
                </div>

                {/* Dynamic Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {PRACTICE_AREAS.map((area, index) => {
                        const Icon = area.icon;
                        return (
                            <div
                                key={area.id}
                                className="group relative p-8 rounded-3xl border bg-card/40 backdrop-blur-md hover:bg-card/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8"
                                style={{ animationFillMode: "both", animationDelay: `${index * 150}ms` }}
                            >
                                {/* Subtle gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                    <Icon className="h-7 w-7 text-primary" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    {area.description}
                                </p>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                >
                                    Request Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}