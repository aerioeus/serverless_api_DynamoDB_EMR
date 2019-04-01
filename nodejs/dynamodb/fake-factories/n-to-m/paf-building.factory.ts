import { PriceAdjustmentFormula, Building } from "../../models";
import { getNewGuid, getCurrentDateTimeLikeAws } from "..";
import { PafBuilding } from "../../models/n-to-m/paf-building.interface";

export function getPafBuildingItem (
    pafItem: PriceAdjustmentFormula, 
    buildingItem: Building): PafBuilding {

    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { building_id }
    gsi_1_sk    = { building_id  }

    gsi_2_pk:   = { building_id }
    gsi_2_sk:   = { building_id }
    gsi_3_pk:   = { building_id }
    gsi_3_sk:   = { building_id }
    */

    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: pafItem.paf_id,
        sk: buildingItem.building_id,
        gsi_1_sk: buildingItem.building_id,

        gsi_2_pk: buildingItem.building_id,
        gsi_2_sk: buildingItem.building_id,
        gsi_3_pk: buildingItem.building_id,
        gsi_3_sk: buildingItem.building_id,

        item_type_debug:"paf_building"
    };

    return item;
}