"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PRACTICE_AREAS } from "@/lib/constants";

export function PracticeAreas() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Areas of Practice</h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                        Providing technically sound and business-oriented legal solutions for modern taxation challenges.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRACTICE_AREAS.map((area, index) => {
                        const Icon = area.icon; // Extract the icon component

                        return (
                            <motion.div
                                key={area.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-muted">
                                    <CardHeader>
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{area.title}</CardTitle>
                                        <CardDescription className="text-base mt-2">
                                            {area.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}