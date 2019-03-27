import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { Pod, PodMaintenance } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewPodMaintenanceItems(index: any, pod: Pod, childCount: number): PodMaintenance[] {
    const dbItems = [];

    for (let i = index; i < index + childCount; i++) {
        const maintenance_id = `Maintenance_${index}`;
        const maintenance_company = oneOf(fakeValueArrays.inspection_maintenance_companies);
        const maintenance_date = getRandomDate(2016, 2);

        let dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: pod.pod_id,
            sk: maintenance_id,
            gsi_1_sk: maintenance_company,
            gsi_2_sk: maintenance_date,
            item_type_debug: "PodMaintenance",

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