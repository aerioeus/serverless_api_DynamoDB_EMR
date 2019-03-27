import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ControlUnit, PressureControl } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnPressureControlItems(index: number, dn: PodDistributionNetwork, childCount: number): PressureControl[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { pressure_control_id }
    gsi_1_sk    = { pressure_control_info.response_pressure }
    gsi_2_sk:   = { pressure_control_info.physical_pressure_control_type}
    */

    for (let i = index; i < index + childCount; i++){
        const pressure_control_id = `PressureControl_${index}`;
        const response_pressure  = `${1 + getRandom(6)} Bar`;
        const DN = `${10 + getRandom(50)} DN`;

        const physical_pressure_control_type = oneOf(["minimal Druckbegrenzer (DBmin)", 
        "maximal Druckbegrenzer (DBmax)", "Sicherheitsabsperrventil (SAV)", "Sicherheitsüberstromventil (SÜV)", "Sicherheitsventil (SV)", "Wassermangel Sicherung"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: pressure_control_id,
            gsi_1_sk: response_pressure ,
            gsi_2_sk: physical_pressure_control_type,
            item_type_debug: "PressureControl",

            pressure_control_id: pressure_control_id,
            pressure_control_manufacturer: oneOf(fakeValueArrays.manufacturers),
            pressure_control_serial_number: `2W${index}JK-2X`,

            pressure_control_info: {
                base_info: {
                    type_designation: "DSH143",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
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