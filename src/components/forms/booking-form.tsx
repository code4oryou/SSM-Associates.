"use client";

import { useState } from "react";
import { createAppointment } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, User, Mail, Phone, CalendarDays, MessageSquare } from "lucide-react";

export function BookingForm() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const today = new Date();
    const minDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

    const maxDateObj = new Date();
    maxDateObj.setDate(today.getDate() + 30);
    const maxDate = maxDateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const response = await createAppointment(formData);

        if (!response.success) {
            setError(response.error ?? "An unexpected error occurred.");
            setIsPending(false);
        } else {
            setIsSuccess(true);
            setIsPending(false);
        }
    }

    // --- POLISHED SUCCESS SCREEN ---
    if (isSuccess) {
        return (
            <div className="w-full max-w-lg mx-auto mt-8 p-10 bg-card rounded-2xl border shadow-lg flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="h-24 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-3">Request Submitted</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    SSM & Associates has successfully received your query. Our team will contact you shortly to confirm your consultation time.
                </p>
                <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setIsSuccess(false)}
                >
                    Book Another Appointment
                </Button>
            </div>
        );
    }

    // --- POLISHED FORM SCREEN ---
    return (
        <div className="w-full max-w-2xl mx-auto p-8 sm:p-10 bg-card rounded-2xl border shadow-xl">
            <div className="mb-8 border-b pb-6">
                <h3 className="text-3xl font-bold tracking-tight text-foreground">Request a Consultation</h3>
                <p className="text-base text-muted-foreground mt-2">
                    Securely submit your details below. All information is kept strictly confidential.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}
                    <div className="space-y-2.5">
                        <label htmlFor="client_name" className="text-sm font-semibold flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" /> Full Name *
                        </label>
                        <Input id="client_name" name="client_name" required placeholder="John Doe" className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary" />
                    </div>

                    {/* Email */}
                    <div className="space-y-2.5">
                        <label htmlFor="client_email" className="text-sm font-semibold flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" /> Email Address *
                        </label>
                        <Input id="client_email" name="client_email" type="email" required placeholder="john@example.com" className="bg-muted/50 border-muted-foreground/20" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Phone */}
                    <div className="space-y-2.5">
                        <label htmlFor="client_phone" className="text-sm font-semibold flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" /> Phone Number
                        </label>
                        <Input id="client_phone" name="client_phone" placeholder="+91 98765 43210" className="bg-muted/50 border-muted-foreground/20" />
                    </div>

                    {/* Date */}
                    <div className="space-y-2.5">
                        <label htmlFor="appointment_date" className="text-sm font-semibold flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" /> Requested Date *
                        </label>
                        <Input
                            id="appointment_date"
                            name="appointment_date"
                            type="date"
                            required
                            min={minDate}
                            max={maxDate}
                            className="bg-muted/50 border-muted-foreground/20 block w-full"
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 pt-2">
                    <label htmlFor="query_details" className="text-sm font-semibold flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" /> Query Details *
                    </label>
                    <Textarea
                        id="query_details"
                        name="query_details"
                        required
                        minLength={10}
                        placeholder="Please provide a brief overview of your GST or taxation matter..."
                        className="resize-none h-32 bg-muted/50 border-muted-foreground/20"
                    />
                </div>

                {/* Error State */}
                {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg flex items-center gap-2 font-medium">
                        <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full text-base font-semibold shadow-md hover:shadow-lg transition-all" disabled={isPending}>
                        {isPending ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Securely Submitting...</>
                        ) : (
                            "Confirm Appointment Request"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}