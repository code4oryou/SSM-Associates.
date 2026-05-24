import { MetadataRoute } from "next";
import { FIRM_BIO } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Explicitly block search engines from crawling the admin portal
            disallow: ["/login", "/dashboard"],
        },
        // Dynamically point to the sitemap we are about to create
        sitemap: `${FIRM_BIO.domain}/sitemap.xml`,
    };
}