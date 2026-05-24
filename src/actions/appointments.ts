"use server";

import { createClient } from "@/lib/supabase/server";
import { AppointmentSchema } from "@/schemas";

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

        // 4. Insert into PostgreSQL
        const { error } = await supabase.from("appointments").insert({
            client_name: validatedData.client_name,
            client_email: validatedData.client_email,
            client_phone: validatedData.client_phone,
            query_details: validatedData.query_details,
            appointment_date: new Date(validatedData.appointment_date).toISOString(),
        });

        if (error) {
            console.error("Database Error:", error.message);
            return { success: false, error: "Database error. Please try again later." };
        }

        return { success: true, message: "Appointment booked successfully!" };
    } catch (error: any) {
        // If Zod validation fails, grab the first helpful error message
        const errorMessage = error.errors?.[0]?.message || "Invalid data submitted.";
        return { success: false, error: errorMessage };
    }
}