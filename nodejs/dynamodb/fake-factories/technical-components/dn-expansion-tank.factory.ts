import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo, getRandomFloat } from "../factory.utils";
import { PodDistributionNetwork } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";
import { ExpansionTank } from "../../models/technical-components/expansion-tank.interface";

export function getNewDnExpansionTankItems(start_index: number, dn: PodDistributionNetwork, childCount: number): ExpansionTank[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { expansion_tank_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */
    for (let i = start_index; i < start_index + childCount; i++){
        const expansion_tank_id = `ExpansionTank_${i}`;
        const volume  = getRandom(500).toString();
        const type = oneOf(["MAG", "Pumpen Druckhaltung", "Kompressordruckhaltung"]);
        const component_type = "expansion_tank";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: expansion_tank_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: component_type,
            gsi_3_pk: component_type,
            gsi_3_sk: component_type,

            item_type_debug: "expansion_tank",

            expansion_tank_id: expansion_tank_id,
            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2Y`,
            component_base_info: {
                type_designation: "N400",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },
         
            expansion_tank_info: {
                volume: volume,
                system_pressure: `${getRandomFloat(3)} Bar`,
                type: type,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}