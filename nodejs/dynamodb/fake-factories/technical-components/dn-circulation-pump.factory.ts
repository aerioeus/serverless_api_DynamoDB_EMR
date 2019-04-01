import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, getRandomFloat } from "../factory.utils";
import { PodDistributionNetwork, CirculationPump } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnCirculationPumpItems(start_index: number, dn: PodDistributionNetwork, childCount: number): CirculationPump[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { circulation_pump_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }

    */

    for (let i = start_index; i < start_index + childCount; i++){
        const circulation_pump_id = `CirculationPump_${i}`;
        const control_type  = oneOf(["auto", "delta_p-c konstant", "delta_p-c V-variabel", "delta_p-c T-aussentemperaturgeführte", "differenzdruckregeleung", "delta_p-c T-spreizungsgeführte"]);
        const user_case_pump = oneOf(["Kesselkreis", "Rücklaufanhebung", "Warmwasserspeicherladung", "Warmwasserspeicherladung-primär", 
        "Warmwasserspeicherladung-sekundär", "Solarspeicherladung-primär", "Solarspeicherladung-sekundär"]);
        const component_type = "circulation_pump";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: circulation_pump_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: component_type,
            gsi_3_pk: component_type,
            gsi_3_sk: component_type,

            item_type_debug: "circulation_pump",

            circulation_pump_id: circulation_pump_id,

            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `RHQQ-W*34${i}/`,
            component_base_info: {
                    type_designation: "Magna3",
                    list_price_net: `\$${1000+getRandom(4000)}`,
                    purchase_price_net: `\$${1000+getRandom(4000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
         
            circulation_pump_info: {
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