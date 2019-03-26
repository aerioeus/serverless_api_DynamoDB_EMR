import { PriceAdjustmentFormula, CustomerContract, PriceAdjustmentFormulaContract } from "../models";
import { getNewGuid, getCurrentDateTimeLikeAws } from ".";

export function getPafContractItem (
    contractItem: CustomerContract, 
    pafItem: PriceAdjustmentFormula,
    isSupplier: boolean): PriceAdjustmentFormulaContract {
    
    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: pafItem.paf_id,
        sk: contractItem.customer_contract_id,
        gsi_1_sk: contractItem.customer_contract_id,
        gsi_2_sk: contractItem.customer_contract_id,

        customer_contract_id: contractItem.customer_contract_id,
        contract_start_date: contractItem.contract_start_date,
        contract_valid_to: contractItem.contract_valid_to,
        contract_partner_type: contractItem.contract_partner_type,
        contract_product_category_type: contractItem.contract_product_category_type,
        contract_terminated: contractItem.contract_terminated,
        contract_comment: contractItem.contract_comment,
        contract_info: contractItem.contract_info,
        contract_notice: contractItem.contract_notice,
        contract_consumption: contractItem.contract_consumption,
        contract_capacity: contractItem.contract_capacity,
        item_type_debug: isSupplier ? "PafContract(Supplier)" : "PafContract(Customer)"
        };

    return item;
}