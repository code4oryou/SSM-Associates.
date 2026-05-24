import { logoutAdmin } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { CalendarDays, Mail, Phone, Clock, Scale, LayoutDashboard, LogOut, CheckCircle2, CircleDashed } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: appointments, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/20">
                <div className="p-6 bg-destructive/10 text-destructive rounded-xl font-medium">
                    Failed to connect to the secure database.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col">

            {/* 1. App Header (Brings back the firm's branding) */}
            <header className="sticky top-0 z-30 bg-background border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Scale className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <span className="text-xl font-bold tracking-tight text-foreground block leading-none">
                                SSM & Associates
                            </span>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Admin Portal
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                            View Live Site
                        </Link>

                        {/* The Native Form Logout */}
                        <form action={logoutAdmin}>
                            <button type="submit" className="text-sm font-medium text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2">
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        </form>

                    </div>
                </div>
            </header>

            {/* 2. Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex items-center gap-3 mb-8">
                    <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Appointment Requests</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage and review incoming client consultations.
                        </p>
                    </div>
                </div>

                {/* 3. Elevated Data Table */}
                <div className="bg-card rounded-2xl border shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-5">Client Profile</th>
                                    <th className="px-6 py-5">Contact Details</th>
                                    <th className="px-6 py-5">Requested Date</th>
                                    <th className="px-6 py-5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {appointments?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center">
                                                <CalendarDays className="h-10 w-10 mb-3 opacity-20" />
                                                <p className="text-lg font-medium">No appointments pending.</p>
                                                <p className="text-sm mt-1">New requests will appear here automatically.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    appointments?.map((appt) => (
                                        <tr key={appt.id} className="hover:bg-muted/30 transition-colors group">

                                            {/* Name & Query */}
                                            <td className="px-6 py-5 align-top">
                                                <div className="font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors">
                                                    {appt.client_name}
                                                </div>
                                                <div className="text-muted-foreground text-sm line-clamp-2 max-w-sm leading-relaxed">
                                                    {appt.query_details}
                                                </div>
                                            </td>

                                            {/* Contact */}
                                            <td className="px-6 py-5 align-top space-y-2 text-muted-foreground">
                                                <div className="flex items-center gap-2 text-sm font-medium">
                                                    <Mail className="h-4 w-4 text-primary/70" />
                                                    <a href={`mailto:${appt.client_email}`} className="hover:underline">{appt.client_email}</a>
                                                </div>
                                                {appt.client_phone && (
                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                        <Phone className="h-4 w-4 text-primary/70" />
                                                        <a href={`tel:${appt.client_phone}`} className="hover:underline">{appt.client_phone}</a>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 align-top">
                                                <div className="flex items-center gap-2 font-semibold text-foreground bg-primary/5 w-fit px-3 py-1.5 rounded-md">
                                                    <CalendarDays className="h-4 w-4 text-primary" />
                                                    {new Date(appt.appointment_date).toLocaleDateString("en-IN", {
                                                        day: "numeric", month: "short", year: "numeric"
                                                    })}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 font-medium">
                                                    <Clock className="h-3.5 w-3.5" /> Received {" "}
                                                    {new Date(appt.created_at).toLocaleDateString("en-IN")}
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-6 py-5 align-top">
                                                {appt.status === 'pending' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                                        <CircleDashed className="h-3.5 w-3.5 animate-[spin_3s_linear_infinite]" />
                                                        PENDING
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        {appt.status.toUpperCase()}
                                                    </span>
                                                )}
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}