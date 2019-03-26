export interface InspectionBase {
    inspection_id: string,
    inspection_company: string,
    inspection_date: string,
    next_inspection_due_in: number,
    inspection_scope: string,
    inspection_by: string,
    inspection_costs_net: number,
    inspection_report_filled: string,
    inspection_report?: {
        inspection_report_approved_on: string,
        inspection_report_approved_by: string
    }
}