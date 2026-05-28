import { AboutSection } from "@/components/layout/about-section";
import { LeadershipSection } from "@/components/sections/leadership-section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Advocate S.S. Mandal | SSM & Associates",
    description: "Learn about Advocate Shiw Shankar Mandal's expertise in GST, Income Tax, and complex legal litigation.",
};

export default async function AboutPage() {
    // TEST LOADING: This will now work without the ts(1308) error
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TEST ERROR: Uncomment the line below to test the crash 
    // throw new Error("Database completely crashed!");

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="w-full bg-muted/30 border-b py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                        Our Legal Foundation
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Combining academic rigor with decades of practical litigation experience to safeguard your financial and corporate interests.
                    </p>
                </div>
            </div>

            <div className="py-12 flex flex-col gap-12">
                {/* 1. The Core Firm Biography */}
                <AboutSection />

                {/* 2. The Dynamic Leadership Roster */}
                <LeadershipSection />
            </div>
        </div>
    );
}