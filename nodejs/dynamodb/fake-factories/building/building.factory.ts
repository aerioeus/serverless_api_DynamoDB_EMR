import { getCurrentDateTimeLikeAws, oneOf, getRandomFloat, getRandom, getNewGuid, getRandomDate } from "../factory.utils";
import { fakeValueArrays } from '../fake-value.arrays';
import { Building } from "../../models";

export function getNewBuildingItem(index:any): Building {

    const building_id = `B-${index}`;
    const appartments = getRandom(256);
    const heatArea = getRandom(2000);

    const item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: building_id,
        sk: "Building",
        gsi_1_sk: appartments.toString(),
        gsi_2_sk: heatArea.toString(),
        item_type_debug: "Building",
        building_id: building_id,
        building_name: `bilding #${building_id}`,
        building_street: oneOf(fakeValueArrays.streets),
        building_street_number: getRandom(256).toString(),
        building_zip_code: `10${index}`,
        building_place: oneOf(fakeValueArrays.cities),
        building_heating_area_total: heatArea,
        building_category: oneOf(fakeValueArrays.building_categories),
        building_year: 1930 + getRandom(87),
        building_number_of_entrances: getRandom(8),
        building_number_of_floors: getRandom(20),
        building_number_of_apartments: appartments,
        building_comment: `Some beautiful building #${index}`
    };

    return item;
}