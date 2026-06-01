"use server";

import { createClient } from "@/lib/supabase/server";
import { AppointmentSchema } from "@/schemas";
import { sendAdminNotification } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export async function createAppointment(formData: FormData) {
    try {
        // 1. Extract the raw string data from the HTML form
        const rawData = {
            client_name: formData.get("client_name"),
            client_email: formData.get("client_email"),
            client_phone: formData.get("client_phone") || "",
            appointment_date: formData.get("appointment_date"),
            query_details: formData.get("query_details"),
        };

        // 2. Validate it using our existing Zod schema
        const validatedData = AppointmentSchema.parse(rawData);

        // 3. Initialize secure Supabase connection
        const supabase = await createClient();

        // 4. Insert into PostgreSQL using the exact string (NO timezone conversion)
        const { error } = await supabase.from("appointments").insert({
            client_name: validatedData.client_name,
            client_email: validatedData.client_email,
            client_phone: validatedData.client_phone,
            query_details: validatedData.query_details,
            appointment_date: validatedData.appointment_date,
        });

        if (error) {
            console.error("Database Error:", error.message);
            return { success: false, error: "Database error. Please try again later." };
        }

        // 5. Safely reformat the YYYY-MM-DD string to DD/MM/YYYY for the email
        // We split the string manually to avoid JavaScript assuming a timezone
        const [year, month, day] = validatedData.appointment_date.split('-');
        const cleanDate = `${day}/${month}/${year}`;

        // 6. Trigger the email notification with the clean data
        sendAdminNotification({
            name: validatedData.client_name,
            email: validatedData.client_email,
            phone: validatedData.client_phone || "Not provided",
            date: cleanDate, // Safely passes DD/MM/YYYY without times!
            details: validatedData.query_details || "Not provided"
        });

        return { success: true, message: "Appointment booked successfully!" };
    } catch (error: any) {
        // Zod sometimes stores the errors array under 'issues' instead of 'errors'
        const zodErrors = error.issues || error.errors;

        // Grab the exact message from your schema, or fallback gracefully
        const errorMessage = zodErrors?.[0]?.message || error.message || "An unexpected validation error occurred.";

        return { success: false, error: errorMessage };
    }
}

export async function updateAppointmentStatus(id: string, newStatus: string) {
    const supabase = await createClient();

    // Verify auth
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { success: false, error: "Unauthorized" };
    }

    // Add .select() to force Supabase to return the row if successful
    const { data, error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id)
        .select();

    if (error) {
        console.error("Supabase Error:", error.message);
        return { success: false, error: error.message };
    }

    // If data is empty, it means RLS blocked the update
    if (!data || data.length === 0) {
        console.error("Update blocked by Supabase RLS policies! Zero rows updated.");
        return { success: false, error: "Permission denied by database." };
    }

    // CRITICAL for UI refreshing
    revalidatePath("/dashboard");
    return { success: true };
}

export async function deleteAppointment(appointmentId: string) {
    const supabase = await createClient();

    // Verify admin auth before deleting
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", appointmentId);

    if (error) {
        return { success: false, error: error.message };
    }

    // CRITICAL for UI refreshing
    revalidatePath("/dashboard");
    return { success: true };
}