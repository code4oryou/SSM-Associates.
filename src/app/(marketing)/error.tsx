"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // In a production app, you would log this to Sentry or Datadog
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong!</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                We encountered an unexpected error while loading this page. Our technical team has been notified.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="default">
                    Try again
                </Button>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                    Return Home
                </Button>
            </div>
        </div>
    );
}