import { PriceAdjustmentFormulaBase } from "./base/contract/paf/paf-base.interface";
import { ItemBase } from "./base/item-base.interface";

export interface ContractPriceAdjustmentFormula extends ItemBase, PriceAdjustmentFormulaBase {
    /**
     ItemBase overrides

    pk_id       = { customer_contract_id }
    sk          = { paf_id }
    gsi_1_sk    = { paf_name }
    gsi_2_sk:   = { paf_description }
    */
}