import { getCurrentDateTimeLikeAws, getNewGuid } from "../factory.utils";
import { SupplierContract } from "../../models";
import { getNewContractItem } from "./contract-base.factory";
import { Supplier } from "../../models/supplier/supplier.interface";

    /**
     ItemBase overrides

    pk_id       = { supply_contract_id }
    sk          = { supplier_id }
    gsi_1_sk    = { supplier_name }
    gsi_2_sk:   = { supplier_name }
    */

export function getNewSupplierContractItems(start_index: number, supplier: Supplier, childCount: number): SupplierContract[] { 

    const dbItems = new Array<SupplierContract>();
   
    for (let index = start_index; index < start_index + childCount; index++) {
        const signer = {
            first_name: supplier.supplier_contact_person.supplier_contact_person_first_name,
            last_name: supplier.supplier_contact_person.supplier_contact_person_last_name,
            organization_name: supplier.supplier_name,
            address_place: supplier.supplier_address.supplier_place
        };
 
         const contract = getNewContractItem(index, signer, false);
         const contract_item = <SupplierContract>contract;

         const supply_contract_id = `SUP-000${index}`;
         contract_item.supply_contract_id = supply_contract_id;
         contract_item.item_id = getNewGuid();
         contract_item.item_timestamp = getCurrentDateTimeLikeAws();
         contract_item.pk_id = supply_contract_id;
         contract_item.sk = supplier.supplier_id;
         contract_item.gsi_1_sk = supplier.supplier_name;
         contract_item.gsi_2_sk = supplier.supplier_name;
         contract_item.item_type_debug = "SupplierContract";
 
         dbItems.push(contract_item);
     }
 
     return dbItems;
}