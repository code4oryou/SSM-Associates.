import { z } from "zod";

export const AppointmentSchema = z.object({
    client_name: z.string().min(2, "Name must be at least 2 characters."),
    client_email: z.string().email("Please enter a valid email address."),
    client_phone: z.string().optional(),
    query_details: z.string().min(10, "Please provide a bit more detail about your query."),
    // Treat the date as a string on the frontend
    appointment_date: z.string().min(1, "Please select a date for the appointment."),
});

export type AppointmentFormValues = z.infer<typeof AppointmentSchema>;