"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

export function SearchBar() {
    const searchParams = useSearchParams();

    return (
        <form action="/dashboard" method="GET" className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                name="query"
                placeholder="Search names, emails, queries..."
                className="pl-9 bg-background shadow-sm"
                defaultValue={searchParams.get("query")?.toString() || ""}
            />
            {/* Always force pagination back to page 1 when a new search is made */}
            <input type="hidden" name="page" value="1" />
        </form>
    );
}