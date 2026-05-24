import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <FileQuestion className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-3 text-foreground">Page Not Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md text-lg">
                    The legal document or page you are looking for has been moved, deleted, or does not exist.
                </p>
                <Button asChild size="lg" className="shadow-sm">
                    <Link href="/">Return to Homepage</Link>
                </Button>
            </main>
            <Footer />
        </div>
    );
}