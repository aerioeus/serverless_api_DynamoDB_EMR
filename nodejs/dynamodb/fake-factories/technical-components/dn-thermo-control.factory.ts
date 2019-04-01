import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ControlUnit, ThermoControl } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnThermoControlItems(start_index: number, dn: PodDistributionNetwork, childCount: number): ThermoControl[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { thermo_control_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const thermo_control_id = `ThermoControl_${i}`;
        const thermostatic_temperature_control_type  = oneOf(["Temperaturregler (TR)", 
        "Sicherheitstemperaturwächter (STW)", "Sicherheitstemperaturbegrenzer (STB)"]);
        const response_temperature = `${1 + getRandom(4)} Bar`;
        const component_type = "thermo_control";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: thermo_control_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: component_type,
            gsi_3_pk: component_type,
            gsi_3_sk: component_type,
            
            item_type_debug: "thermo_control",

            thermo_control_id: thermo_control_id,
            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2F`,
            component_base_info: {
                type_designation: "DDD123",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },
         
            thermo_control_info: {
                thermostatic_temperature_control_type: thermostatic_temperature_control_type,
                response_temperature: response_temperature,
                DN: `${20+getRandom(40)} DN`,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}