import { BookingForm } from "@/components/forms/booking-form";
import { LocationSection } from "@/components/sections/location-section";

export const metadata = {
    title: "Contact & Bookings",
};

export default function ContactPage() {
    return (
        <div className="flex-1 py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <BookingForm />
                <LocationSection />
            </div>
        </div>
    );
}