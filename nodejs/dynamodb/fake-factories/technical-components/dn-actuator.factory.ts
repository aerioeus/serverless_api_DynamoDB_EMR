import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { PodDistributionNetwork, Actuator } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnActuatorItems(start_index: number, dn: PodDistributionNetwork, childCount: number): Actuator[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { actuator_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { operating_principle }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { power_supply_voltage }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const actuator_id = `Actuator_${i}`;
        const power_supply_voltage  = oneOf(["220 V", "230 V"]);
        const operating_principle = oneOf(["elektrisch", "thermostatisch"]);
        const component_type = "actuator";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: actuator_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: operating_principle,
            gsi_3_pk: component_type,
            gsi_3_sk: power_supply_voltage,

            component_type: component_type,
            item_type_debug: "actuator",

            actuator_id: actuator_id,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `RHQQ-W*34${i}/`,
            component_base_info: {
                        type_designation: "VMM20",
                        list_price_net: `\$${100+getRandom(400)}`,
                        purchase_price_net: `\$${100+getRandom(400)}`,
                        purchase_date: getRandomDate(1998, 10),
                        purchase_from: oneOf(fakeValueArrays.manufacturers),
                        warranty_until: getRandomDate(2003, 15),
                        installation_date: getRandomDate(2003, 10)
                    },
            actuator_info: {
                power_supply_voltage: power_supply_voltage,
                operating_principle: operating_principle,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}
