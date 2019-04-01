import { ItemBase } from "../base/item-base.interface";
import { CustomerBase } from "../base/customer/customer-base.interface";

export interface Customer extends ItemBase, CustomerBase {
    /**
     ItemBase overrides

    pk_id       = { customer_name }
    sk          = { customer_id }
    gsi_1_sk    = { customer_place }

    gsi_2_pk:   = { customer_id }
    gsi_2_sk:   = { representative_appointed }
    gsi_3_pk:   = { customer_id}
    gsi_3_sk:   = { customer_id}
    */
}