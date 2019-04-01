import { ItemBase } from "../base/item-base.interface";
import { SupplierContractBase } from "../base/contract/supplier-contract.base.interface";

export interface SupplierContract extends ItemBase, SupplierContractBase {
    /**
     ItemBase overrides

    pk_id       = { supply_contract_id }
    sk          = { supplier_id }
    gsi_1_sk    = { supplier_name }
    gsi_2_pk:   = { supplier_id }
    gsi_2_sk:   = { supplier_industry_sector }
    gsi_3_pk:   = { supplier_name }
    gsi_3_sk:   = { supplier_name }
    */
}