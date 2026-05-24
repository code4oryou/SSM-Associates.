"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-40">
            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium mb-6"
                >
                    <Scale className="mr-2 h-4 w-4" />
                    <span>Premier Tax & Legal Representation</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
                >
                    Protect Your Wealth. <br className="hidden sm:block" />
                    <span className="text-muted-foreground">Secure Your Future.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground sm:text-xl"
                >
                    Expert tax strategy and legal defense for individuals and businesses. We navigate the complexities of tax law so you don't have to.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Button size="lg" className="w-full sm:w-auto rounded-full" asChild>
                        <Link href="/contact">
                            Schedule a Consultation
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full" asChild>
                        <Link href="/services">
                            Explore Our Services
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Subtle Background Decoration */}
            <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(120,119,198,0.1)] opacity-50 blur-[80px]"></div>
            </div>
        </section>
    );
}