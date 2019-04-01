import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { Pod, PodInspection, SupplierContract } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewPodInspectionItems(start_index: any, pod: Pod, supplierContract: SupplierContract, childCount: number): PodInspection[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { inspection_id }
    gsi_1_sk    = { supplier_contract_id }

    gsi_2_pk:   = { supplier_contract_id}
    gsi_2_sk:   = { supplier_contract_id}
    gsi_3_pk:   = { supplier_contract_id}
    gsi_3_sk:   = { supplier_contract_id}
    
    */

    for (let index = start_index; index < start_index + childCount; index++){
        const inspection_id = `Inspection_${index}`;
        const inspection_company = oneOf(fakeValueArrays.inspection_maintenance_companies);
        const inspection_date = getRandomDate(2016, 2);

        let dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: pod.pod_id,
            sk: inspection_id,
            gsi_1_sk: supplierContract.supply_contract_id,

            gsi_2_pk: supplierContract.supply_contract_id,
            gsi_2_sk: supplierContract.supply_contract_id,
            gsi_3_pk: supplierContract.supply_contract_id,
            gsi_3_sk: supplierContract.supply_contract_id,

            item_type_debug: "pod_inspection",
            inspection_id: inspection_id,
            inspection_company: inspection_company,
            inspection_date: inspection_date,
            next_inspection_due_in: 1 + getRandom(11),
            inspection_scope: "standard",
            inspection_by: `${oneOf(fakeValueArrays.supplier_lastNames)},${oneOf(fakeValueArrays.supplier_names)}`,
            inspection_costs_net: getRandom(500),
            inspection_report_filled: oneOf(["yes", "no"])
        };

        if(dbItem.inspection_report_filled === "yes") {
            dbItem = Object.assign(dbItem, {
                inspection_report : {
                inspection_report_approved_on: getRandomDate(2016, 2),
                inspection_report_approved_by: "Worker"
                }
            });
        }

        dbItems.push(dbItem);
    }

    return dbItems;
}