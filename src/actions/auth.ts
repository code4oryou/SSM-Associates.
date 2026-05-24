"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect, RedirectType } from "next/navigation";

export async function loginAdmin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { success: false, error: "Email and password are required." };
    }

    // 1. Initialize the secure server client
    const supabase = await createClient();

    // 2. Attempt to sign in
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    // 3. Handle failure
    if (error) {
        console.error("Login Error:", error.message);
        return { success: false, error: "Invalid login credentials." };
    }

    // 4. Handle success (Redirect to the secure dashboard)
    // redirect() throws an error internally to halt execution, so it must be outside try/catch
    redirect("/dashboard", RedirectType.replace);
}

export async function logoutAdmin() {
    // 1. Initialize the secure server client
    const supabase = await createClient();

    // 2. Destroy the session on the Supabase backend and clear the local HTTP-only cookie
    await supabase.auth.signOut();

    // 3. Redirect the user back to the login screen
    redirect("/login");
}