import { LEADERSHIP } from "@/lib/constants";
import { Award, GraduationCap, Scale, Briefcase, ShieldCheck } from "lucide-react";

export function LeadershipSection() {
    return (
        <section className="w-full py-24 bg-muted/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Narrative */}
                <div className="max-w-3xl mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Our Chamber
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-6 leading-tight">
                        Generations of expertise, <br className="hidden sm:block" /> united under one roof.
                    </h2>
                    <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
                        SSM & Associates is built on a foundation of deep, battle-tested experience and modern legal excellence. Our chamber houses two generations of practitioners, ensuring your matters are handled with both historical wisdom and contemporary legal strategy.
                    </p>
                </div>

                {/* Dynamic Profile Cards mapped from constants.ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {LEADERSHIP.map((leader) => (
                        <div key={leader.id} className="bg-card border border-border/50 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">

                            {/* Background Watermark Icon */}
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                {leader.icon === "Award" ? <Scale className="h-32 w-32" /> : <GraduationCap className="h-32 w-32" />}
                            </div>

                            <div className="relative z-10">
                                {/* Primary Icon */}
                                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                                    {leader.icon === "Award" ? <Award className="h-7 w-7" /> : <GraduationCap className="h-7 w-7" />}
                                </div>

                                <h3 className="text-2xl font-bold text-foreground">{leader.name}</h3>
                                <p className="text-primary font-medium mt-1">{leader.role}</p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        {leader.icon === "Award" ? (
                                            <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                        ) : (
                                            <Award className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                        )}
                                        <p className="text-muted-foreground leading-relaxed">
                                            <strong className="text-foreground">{leader.highlight} </strong>
                                            {leader.description}
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        {leader.icon === "Award" ? (
                                            <ShieldCheck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                        ) : (
                                            <Scale className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                        )}
                                        <p className="text-muted-foreground leading-relaxed">
                                            Dedicated to protecting client interests through meticulous compliance and strategic litigation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}