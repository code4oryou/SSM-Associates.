"use client";

import { useState } from "react";
import { loginAdmin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale, Lock, Mail, Loader2 } from "lucide-react";

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const response = await loginAdmin(formData);

        // If we reach this point, the login failed (because a success would trigger a server-side redirect)
        if (response && !response.success) {
            setError(response.error ?? "An unexpected error occurred.");
            setIsPending(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
            <div className="w-full max-w-md bg-card rounded-2xl border shadow-xl p-8">

                {/* Branding */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">SSM & Associates</h1>
                    <p className="text-sm text-muted-foreground mt-1">Secure Client Portal Login</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" /> Admin Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="admin@ssm-associates.com"
                            className="bg-muted/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-semibold flex items-center gap-2">
                            <Lock className="h-4 w-4 text-primary" /> Password
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="bg-muted/50"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg font-medium text-center">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                        {isPending ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...</>
                        ) : (
                            "Secure Login"
                        )}
                    </Button>
                </form>

            </div>
        </div>
    );
}