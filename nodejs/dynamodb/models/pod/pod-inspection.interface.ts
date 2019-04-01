import { ItemBase} from "../base";

export interface PodInspection extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { inspection_id }
    gsi_1_sk    = { supplier_contract_id }

    gsi_2_pk:   = { supplier_contract_id}
    gsi_2_sk:   = { supplier_contract_id}
    gsi_3_pk:   = { supplier_contract_id}
    gsi_3_sk:   = { supplier_contract_id}
    
    */
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