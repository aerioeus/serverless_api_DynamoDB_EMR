import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ControlUnit, ThermoControl } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnThermoControlItems(index: number, dn: PodDistributionNetwork, childCount: number): ThermoControl[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { thermo_control_id }
    gsi_1_sk    = { thermo_control_info.thermostatic_temperature_control_type }
    gsi_2_sk:   = { thermo_control_info.response_temperature}
    */

    for (let i = index; i < index + childCount; i++){
        const thermo_control_id = `ThermoControl_${index}`;
        const thermostatic_temperature_control_type  = oneOf(["Temperaturregler (TR)", 
        "Sicherheitstemperaturwächter (STW)", "Sicherheitstemperaturbegrenzer (STB)"]);
        const response_temperature = `${1 + getRandom(4)} Bar`;

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: thermo_control_id,
            gsi_1_sk: thermostatic_temperature_control_type,
            gsi_2_sk: response_temperature,
            item_type_debug: "ThermoControl",

            thermo_control_id: thermo_control_id,
            thermo_control_manufacturer: oneOf(fakeValueArrays.manufacturers),
            thermo_control_serial_number: `2W${index}JK-2F`,
         
            thermo_control_info: {
                base_info: {
                    type_designation: "DDD123",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
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