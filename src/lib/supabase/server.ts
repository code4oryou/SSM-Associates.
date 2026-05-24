import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// This utility function creates a secure Supabase connection on the server
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // This catches errors when trying to set cookies in Server Components.
                        // It's a required fallback for Next.js architecture.
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: "", ...options });
                    } catch (error) {
                        // Required fallback
                    }
                },
            },
        }
    );
}