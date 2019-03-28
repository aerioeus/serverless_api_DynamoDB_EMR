import { Building, Repair } from "../../models";
import { getNewGuid, getCurrentDateTimeLikeAws } from "..";
import { BuildingRepair } from "../../models/n-to-m/building-repair.interface";


export function getBuildingRepairItem (
    buildingItem: Building,
    repairItem: Repair): BuildingRepair {

    /**
     ItemBase overrides

    pk_id       = { building_id }
    sk          = { repair_id }
    gsi_1_sk    = { repair_date }
    gsi_2_sk:   = { repair_date }
    */

    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: buildingItem.building_id,
        sk: repairItem.repair_id,
        gsi_1_sk: repairItem.repair_date,
        gsi_2_sk: repairItem.repair_date,
        item_type_debug:"building_repair",
        repair_contractor: repairItem.repair_contractor,
        repair_date: repairItem.repair_date,
        repair_invoice_number: repairItem.repair_invoice_number,
        repair_invoice_position_number: repairItem.repair_invoice_position_number,
        repair_planned_repair_breakdown: repairItem.repair_planned_repair_breakdown,
        repair_scope: repairItem.repair_scope
    };

    return item;
}