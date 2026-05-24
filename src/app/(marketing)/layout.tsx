import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* THE FIX: 
        We add 'w-full' and 'overflow-x-hidden' strictly to the main wrapper. 
        This acts as a forcefield. Nothing inside your pages can ever cause 
        a horizontal scrollbar, but the Navbar stays safely outside it!
      */}
            <main className="flex-1 w-full overflow-x-hidden">
                {children}
            </main>

            <Footer />
        </div>
    );
}