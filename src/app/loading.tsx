import { Scale, Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
            <div className="relative flex items-center justify-center">
                {/* The rotating outer ring */}
                <Loader2 className="h-16 w-16 text-primary/20 animate-spin absolute" />
                {/* The static inner logo */}
                <Scale className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
                Loading SSM & Associates...
            </p>
        </div>
    );
}