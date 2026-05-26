import { ArrowUpRight } from "lucide-react";

export function OfficeGallery() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Our Chambers
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 leading-tight">
                            A space designed for <br className="hidden sm:block" /> confidentiality and focus.
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-base max-w-sm">
                        Located in the heart of Alipurduar, our office is designed to provide a secure, comfortable environment for discussing your most critical tax and legal matters.
                    </p>
                </div>

                {/* The Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">

                    {/* Image 1: Main Feature */}
                    <div className="relative group overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 bg-muted">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                            alt="SSM & Associates Office"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-white font-semibold text-lg flex items-center gap-2 tracking-wide">
                                Our Space <ArrowUpRight className="h-4 w-4 opacity-70" />
                            </p>
                        </div>
                    </div>

                    {/* Image 2: Top Right Detail */}
                    <div className="relative group overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 bg-muted">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=800"
                            alt="Office Workspace"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-white font-medium flex items-center gap-2 tracking-wide">
                                Workspace <ArrowUpRight className="h-4 w-4 opacity-70" />
                            </p>
                        </div>
                    </div>

                    {/* Image 3: Bottom Right Detail */}
                    <div className="relative group overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 bg-muted">
                        <img
                            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
                            alt="Office Interior"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            {/* <p className="text-white font-medium flex items-center gap-2 tracking-wide">
                                Interior Details <ArrowUpRight className="h-4 w-4 opacity-70" />
                            </p> */}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}