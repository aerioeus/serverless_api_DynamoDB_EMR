import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, getRandomFloat } from "../factory.utils";
import { PodDistributionNetwork, CirculationPump } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnCirculationPumpItems(index: number, dn: PodDistributionNetwork, childCount: number): CirculationPump[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { circulation_pump_id }
    gsi_1_sk    = { circulation_pump_info.control_type }
    gsi_2_sk:   = { circulation_pump_info.user_case_pump}
    */

    for (let i = index; i < index + childCount; i++){
        const circulation_pump_id = `CirculationPump_${index}`;
        const control_type  = oneOf(["auto", "delta_p-c konstant", "delta_p-c V-variabel", "delta_p-c T-aussentemperaturgeführte", "differenzdruckregeleung", "delta_p-c T-spreizungsgeführte"]);
        const user_case_pump = oneOf(["Kesselkreis", "Rücklaufanhebung", "Warmwasserspeicherladung", "Warmwasserspeicherladung-primär", 
        "Warmwasserspeicherladung-sekundär", "Solarspeicherladung-primär", "Solarspeicherladung-sekundär"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: circulation_pump_id,
            gsi_1_sk: control_type,
            gsi_2_sk: user_case_pump,
            item_type_debug: "CirculationPump",

            circulation_pump_id: circulation_pump_id,
            circulation_pump_manufacturer: oneOf(fakeValueArrays.manufacturers),
            circulation_pump_serial_number: `RHQQ-W*34${index}/`,
         
            circulation_pump_info: {
                base_info: {
                    type_designation: "Magna3",
                    list_price_net: `\$${1000+getRandom(4000)}`,
                    purchase_price_net: `\$${1000+getRandom(4000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },

                interface_protocol: "Genibus",
                analog_digital: "digital",
                use_case_pump: user_case_pump,
                control_type: control_type,
                calculated_heigth: `${1 + getRandomFloat(4)} m`,
                operating_hours_per_year: `${1000 + getRandom(3000)} h`,
                pn: getRandom(50).toString(),
                max_height: `${1 + getRandom(4)} m`,
                max_flow_rate: `${100 + getRandom(400)} l`,
                fitting_length: `${100 + getRandom(200)} mm`,
                material: "copper",
                electrical_power_input: "24 v",
                p1_min: "5 W",
                p1_max: "30 W",
                readable: oneOf(["yes", "no"]),
                comment: "lorem ipsum",
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}