import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { Repair } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";
import { ItemBase } from "../../models/base";

export function getNewRepairItems <T extends ItemBase> (index: number, techComponent: T, childCount: number, componentRepaired: string): Repair[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { repair_id }
    sk          = { component_id }
    gsi_1_sk    = { repair_id }
    gsi_2_sk:   = { repair_id }
    */

    const repair_company = oneOf(fakeValueArrays.inspection_maintenance_companies);
    for (let i = index; i < index + childCount; i++){
        const repair_id = `Repair_${index}`;
        let dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: repair_id,
            sk: techComponent.sk,
            gsi_1_sk: repair_id,
            gsi_2_sk: repair_id,
            item_type_debug: "Repair",
            repair_id: repair_id,
            repair_contractor: repair_company,
            repair_date: getRandomDate(2016, 2),
            repair_invoice_number: getRandom(10000).toString(),
            repair_invoice_position_number: getRandom(100).toString(),
            repair_planned_repair_breakdown: "planned",
            repair_scope: "forced air burner",
            repair_repaired_by: repair_company,
            repair_report_filed: oneOf(["yes", "no"]),
            repair_component_repaired: componentRepaired,
            repair_component_repair_costs_net: `\$${500 + getRandom(500)}`,
            repair_component_reason_for_repair: "malfunction"
        };

        if(dbItem.repair_report_filed === "yes") {
            dbItem = Object.assign(dbItem, {
            repair_report : {
                inspection_report_approved_on: getRandomDate(2016, 2),
                inspection_report_approved_by: "Worker"
                }
            });
        }

        dbItems.push(dbItem);
    }

    return dbItems;
}