export interface EventsTypes {
    events_id: number;
    hr_id: number;
    vendor_id: number;
    events_opt_id: number;
    proposed_dates: Date[];
    location: string;
    status: "Pending" | "Approved" | "Rejected";
    description: string;
    rejection_remarks: string | null;
    confirmed_date: Date | null;
}

export interface EventsOptTypes{
    eventsOptId: number;
    eventsOptName: string;
    userId: number;
}