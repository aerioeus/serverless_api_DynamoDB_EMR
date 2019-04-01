import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, DistributionBlock } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnDistributionBlockItems(start_index: number, dn: PodDistributionNetwork, childCount: number): DistributionBlock[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_block_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const distribution_block_id = `DistributionBlock_${i}`;
        const type = oneOf(["druckbehaftet", "drucklos", "ohne Hauptpumpe (Saugverteiler)", "mit Hauptpumpe (Druckverteiler)", 
        "mit Hauptpumpe und drucklosen", "Verteiler hydraulische Weiche"]);
        const component_type = "distribution_block";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: distribution_block_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: component_type,
            gsi_3_pk: component_type,
            gsi_3_sk: component_type,
            
            item_type_debug: "distribution_block",

            distribution_block_id: distribution_block_id,
            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2B`,
            component_base_info: {
                type_designation: "Sinus",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },
        
            distribution_block_info: {
                type: type,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}