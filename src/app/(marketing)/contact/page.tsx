import { BookingForm } from "@/components/forms/booking-form";
import { LocationSection } from "@/components/sections/location-section";

export const metadata = {
    title: "Contact & Bookings",
};

export default function ContactPage() {
    return (
        <div className="flex-1 py-24 bg-muted/30">
            {/* Added flex, flex-col, and gap-24 to separate the components cleanly */}
            <div className="container mx-auto px-4 md:px-6 flex flex-col gap-24">
                <BookingForm />
                <LocationSection />
            </div>
        </div>
    );
}