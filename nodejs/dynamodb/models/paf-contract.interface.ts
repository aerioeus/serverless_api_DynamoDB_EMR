import { ItemBase } from "./base/item-base.interface";
import { CustomerContractBase } from "./base/customer-contract-base.interface";

export interface PriceAdjustmentFormulaContract extends ItemBase, CustomerContractBase {
    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { customer_contract_id }
    gsi_1_sk    = { customer_contract_id }
    gsi_2_sk:   = { customer_contract_id }
    */
}