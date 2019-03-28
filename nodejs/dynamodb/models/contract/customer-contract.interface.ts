import { ItemBase } from "../base/item-base.interface";
import { CustomerContractBase } from "../base/contract/customer-contract-base.interface";

export interface CustomerContract extends ItemBase, CustomerContractBase {
    /**
     ItemBase overrides

    pk_id       = { customer_contract_id }
    sk          = { customer_id }
    gsi_1_sk    = { customer_name }
    gsi_2_sk:   = { customer_name }
    */
}