"use client";

import { motion } from "framer-motion";
import { FIRM_BIO } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
    // We can break the description into two paragraphs for better readability
    const descriptionParts = FIRM_BIO.description.split(". ");

    return (
        <section className="py-24 bg-background border-t">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Image / Visual Anchor */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] w-full rounded-2xl bg-muted overflow-hidden border shadow-sm"
                    >
                        {/* Placeholder for actual photo - using a subtle gradient for now */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-muted-foreground/20 to-transparent mix-blend-overlay" />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            [Professional Portrait Placeholder]
                        </div>

                        {/* Trust Badge Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm border rounded-xl p-4 shadow-lg">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="font-semibold text-sm">Verified Credentials</p>
                                    <p className="text-xs text-muted-foreground">{FIRM_BIO.credentials}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Bio Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col space-y-6"
                    >
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
                                About {FIRM_BIO.name}
                            </h2>
                            <p className="text-xl text-primary font-medium">
                                Expertise in Goods and Services Tax (GST)
                            </p>
                        </div>

                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>{descriptionParts[0]}.</p>
                            <p>{descriptionParts.slice(1).join(". ")}</p>
                        </div>

                        {/* Bullet Points for visual break */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                            {['Tax Compliance', 'ITC Advisory', 'Demand Orders', 'Rectification'].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm font-medium">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}