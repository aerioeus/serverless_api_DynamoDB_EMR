import { PriceAdjustmentFormulaIndex } from "./paf-index.interface";

export interface PriceAdjustmentFormulaBase {
    paf_id: string,
    paf_name: string,
    paf_text: string,
    paf_description: string,
    paf_comment: string,
    paf_index_1: PriceAdjustmentFormulaIndex,
    paf_index_2: PriceAdjustmentFormulaIndex,
    paf_index_3: PriceAdjustmentFormulaIndex,
    paf_index_4: PriceAdjustmentFormulaIndex,
    paf_index_5: PriceAdjustmentFormulaIndex
}