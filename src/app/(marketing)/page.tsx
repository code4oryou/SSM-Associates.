import { AboutSection } from "@/components/layout/about-section";
import { BackgroundElements } from "@/components/layout/background-elements";
import { Hero } from "@/components/layout/hero";
import { PracticeAreas } from "@/components/layout/practice-areas";
import { LeadershipSection } from "@/components/sections/leadership-section";
import { LocationSection } from "@/components/sections/location-section";
import { OfficeGallery } from "@/components/sections/office-gallery";
import { FIRM_BIO } from "@/lib/constants";

export default function MarketingLandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <BackgroundElements />

            {/* The JSON-LD schema for Google Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LegalService",
                        "name": FIRM_BIO.name,
                        "founder": FIRM_BIO.founder,
                        "description": "Expert representation in GST litigation and allied taxation matters.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Alipurduar",
                            "addressRegion": "West Bengal",
                            "addressCountry": "IN"
                        },
                        "url": FIRM_BIO.domain,
                    })
                }}
            />

            <Hero />
            <PracticeAreas />
            <AboutSection />

            {/* Added Leadership Section Here */}
            <LeadershipSection />

            <OfficeGallery />
            <LocationSection />
        </div>
    );
}