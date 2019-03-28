import { ItemBase} from "../base";

export interface PodMaintenance extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { maintenance_id }
    gsi_1_sk    = { supplier_contract_id }
    gsi_2_sk:   = { supplier_contract_id }
    */
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