import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ControlUnit, PressureControl } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnPressureControlItems(start_index: number, dn: PodDistributionNetwork, childCount: number): PressureControl[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { pressure_control_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const pressure_control_id = `PressureControl_${i}`;
        const response_pressure  = `${1 + getRandom(6)} Bar`;
        const DN = `${10 + getRandom(50)} DN`;

        const physical_pressure_control_type = oneOf(["minimal Druckbegrenzer (DBmin)", 
        "maximal Druckbegrenzer (DBmax)", "Sicherheitsabsperrventil (SAV)", "Sicherheitsüberstromventil (SÜV)", "Sicherheitsventil (SV)", "Wassermangel Sicherung"]);

        const component_type = "pressure_control";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: pressure_control_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: component_type,
            gsi_3_pk: component_type,
            gsi_3_sk: component_type,
            
            item_type_debug: "pressure_control",

            pressure_control_id: pressure_control_id,
            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2X`,
            component_base_info: {
                type_designation: "DSH143",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },

            pressure_control_info: {
                physical_pressure_control_type: physical_pressure_control_type,
                response_pressure: response_pressure,
                DN: DN,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}