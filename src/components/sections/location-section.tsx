import { MapPin, Compass } from "lucide-react";

export function LocationSection() {
    // 1. Literal descriptive address kept exactly as provided for human readers
    const displayAddress = {
        floor: "Ground Floor, Maitra Bhavan",
        complex: "Lions Eye Hospital Complex",
        street: "BF Rd, Shanti Nagar",
        cityState: "Alipurduar, West Bengal 736121"
    };

    /* 2. Geocoding Query Optimization:
         We remove "GROUND FLOOR" and "MAITRA BHAVAN" from the map query because internal 
         building titles confuse the coordinate parser. We anchor it to the complex and street.
    */
    const mapQueryAddress = "Lions Eye Hospital Complex, BF Rd, Shanti Nagar, Alipurduar, West Bengal 736121";
    const encodedQuery = encodeURIComponent(mapQueryAddress);

    return (
        <section className="w-full py-20 bg-background border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                    {/* Left Column: Office Details */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                                Chambers Location
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 leading-tight">
                                Visit Our Office
                            </h2>
                            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                                For face-to-face consultations, case evaluations, and legal submissions, you can locate our main office at the address below.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Exact Display Address Card */}
                            <div className="flex gap-4 p-5 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Chambers Address</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                                        {displayAddress.floor},<br />
                                        {displayAddress.complex},<br />
                                        {displayAddress.street}, {displayAddress.cityState}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Landmark Hint */}
                            <div className="flex gap-4 p-5 bg-card border rounded-2xl shadow-sm">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Compass className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Navigation Landmark</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Located conveniently on the ground floor within the main Lions Eye Hospital Complex area for easy client access and accessibility.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Corrected Full-Scale Map */}
                    <div className="lg:col-span-7 min-h-[400px] sm:min-h-[480px] rounded-3xl overflow-hidden border-2 shadow-2xl relative group bg-muted/30">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "400px" }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            /* Fixed standard URL path parameter structuring */
                            src={`https://maps.google.com/maps?q=${encodedQuery}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                            title="SSM & Associates Corrected Office Location"
                            className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}