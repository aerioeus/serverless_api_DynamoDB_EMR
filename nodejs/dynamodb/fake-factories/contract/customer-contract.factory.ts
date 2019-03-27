import { getCurrentDateTimeLikeAws, getNewGuid } from "../factory.utils";
import { Customer, CustomerContract } from "../../models";
import { getNewContractItem } from "./contract-base.factory";
import { ChildParentInternal } from "../../models/internal/child-parent-item.internal.interface";

export function getNewCustomerContractItem(index: any, customer: Customer): ChildParentInternal<CustomerContract, Customer> {

    const signer = {
        first_name: customer.customer_contact_person.customer_contact_person_first_name,
        last_name: customer.customer_contact_person.customer_contact_person_last_name,
        organization_name: customer.customer_organization_name,
        address_place: customer.customer_billing_address.customer_billing_address_place
    };

    const contract = getNewContractItem(index, signer, false);

    const contract_item = <CustomerContract>contract;

    const customer_contract_id = `ENN-000${index}`;
    contract_item.customer_contract_id = customer_contract_id;
    contract_item.item_id = getNewGuid();
    contract_item.item_timestamp = getCurrentDateTimeLikeAws();
    contract_item.pk_id = customer_contract_id;
    contract_item.sk = contract.contract_start_date;
    contract_item.gsi_1_sk = contract.contract_valid_to;
    contract_item.gsi_2_sk = contract.contract_partner_type;
    contract_item.item_type_debug = "CustomerContract";

    let item = {
        db_item: contract_item,
        // make a copy of cutomer object to be able to change customer_db_item.pk_id field for each contract
        parent_db_item: Object.assign({}, customer)
    };

    item.parent_db_item.pk_id = item.db_item.pk_id;

    return item;
}