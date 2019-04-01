import { SupplierBase } from "../base";
import { ItemBase } from "../base";

export interface Supplier extends SupplierBase, ItemBase {
    /**
     ItemBase overrides

    pk_id       = { supplier_name }
    sk          = { supplier_id }
    gsi_1_sk    = { supplier_id }

    gsi_2_pk:   = { supplier_id }
    gsi_2_sk:   = { supplier_industry_sector }
    gsi_3_pk:   = { supplier_id }
    gsi_3_sk:   = { supplier_id }

    */
}