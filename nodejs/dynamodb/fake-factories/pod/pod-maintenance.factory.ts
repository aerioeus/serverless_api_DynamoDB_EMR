import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { Pod, PodMaintenance, SupplierContract } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewPodMaintenanceItems(start_index: any, pod: Pod, supplierContract: SupplierContract, childCount: number): PodMaintenance[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { maintenance_id }
    gsi_1_sk    = { supplier_contract_id }

    gsi_2_pk:   = { pod_id }
    gsi_2_sk:   = { maintainance_company }
    gsi_3_pk:   = { pod_id }
    gsi_3_sk:   = { maintainance_date }
    */

    for (let i = start_index; i < start_index + childCount; i++) {
        const maintenance_id = `Maintenance_${i}`;
        const maintenance_company = oneOf(fakeValueArrays.inspection_maintenance_companies);
        const maintenance_date = getRandomDate(2016, 2);

        let dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: pod.pod_id,
            sk: maintenance_id,
            gsi_1_sk: supplierContract.supply_contract_id,

            gsi_2_pk: pod.pod_id,
            gsi_2_sk: maintenance_company,
            gsi_3_pk: pod.pod_id,
            gsi_3_sk: maintenance_date,

            item_type_debug: "pod_maintenance",

            maintainance_id: maintenance_id,
            maintainance_company: maintenance_company,
            maintainance_date: maintenance_date,
            next_maintainance_due_in: 1 + getRandom(11),
            maintainance_scope: "standard",
            maintainance_by: `${oneOf(fakeValueArrays.supplier_lastNames)},${oneOf(fakeValueArrays.supplier_names)}`,
            maintainance_costs_net: getRandom(500),
            maintainance_report_filed: oneOf(["yes", "no"])
        };

        if(dbItem.maintainance_report_filed === "yes") {
            dbItem = Object.assign(dbItem, {
                maintainance_report: {
                    maintainance_report_approved_on: getRandomDate(2016, 2),
                    maintainance_report_approved_by: "Worker"
                }
            });
        }

        dbItems.push(dbItem);
    }

    return dbItems;
}