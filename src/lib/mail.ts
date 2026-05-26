import nodemailer from "nodemailer";

// Accept a dynamic object instead of hardcoded strings
export async function sendAdminNotification(submittedData: Record<string, string>) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Dynamically build the list items from the form data
        let detailsListHtml = "";
        for (const [key, value] of Object.entries(submittedData)) {
            // Capitalize the first letter of the key for a cleaner look (e.g., "phone" -> "Phone")
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

            detailsListHtml += `
        <li style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
          <strong style="color: #555; display: block; font-size: 12px; text-transform: uppercase;">${formattedKey}</strong> 
          <span style="color: #111; font-size: 16px;">${value || "Not provided"}</span>
        </li>`;
        }

        // Try to grab the name for the subject line, fallback to "Client" if it doesn't exist
        const clientName = submittedData.name || "New Client";

        const mailOptions = {
            from: `"SSM Website Portal" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `🚨 New Consultation Request: ${clientName}`,
            html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #111; margin-top: 0;">New Booking Received</h2>
          <p style="color: #666; font-size: 15px;">A new client has submitted their details via the website.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 24px;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${detailsListHtml}
            </ul>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #888; text-align: center;">
            Log in to the Supabase Admin Portal to view full historical records.
          </p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Failed to send email notification:", error);
    }
}