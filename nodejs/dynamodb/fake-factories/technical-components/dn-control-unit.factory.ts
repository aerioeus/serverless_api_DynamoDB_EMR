import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ControlUnit } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnControlUnitItems(start_index: number, dn: PodDistributionNetwork, childCount: number): ControlUnit[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { control_unit_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const control_unit_id = `ControlUnit_${i}`;
        const operation_mode  = oneOf(["Tag", "Nacht", "Auto", "kein Programm"]);
        const analog_digital = oneOf(["analog", "digital"]);
        const component_type = "control_unit";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: control_unit_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,
            gsi_2_sk: component_type,
            item_type_debug: "control_unit",

            control_unit_id: control_unit_id,

            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2A`,
            component_base_info: {
                    type_designation: "R4311",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
        
            control_unit_info: {
                operation_mode: operation_mode,
                interface_protocol: "unknown",
                analog_digital: analog_digital,
                remote_control: oneOfYesNo(),
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}