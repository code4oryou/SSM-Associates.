import { logoutAdmin } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { CalendarDays, Mail, Phone, Clock, Scale, LayoutDashboard, LogOut, CheckCircle2, CircleDashed, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { StatusButtons } from "@/components/dashboard/status-buttons";
import { SearchBar } from "@/components/dashboard/search-bar";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

// Helper function to generate an intelligent array of page numbers [1, 2, '...', 8, 9, 10]
function generatePagination(currentPage: number, totalPages: number) {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages - 1, totalPages];
    if (currentPage >= totalPages - 2) return [1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

export default async function DashboardPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) redirect("/login");

    const searchParams = await props.searchParams;

    // 1. Pagination & Search Variables
    const query = searchParams?.query || "";
    // Clean commas out of the query to prevent breaking the Supabase .or() syntax
    const safeQuery = query.replace(/,/g, '');
    const currentPage = Number(searchParams?.page) || 1;
    const pageSize = 10;

    // 2. Build the Supabase Query
    let dbQuery = supabase
        .from("appointments")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

    // Apply Search Filter safely
    if (safeQuery) {
        dbQuery = dbQuery.or(`client_name.ilike.%${safeQuery}%,client_email.ilike.%${safeQuery}%,query_details.ilike.%${safeQuery}%`);
    }

    // Apply Pagination Range
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data: appointments, count, error } = await dbQuery.range(from, to);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/20">
                <div className="p-6 bg-destructive/10 text-destructive rounded-xl font-medium">
                    Failed to connect to the secure database.
                </div>
            </div>
        );
    }

    // Math for Pagination
    const totalItems = count || 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const allPages = generatePagination(currentPage, totalPages);

    // Helper to generate the URL for a specific page while preserving search query
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams();
        if (query) params.set('query', query);
        params.set('page', pageNumber.toString());
        return `/dashboard?${params.toString()}`;
    };

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col">
            <header className="sticky top-0 z-30 bg-background border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Scale className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <span className="text-xl font-bold tracking-tight text-foreground block leading-none">SSM & Associates</span>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin Portal</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">View Live Site</Link>
                        <form action={logoutAdmin}>
                            <button type="submit" className="text-sm font-medium text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2">
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Appointment Requests</h1>
                            <p className="text-muted-foreground mt-1">Manage and review incoming client consultations.</p>
                        </div>
                    </div>
                    {/* Search Bar */}
                    <SearchBar />
                </div>

                <div className="bg-card rounded-2xl border shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-5 w-16 text-center">#</th>
                                    <th className="px-6 py-5">Client Profile</th>
                                    <th className="px-6 py-5">Contact Details</th>
                                    <th className="px-6 py-5">Requested Date</th>
                                    <th className="px-6 py-5 min-w-[200px]">Status & Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {appointments?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center">
                                                <CalendarDays className="h-10 w-10 mb-3 opacity-20" />
                                                <p className="text-lg font-medium">No cases found.</p>
                                                {query && <p className="text-sm mt-1">Try clearing your search query.</p>}
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    appointments?.map((appt, index) => {
                                        const serialNumber = totalItems - from - index;
                                        return (
                                            <tr key={appt.id} className="hover:bg-muted/30 transition-colors group">
                                                <td className="px-6 py-5 align-top text-center">
                                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground font-bold text-xs">{serialNumber}</span>
                                                </td>
                                                <td className="px-6 py-5 align-top">
                                                    <div className="font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors">{appt.client_name}</div>
                                                    <div className="text-muted-foreground text-sm line-clamp-2 max-w-sm leading-relaxed">{appt.query_details}</div>
                                                </td>
                                                <td className="px-6 py-5 align-top space-y-2 text-muted-foreground">
                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                        <Mail className="h-4 w-4 text-primary/70" />
                                                        <a href={`mailto:${appt.client_email}`} className="hover:underline break-all">{appt.client_email}</a>
                                                    </div>
                                                    {appt.client_phone && (
                                                        <div className="flex items-center gap-2 text-sm font-medium">
                                                            <Phone className="h-4 w-4 text-primary/70" />
                                                            <a href={`tel:${appt.client_phone}`} className="hover:underline">{appt.client_phone}</a>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5 align-top">
                                                    <div className="flex items-center gap-2 font-semibold text-foreground bg-primary/5 w-fit px-3 py-1.5 rounded-md">
                                                        <CalendarDays className="h-4 w-4 text-primary" />
                                                        {new Date(appt.appointment_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 font-medium">
                                                        <Clock className="h-3.5 w-3.5" /> Received {new Date(appt.created_at).toLocaleDateString("en-IN")}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 align-top">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="w-fit">
                                                            {(appt.status || "pending").toLowerCase() === 'pending' ? (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                                                    <CircleDashed className="h-3.5 w-3.5 animate-[spin_3s_linear_infinite]" /> PENDING
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                                    <CheckCircle2 className="h-3.5 w-3.5" /> {(appt.status || "resolved").toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <StatusButtons appointmentId={appt.id} currentStatus={appt.status} />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ADVANCED PAGINATION COMPONENT WITH REPLACE PROPS */}
                    {totalPages > 1 && (
                        <div className="bg-background border-t px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-muted-foreground font-medium">
                                Showing <span className="font-bold text-foreground">{totalItems === 0 ? 0 : from + 1}</span> to <span className="font-bold text-foreground">{Math.min(to + 1, totalItems)}</span> of <span className="font-bold text-foreground">{totalItems}</span> cases
                            </p>

                            <div className="flex items-center gap-1">
                                {/* First Page */}
                                <Button variant="outline" size="icon" className="h-8 w-8 hidden sm:flex" disabled={currentPage <= 1} asChild={currentPage > 1}>
                                    {currentPage > 1 ? <Link href={createPageURL(1)} replace><ChevronsLeft className="h-4 w-4" /></Link> : <ChevronsLeft className="h-4 w-4" />}
                                </Button>

                                {/* Prev Page */}
                                <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage <= 1} asChild={currentPage > 1}>
                                    {currentPage > 1 ? <Link href={createPageURL(currentPage - 1)} replace><ChevronLeft className="h-4 w-4" /></Link> : <ChevronLeft className="h-4 w-4" />}
                                </Button>

                                {/* Page Numbers Array */}
                                <div className="flex items-center mx-2 gap-1">
                                    {allPages.map((page, index) => {
                                        if (page === '...') {
                                            return <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">...</span>;
                                        }
                                        return (
                                            <Button
                                                key={`page-${page}`}
                                                variant={currentPage === page ? "default" : "ghost"}
                                                size="sm"
                                                className={`h-8 w-8 p-0 ${currentPage === page ? "pointer-events-none" : ""}`}
                                                asChild={currentPage !== page}
                                            >
                                                {currentPage !== page ? (
                                                    <Link href={createPageURL(page)} replace>{page}</Link>
                                                ) : (
                                                    <span>{page}</span>
                                                )}
                                            </Button>
                                        );
                                    })}
                                </div>

                                {/* Next Page */}
                                <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
                                    {currentPage < totalPages ? <Link href={createPageURL(currentPage + 1)} replace><ChevronRight className="h-4 w-4" /></Link> : <ChevronRight className="h-4 w-4" />}
                                </Button>

                                {/* Last Page */}
                                <Button variant="outline" size="icon" className="h-8 w-8 hidden sm:flex" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
                                    {currentPage < totalPages ? <Link href={createPageURL(totalPages)} replace><ChevronsRight className="h-4 w-4" /></Link> : <ChevronsRight className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}