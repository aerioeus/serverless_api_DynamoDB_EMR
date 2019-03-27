import { ItemBase, PriceAdjustmentFormulaBase } from "../base";

export interface PriceAdjustmentFormula extends ItemBase, PriceAdjustmentFormulaBase {
    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { paf_type = "Paf" }
    gsi_1_sk    = { paf_id }
    gsi_2_sk:   = { paf_id }
    */
}