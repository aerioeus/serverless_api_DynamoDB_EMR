import { ItemBase } from "../base";

export interface BuildingRepair extends ItemBase{

    /**
     ItemBase overrides

    pk_id       = { building_id }
    sk          = { repair_id }
    gsi_1_sk    = { repair_date }

    gsi_2_pk:   = { repair_date }
    gsi_2_sk:   = { repair_date }
    gsi_3_pk:   = { repair_date }
    gsi_3_sk:   = { repair_date }
    */

    repair_contractor: string,
    repair_date: string,
    repair_invoice_number: string,
    repair_invoice_position_number: number,
    repair_planned_repair_breakdown: string,
    repair_scope: string
}