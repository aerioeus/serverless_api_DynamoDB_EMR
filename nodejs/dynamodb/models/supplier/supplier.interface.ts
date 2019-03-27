import { SupplierBase } from "../base";
import { ItemBase } from "../base";

export interface Supplier extends SupplierBase, ItemBase {
    /**
     ItemBase overrides

    pk_id       = { supply_contract_id }
    sk          = { supplier_type = "Company" }
    gsi_1_sk    = { supplier_type = "Company" }
    gsi_2_sk:   = { supplier_address.supplier_place}
    */
}