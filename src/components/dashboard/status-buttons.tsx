"use client";

import { useTransition } from "react";
import { updateAppointmentStatus } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, PhoneCall, Clock } from "lucide-react";

interface StatusButtonsProps {
    appointmentId: string;
    currentStatus: string;
}

export function StatusButtons({ appointmentId, currentStatus }: StatusButtonsProps) {
    const [isPending, startTransition] = useTransition();
    const normalizedStatus = (currentStatus || "pending").toLowerCase();

    function updateStatus(newStatus: string) {
        startTransition(async () => {
            const response = await updateAppointmentStatus(appointmentId, newStatus);
            if (response && !response.success) console.error("DB Update Failed:", response.error);
        });
    }

    return (
        <div className="flex flex-col gap-2 mt-3">
            {isPending ? (
                <Button disabled variant="outline" size="sm" className="w-full justify-start h-8 text-xs">
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> Processing...
                </Button>
            ) : (
                <>
                    {normalizedStatus === "pending" && (
                        <Button onClick={() => updateStatus("confirmed")} variant="default" size="sm" className="w-full justify-start h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                            <PhoneCall className="mr-2 h-3.5 w-3.5" /> Accept Case
                        </Button>
                    )}

                    {normalizedStatus !== "completed" && (
                        <Button onClick={() => updateStatus("completed")} variant="outline" size="sm" className="w-full justify-start h-8 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
                            <CheckCircle className="mr-2 h-3.5 w-3.5" /> Close Case
                        </Button>
                    )}

                    {normalizedStatus === "completed" && (
                        <Button onClick={() => updateStatus("pending")} variant="ghost" size="sm" className="w-full justify-start h-8 text-xs text-muted-foreground">
                            <Clock className="mr-2 h-3.5 w-3.5" /> Reopen Case
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}