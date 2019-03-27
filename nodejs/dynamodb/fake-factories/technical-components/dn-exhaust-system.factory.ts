import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ExhaustSystem } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnExhaustSystemItems(index: number, dn: PodDistributionNetwork, childCount: number): ExhaustSystem[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { exhaust_system_id }
    gsi_1_sk    = { exhaust_system_info.dimension }
    gsi_2_sk:   = { exhaust_system_info.air}
    */

    for (let i = index; i < index + childCount; i++){
        const exhaust_system_id = `ExhaustSystem_${index}`;
        const dimension  = getRandom(200).toString();
        const air = oneOfYesNo();

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: exhaust_system_id,
            gsi_1_sk: dimension ,
            gsi_2_sk: air,
            item_type_debug: "ControlUnit",

            exhaust_system_id: exhaust_system_id,
            exhaust_system_manufacturer: oneOf(fakeValueArrays.manufacturers),
            exhaust_system_serial_number: `2W${index}JK-2Z`,
            exhaust_system_material: "copper",
            
            exhaust_system_info: {
                base_info: {
                    type_designation: "Z7 / FU",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                dimension: dimension,
                air: air ,
                comment: "lorem ipsum dolor sit amet"
            }
         }

        dbItems.push(dbItem);
    }

    return dbItems;
}