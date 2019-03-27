import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom } from "../factory.utils";
import { Building, BuildingEntrance } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewBuildingEntranceItems(index: any, building: Building, childCount: number): BuildingEntrance[] {
    const dbItems = [];

    for (let i = index; i < index + childCount; i++){
        const entrance_id = `Ent_${index}`;
        const entrance_street = oneOf(fakeValueArrays.streets);
        const entrance_place = oneOf(fakeValueArrays.cities);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: building.building_id,
            sk: entrance_id,
            gsi_1_sk: entrance_street,
            gsi_2_sk: entrance_place,
            item_type_debug: "BuildingEntrance",
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