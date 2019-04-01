import { ItemBase } from "../base/item-base.interface";
import { ContractBase } from "../base";

export interface PriceAdjustmentFormulaContract extends ItemBase, ContractBase {
    customer_contract_id?: string,
    supply_contract_id?: string
    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { customer_contract_id }
    gsi_1_sk    = { customer_contract_id }

    gsi_2_pk:   = { customer_contract_id }
    gsi_2_sk:   = { customer_contract_id }
    gsi_3_pk:   = { customer_contract_id }
    gsi_3_sk:   = { customer_contract_id }

    */
}