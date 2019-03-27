import { PriceAdjustmentFormulaBase } from "./base/contract/paf/paf-base.interface";
import { ItemBase } from "./base/item-base.interface";

export interface PriceAdjustmentFormula extends ItemBase, PriceAdjustmentFormulaBase {
    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { paf_type = "Paf" }
    gsi_1_sk    = { paf_id }
    gsi_2_sk:   = { paf_id }
    */
}