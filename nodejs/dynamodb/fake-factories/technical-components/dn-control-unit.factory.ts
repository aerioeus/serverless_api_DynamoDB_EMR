import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ControlUnit } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnControlUnitItems(index: number, dn: PodDistributionNetwork, childCount: number): ControlUnit[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { control_unit_id }
    gsi_1_sk    = { control_unit_info.operation_mode }
    gsi_2_sk:   = { control_unit_info.analog_digital}
    */


    for (let i = index; i < index + childCount; i++){
        const control_unit_id = `ControlUnit_${index}`;
        const operation_mode  = oneOf(["Tag", "Nacht", "Auto", "kein Programm"]);
        const analog_digital = oneOf(["analog", "digital"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: control_unit_id,
            gsi_1_sk: operation_mode ,
            gsi_2_sk: analog_digital,
            item_type_debug: "ControlUnit",

            control_unit_id: control_unit_id,
            control_unit_manufacturer: oneOf(fakeValueArrays.manufacturers),
            control_unit_serial_number: `2W${index}JK-2A`,
        
            control_unit_info: {
                base_info: {
                    type_designation: "R4311",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
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