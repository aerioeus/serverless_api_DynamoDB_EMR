import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, FuelTank } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnFuelTankItems(index: number, dn: PodDistributionNetwork, childCount: number): FuelTank[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { fuel_tank_id }
    gsi_1_sk    = { fuel_tank_info.type }
    gsi_2_sk:   = { fuel_tank_info.fuel_category}
    */

    for (let i = index; i < index + childCount; i++){
        const fuel_tank_id = `ControlUnit_${index}`;
        const type  = oneOf(["metal", "copper", "steel"]);
        const fuel_category = oneOf(fakeValueArrays.fuel_categories);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: fuel_tank_id,
            gsi_1_sk: type ,
            gsi_2_sk: fuel_category,
            item_type_debug: "ControlUnit",

            fuel_tank_id: fuel_tank_id,
            fuel_tank_manufacturer: oneOf(fakeValueArrays.manufacturers),
            fuel_tank_serial_number: `2W${index}JK-2J`,
         
            fuel_tank_info: {
                base_info: {
                    type_designation: "Gas Line 2000",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
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