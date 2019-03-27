import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { PodDistributionNetwork, Burner } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnBurnerItems(index: number, dn: PodDistributionNetwork, childCount: number): Burner[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { burner_id }
    gsi_1_sk    = { burner_info.operation_mode }
    gsi_2_sk:   = { burner_info.capacity}
    */

    for (let i = index; i < index + childCount; i++){
        const burner_id = `Burner_${index}`;
        const operation_mode  = oneOf(["einstufig", "zweistufig", "dreistufig", "modulierend"]);
        const capacity = `${500+getRandom(500)} kW`;

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: burner_id,
            gsi_1_sk: operation_mode ,
            gsi_2_sk: capacity,
            item_type_debug: "Burner",

            burner_id: burner_id,
            burner_manufacturer: oneOf(fakeValueArrays.manufacturers),
            burner_serial_number: `2W${index}K-2A`,
         
            burner_info: {
                base_info: {
                    type_designation: "G5/1-DZD",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                operation_mode: operation_mode ,
                capacity: capacity,
                adjusted_capacity: `${400+getRandom(400)} kW`,
                interface_protocol: "modbus rs485",
                oil_jet_size: "no data",
                oil_jet_pressure: "no data",
                combustion_type: "LAS",
                combustion_air_supply: "room-air-dependent",
                lower_modulation_limit: "0",
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}