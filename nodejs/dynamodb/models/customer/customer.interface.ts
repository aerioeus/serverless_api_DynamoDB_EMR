import { ItemBase } from "../base/item-base.interface";
import { CustomerBase } from "../base/customer/customer-base.interface";

export interface Customer extends ItemBase, CustomerBase {
    /**
     ItemBase overrides

    pk_id       = { customer_contract_id }
    sk          = { customer_type = "Company" }
    gsi_1_sk    = { customer_type = "Company" }
    gsi_2_sk:   = { customer_delivery_address.customer_delivery_address_place}
    */
}