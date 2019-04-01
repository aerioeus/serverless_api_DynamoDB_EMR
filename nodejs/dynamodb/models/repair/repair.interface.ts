import { ItemBase } from "../base";

export interface Repair extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { repair_id }
    sk          = { invoice_id }
    gsi_1_sk    = { component_id }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { repair_date }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { repair_scope }

    */

    repair_id: string,
    repair_contractor: string,
    repair_date: string,
    repair_invoice_number: string,
    repair_invoice_position_number: number,
    repair_planned_repair_breakdown: string,
    repair_scope: string,
    repair_repaired_by: string,
    repair_report_filed: string,
    repair_report?: {
        repair_report_approved_on: string,
        repair_report_approved_by: string,        
    },
    repair_component_repaired: string,
    repair_component_repair_costs_net: string,
    repair_component_reason_for_repair: string
}