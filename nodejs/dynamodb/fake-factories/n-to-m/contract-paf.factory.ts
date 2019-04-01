import { PriceAdjustmentFormula, CustomerContract, ContractPriceAdjustmentFormula, SupplierContract } from "../../models";
import { getNewGuid, getCurrentDateTimeLikeAws } from "..";

    /**
     ItemBase overrides

    pk_id       = { customer_contract_id }
    sk          = { paf_id }
    gsi_1_sk    = { paf_name }

    gsi_2_pk:   = { paf_name }
    gsi_2_sk:   = { paf_name }
    gsi_3_pk:   = { paf_name }
    gsi_3_sk:   = { paf_name }
    */
   
export function getContractPafItem (
    pafItem: PriceAdjustmentFormula, 
    contractItem: CustomerContract | SupplierContract,
    isSupplier: boolean): ContractPriceAdjustmentFormula {

    const id = isSupplier ? (<SupplierContract>contractItem).supply_contract_id : (<CustomerContract>contractItem).customer_contract_id;
    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: id,
        sk: pafItem.paf_id,
        gsi_1_sk: pafItem.paf_name,

        gsi_2_pk: pafItem.paf_name,
        gsi_2_sk: pafItem.paf_name,
        gsi_3_pk: pafItem.paf_name,
        gsi_3_sk: pafItem.paf_name,

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
        item_type_debug: isSupplier ? "supplier_contract_paf" : "customer_contract_paf"
    };

    return item;
}