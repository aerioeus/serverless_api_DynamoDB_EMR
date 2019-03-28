import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, FuelTank } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnFuelTankItems(start_index: number, dn: PodDistributionNetwork, childCount: number): FuelTank[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { fuel_tank_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const fuel_tank_id = `FuelTank_${i}`;
        const type  = oneOf(["metal", "copper", "steel"]);
        const fuel_category = oneOf(fakeValueArrays.fuel_categories);
        const component_type = "fuel-tank";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: fuel_tank_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,
            gsi_2_sk: component_type,
            item_type_debug: "fuel-tank",

            fuel_tank_id: fuel_tank_id,
            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2J`,
            component_base_info: {
                type_designation: "Gas Line 2000",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },
         
            fuel_tank_info: {
                type: type,
                number_of_segments: getRandom(5).toString(),
                total_volume: `${1000+getRandom(2500)} l`,
                installation_type: oneOf(["oberirdisch", "erdgedeckt"]),
                connected: oneOfYesNo(),
                fuel_category: fuel_category,
                comment: "lorem ipsum dolor sit amet",
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}