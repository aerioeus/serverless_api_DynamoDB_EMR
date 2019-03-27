import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { PodDistributionNetwork, Actuator } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnActuatorItems(start_index: number, dn: PodDistributionNetwork, childCount: number): Actuator[] {
    const dbItems = [];

    /**
         ItemBase overrides

        pk_id       = { distribution_network_id }
        sk          = { actuator_id }
        gsi_1_sk    = { actuator_info.power_supply_voltage }
        gsi_2_sk:   = { actuator_info.operating_principle }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const actuator_id = `Actuator_${i}`;
        const power_supply_voltage  = oneOf(["220 V", "230 V"]);
        const operating_principle = oneOf(["elektrisch", "thermostatisch"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: actuator_id,
            gsi_1_sk: power_supply_voltage,
            gsi_2_sk: operating_principle,
            item_type_debug: "Actuator",

            actuator_id: actuator_id,
            actuator_manufacturer: oneOf(fakeValueArrays.manufacturers),
            actuator_serial_number: `RHQQ-W*34${i}/`,
         
            actuator_info: {
                base_info: {
                    type_designation: "VMM20",
                    list_price_net: `\$${100+getRandom(400)}`,
                    purchase_price_net: `\$${100+getRandom(400)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                power_supply_voltage: power_supply_voltage,
                operating_principle: operating_principle,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}
