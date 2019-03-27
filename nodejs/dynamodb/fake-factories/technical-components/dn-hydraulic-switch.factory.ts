import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, ControlUnit, HydraulicSwitch } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnHydraulicSwitchItems(index: number, dn: PodDistributionNetwork, childCount: number): HydraulicSwitch[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { hydraulic_switch_id }
    gsi_1_sk    = { hydraulic_switch_info.pipe_cross_section }
    gsi_2_sk:   = { hydraulic_switch_info.pipe_cross_section}
    */

    for (let i = index; i < index + childCount; i++){
        const hydraulic_switch_id = `HydraulicSwitch_${index}`;
        const pipe_cross_section  = `${10+getRandom(30)} DN`;

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: hydraulic_switch_id,
            gsi_1_sk: pipe_cross_section ,
            gsi_2_sk: pipe_cross_section,
            item_type_debug: "HydraulicSwitch",

            hydraulic_switch_id: hydraulic_switch_id, 
            hydraulic_switch_manufacturer: oneOf(fakeValueArrays.manufacturers), 
            hydraulic_switch_serial_number: `2W${index}JK-2F`,
             
            hydraulic_switch_info: {
                base_info: {
                    type_designation: "WST",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                pipe_cross_section: pipe_cross_section, 
                comment: "lorem ipsum dolor sit amet" 
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}