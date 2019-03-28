import { ItemBase } from "../base";

export interface Invoice extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { invoice_id }
    sk          = { pod_id }
    gsi_1_sk    = { invoice_due_date }
    gsi_2_sk:   = { invoice_supplier_id }
    */

    invoice_id: string,
    invoice_ref_number: string,
    invoice_supplier_id: string,
    invoice_contractor: string,
    invoice_amount: number,
    invoice_description: string,
    invoice_positions: number,
    invoice_due_date: string,
    invoice_reference_number: string
}