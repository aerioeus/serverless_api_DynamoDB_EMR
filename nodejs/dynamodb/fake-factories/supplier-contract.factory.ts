import { getCurrentDateTimeLikeAws, getNewGuid } from "./factory.utils";
import { SupplierContract } from "../models";
import { getNewContractItem } from "./contract-base.factory";
import { SupplierContractInternal } from "../models/internal/supplier-contract.internal.interface";
import { Supplier } from "../models/supplier.interface";

export function getNewSupplierContractItem(index: any, supplier: Supplier): SupplierContractInternal {

    const signer = {
        first_name: supplier.supplier_contact_person.supplier_contact_person_first_name,
        last_name: supplier.supplier_contact_person.supplier_contact_person_last_name,
        organization_name: supplier.supplier_name,
        address_place: supplier.supplier_address.supplier_place
    };

    const contract = getNewContractItem(index, signer, true);

    const contract_item = <SupplierContract>contract;

    const supply_contract_id = `SUP-000${index}`;
    contract_item.supply_contract_id = supply_contract_id;
    contract_item.item_id = getNewGuid();
    contract_item.item_timestamp = getCurrentDateTimeLikeAws();
    contract_item.pk_id = supply_contract_id;
    contract_item.sk = contract.contract_start_date;
    contract_item.gsi_1_sk = contract.contract_valid_to;
    contract_item.gsi_2_sk = contract.contract_partner_type;
    contract_item.item_type_debug = "SupplierContract";
    
    let item = {
        db_item: contract_item,
        // make a copy of the supplier object to be able to change supplier_db_item.pk_id field for each contract
        supplier_db_item: Object.assign({}, supplier)
    };

    item.supplier_db_item.pk_id = item.db_item.pk_id;

    return item;
}