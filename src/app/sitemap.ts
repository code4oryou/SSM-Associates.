import { MetadataRoute } from "next";
import { FIRM_BIO } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = FIRM_BIO.domain;

    // Define our core marketing routes
    const routes = ["", "/services", "/about", "/contact"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        // Standard frequency for a legal firm
        changeFrequency: "monthly" as const,
        // Prioritize the homepage (1.0), then secondary pages (0.8)
        priority: route === "" ? 1 : 0.8,
    }));

    return [...routes];
}