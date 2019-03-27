import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo, getRandomFloat } from "../factory.utils";
import { PodDistributionNetwork } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";
import { ExpansionTank } from "../../models/technical-components/expansion-tank.interface";

export function getNewDnExpansionTankItems(index: number, dn: PodDistributionNetwork, childCount: number): ExpansionTank[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { expansion_tank_id }
    gsi_1_sk    = { expansion_tank_info.volume }
    gsi_2_sk:   = { expansion_tank_info.type}
    */

    for (let i = index; i < index + childCount; i++){
        const expansion_tank_id = `ExpansionTank_${index}`;
        const volume  = getRandom(500).toString();
        const type = oneOf(["MAG", "Pumpen Druckhaltung", "Kompressordruckhaltung"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: expansion_tank_id,
            gsi_1_sk: volume ,
            gsi_2_sk: type,
            item_type_debug: "ControlUnit",

            expansion_tank_id: expansion_tank_id,
            expansion_tank_manufacturer: oneOf(fakeValueArrays.manufacturers),
            expansion_tank_serial_number: `2W${index}JK-2Y`,
         
            expansion_tank_info: {
                base_info: {
                    type_designation: "N400",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
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