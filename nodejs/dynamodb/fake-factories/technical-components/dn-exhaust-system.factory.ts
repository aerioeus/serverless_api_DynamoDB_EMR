import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ExhaustSystem } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnExhaustSystemItems(start_index: number, dn: PodDistributionNetwork, childCount: number): ExhaustSystem[] {
    const dbItems = [];
        /**
     ItemBase overrides

    pk_id       = { exhaust_system_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const exhaust_system_id = `ExhaustSystem_${i}`;
        const dimension  = getRandom(200).toString();
        const air = oneOfYesNo();
        const component_type = "exhaust_system";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: exhaust_system_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,
            gsi_2_sk: component_type,
            item_type_debug: "exhaust_system",

            exhaust_system_id: exhaust_system_id,
            component_type:component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2Z`,
            component_base_info: {
                type_designation: "Z7 / FU",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },

            exhaust_system_info: {
                material: "copper",
                dimension: dimension,
                air: air ,
                comment: "lorem ipsum dolor sit amet"
            }
         }

        dbItems.push(dbItem);
    }

    return dbItems;
}