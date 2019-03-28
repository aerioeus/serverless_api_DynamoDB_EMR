import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { Repair } from "../../models";
import { ItemBase } from "../../models/base";
import { Invoice } from "../../models/invoice/invoice.interface";

export function getNewRepairItems <T extends ItemBase> (index: number, techComponent: T, invoice: Invoice, childCount: number, componentRepaired: string): Repair[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { repair_id }
    sk          = { invoice_id }
    gsi_1_sk    = { component_id }
    gsi_2_sk:   = { component_id }
    */

    for (let i = index; i < index + childCount; i++){
        const repair_id = `Repair_${index}`;
        let dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: repair_id,
            sk: invoice.invoice_id,
            gsi_1_sk: techComponent.sk,
            gsi_2_sk: techComponent.sk,
            item_type_debug: "Repair",
            repair_id: repair_id,
            repair_contractor: invoice.invoice_contractor,
            repair_date: getRandomDate(2016, 2),
            repair_invoice_number: invoice.invoice_id,
            repair_invoice_position_number: 1 + getRandom(invoice.invoice_positions - 1),
            repair_planned_repair_breakdown: "planned",
            repair_scope: "forced air burner",
            repair_repaired_by: invoice.invoice_contractor,
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