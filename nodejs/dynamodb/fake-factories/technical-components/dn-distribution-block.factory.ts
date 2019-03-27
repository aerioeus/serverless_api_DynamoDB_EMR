import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, DistributionBlock } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnDistributionBlockItems(index: number, dn: PodDistributionNetwork, childCount: number): DistributionBlock[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { distribution_block_id }
    gsi_1_sk    = { distribution_block_info.type }
    gsi_2_sk:   = { distribution_block_info.type}
    */
    for (let i = index; i < index + childCount; i++){
        const distribution_block_id = `DistributionBlock_${index}`;
        const type = oneOf(["druckbehaftet", "drucklos", "ohne Hauptpumpe (Saugverteiler)", "mit Hauptpumpe (Druckverteiler)", 
        "mit Hauptpumpe und drucklosen", "Verteiler hydraulische Weiche"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: distribution_block_id,
            gsi_1_sk: type,
            gsi_2_sk: type,
            item_type_debug: "DistributionBlock",

            distribution_block_id: distribution_block_id,
            distribution_block_manufacturer: oneOf(fakeValueArrays.manufacturers),
            distribution_block_serial_number: `2W${index}JK-2B`,
        
            distribution_block_info: {
                base_info: {
                    type_designation: "Sinus",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                type: type,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}