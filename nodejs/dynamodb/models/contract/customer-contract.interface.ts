import { ItemBase } from "../base/item-base.interface";
import { CustomerContractBase } from "../base/contract/customer-contract-base.interface";

export interface CustomerContract extends ItemBase, CustomerContractBase {
    /**
     ItemBase overrides

    pk_id       = { customer_contract_id }
    sk          = { contract_start_date }
    gsi_1_sk    = { contract_valid_to }
    gsi_2_sk:   = { contract_partner_type }
    */
}