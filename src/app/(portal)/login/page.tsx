import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export default async function LoginPage() {
    const supabase = await createClient();

    // 1. Check the secure HTTP-only cookies on the server
    const { data } = await supabase.auth.getUser();

    // 2. If they are already logged in, instantly bounce them to the dashboard
    if (data?.user) {
        redirect("/dashboard"); // (Update this if your admin page is named differently)
    }

    // 3. If no session exists, allow the login form to render
    return <LoginForm />;
}