import { ItemBase } from "./base/item-base.interface";
import { SupplierContractBase } from "./base/contract/supplier-contract.base.interface";

export interface SupplierContract extends ItemBase, SupplierContractBase {
    /**
     ItemBase overrides

    pk_id       = { supply_contract_id }
    sk          = { contract_start_date }
    gsi_1_sk    = { contract_valid_to }
    gsi_2_sk:   = { contract_partner_type }
    */
}