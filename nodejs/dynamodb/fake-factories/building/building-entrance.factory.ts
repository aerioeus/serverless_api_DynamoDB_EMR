import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom } from "../factory.utils";
import { Building, BuildingEntrance } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

    /**
     ItemBase overrides

    pk_id       = { building_id }
    sk          = { entrance_id }
    gsi_1_sk    = { entrance_id }
    gsi_2_pk:   = { building_id  }
    gsi_2_sk:   = { entrance_street }
    gsi_3_pk:   = { building_place }
    gsi_3_sk:   = { building_place }
    */

export function getNewBuildingEntranceItems(start_Index: any, building: Building, childCount: number): BuildingEntrance[] {
    const dbItems = [];

    for (let index = start_Index; index < start_Index + childCount; index++){
        const entrance_id = `Ent_${index}`;
        const entrance_street = oneOf(fakeValueArrays.streets);
        const entrance_place = oneOf(fakeValueArrays.cities);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: building.building_id,
            sk: entrance_id,
            gsi_1_sk: entrance_id,
            gsi_2_pk: building.building_id,
            gsi_2_sk: entrance_street,
            gsi_3_pk: entrance_id,
            gsi_3_sk: entrance_id,

            item_type_debug: "building_entrance",
            entrance_id: entrance_id,
            entrance_description: `Description of entrance #${entrance_id}`,
            entrance_street: entrance_street,
            entrance_street_number: getRandom(256).toString(),
            entrance_zip_code: `10${index}`,
            entrance_place: entrance_place
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}