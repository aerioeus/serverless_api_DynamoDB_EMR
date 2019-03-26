import { PriceAdjustmentFormula, CustomerContract, ContractPriceAdjustmentFormula } from "../models";
import { getNewGuid, getCurrentDateTimeLikeAws } from ".";

export function getContractPafItem (
    pafItem: PriceAdjustmentFormula, 
    contractItem: CustomerContract,
    isSupplier: boolean): ContractPriceAdjustmentFormula {
    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: contractItem.customer_contract_id,
        sk: pafItem.paf_id,
        gsi_1_sk: pafItem.paf_name,
        gsi_2_sk: pafItem.paf_description,
        paf_id: pafItem.paf_id,
        paf_name: pafItem.paf_name,
        paf_text: pafItem.paf_text,
        paf_description: pafItem.paf_description,
        paf_comment: pafItem.paf_comment,
        paf_index_1: pafItem.paf_index_1,
        paf_index_2: pafItem.paf_index_2,
        paf_index_3: pafItem.paf_index_3,
        paf_index_4: pafItem.paf_index_4,
        paf_index_5: pafItem.paf_index_5,
        item_type_debug: isSupplier ? "ContractPaf(Supplier)" : "ContractPaf(Customer)"
    };

    return item;
}