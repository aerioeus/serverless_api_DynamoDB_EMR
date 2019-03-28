import { getCurrentDateTimeLikeAws, getNewGuid } from "../factory.utils";
import { Customer, CustomerContract } from "../../models";
import { getNewContractItem } from "./contract-base.factory";

export function getNewCustomerContractItems(start_index: number, customer: Customer, childCount: number): CustomerContract[] {

    /**
     ItemBase overrides

    pk_id       = { customer_contract_id }
    sk          = { customer_id }
    gsi_1_sk    = { customer_name }
    gsi_2_sk:   = { customer_name }
    */

   const dbItems = new Array<CustomerContract>();

   for (let index = start_index; index < start_index + childCount; index++) {
        const signer = {
            first_name: customer.customer_contact_person.customer_contact_person_first_name,
            last_name: customer.customer_contact_person.customer_contact_person_last_name,
            organization_name: customer.customer_name,
            address_place: customer.customer_billing_address.customer_billing_address_place
        };

        const contract = getNewContractItem(index, signer, false);
        const contract_item = <CustomerContract>contract;
        const customer_contract_id = `ENN-000${index}`;

        contract_item.customer_contract_id = customer_contract_id;
        contract_item.item_id = getNewGuid();
        contract_item.item_timestamp = getCurrentDateTimeLikeAws();
        contract_item.pk_id = customer_contract_id;
        contract_item.sk = customer.customer_id;
        contract_item.gsi_1_sk = customer.customer_name;
        contract_item.gsi_2_sk = customer.customer_name;
        contract_item.item_type_debug = "customer_contract";

        dbItems.push(contract_item);
    }

    return dbItems;
}