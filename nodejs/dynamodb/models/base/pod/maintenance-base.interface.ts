export interface MaintenanceBase {
    maintainance_id: string,
    maintainance_company: string,
    maintainance_date: string,
    next_maintainance_due_in: number,
    maintainance_scope: string,
    maintainance_by: string,
    maintainance_costs_net: number,
    maintainance_report_filed: string,
    maintainance_report?: {
        maintainance_report_approved_on: string,
        maintainance_report_approved_by: string
    }
}