import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, HeatExchanger } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnHeatExchangerItems(start_index: number, dn: PodDistributionNetwork, childCount: number): HeatExchanger[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { heat_exchanger_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const heat_exchanger_id = `HeatExchanger_${i}`;
        const standard_capacity  = `${5 + getRandom(12)} kW`;
        const principle = oneOf(["analog", "digital"]);
        const component_type = "heat_exchanger";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: heat_exchanger_id,
            sk: dn.distribution_network_id,
            gsi_1_sk:  component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: component_type,
            gsi_3_pk: component_type,
            gsi_3_sk: component_type,
            
            item_type_debug: "heat_exchanger",

            heat_exchanger_id: heat_exchanger_id,
            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers),
            component_serial_number: `2W${i}JK-2V`,
            component_base_info: {
                type_designation: "Logalux LSP",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },
         
            heat_exchanger_info:{
                model: "plate heat exchanger",
                standard_capacity: standard_capacity,
                primary_volume_flow_manufacturer_value: `${50+getRandom(50)} l`,
                primary_entry_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                primary_exit_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                secondary_volume_flow_manufacturer_value: `${20+getRandom(20)} m³`,
                secondary_entry_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                secondary_exit_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                principle: principle,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}