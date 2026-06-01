import { FIRM_BIO } from "@/lib/constants";
import Link from "next/link";
import { Scale, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-card border-t py-12 text-muted-foreground mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-foreground">
                            <Scale className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold tracking-tight">{FIRM_BIO.name}</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Providing technically sound, business-oriented legal solutions in GST and Income Tax matters.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-foreground font-semibold tracking-wide uppercase text-sm">Practice Areas</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/services" className="hover:text-primary transition-colors">GST Litigation</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Income Tax Scrutiny</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Strategic Tax Advisory</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Statutory Compliance</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-foreground font-semibold tracking-wide uppercase text-sm">Contact Chambers</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                <span>Ground Floor, Maitra Bhavan, Lions Eye Hospital Complex, Puran Bazaar, Chowpathy,<br /> Alipurduar, WB 736121</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary shrink-0" />
                                <a href="mailto:ssmandalst1@gmail.com" className="hover:text-primary transition-colors">ssmandalst1@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm">
                    <p>© {new Date().getFullYear()} {FIRM_BIO.name} All rights reserved.</p>
                    <Link href="/login" className="hover:text-primary transition-colors mt-2 sm:mt-0">Client Portal Login</Link>
                </div>
            </div>
        </footer>
    );
}