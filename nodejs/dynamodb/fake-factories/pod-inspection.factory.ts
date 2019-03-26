import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "./factory.utils";
import { Pod, PodInspection } from "../models";
import { fakeValueArrays } from "./fake-value.arrays";
import { MultiChildParentInternal } from "../models/internal/multi-child-parent-item.internal.interface";

export function getNewPodInspectionItems(index: any, pod: Pod, childCount: number): MultiChildParentInternal<PodInspection, Pod> {
    const dbItems = [];

    for (let i = index; i < index + childCount; i++){
        const inspection_id = `Inspection_${index}`;
        const inspection_company = oneOf(fakeValueArrays.inspection_maintenance_companies);
        const inspection_date = getRandomDate(2016, 2);

        let dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: pod.pod_id,
            sk: inspection_id,
            gsi_1_sk: inspection_company,
            gsi_2_sk: inspection_date,
            item_type_debug: "PodInspection",
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

    const item = {
        db_items: dbItems,
        parent_db_item: pod
    };

    return item;
}