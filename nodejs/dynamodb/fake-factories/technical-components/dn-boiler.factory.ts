import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate } from "../factory.utils";
import { PodDistributionNetwork, Boiler } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnBoilerItems(start_index: number, dn: PodDistributionNetwork, childCount: number): Boiler[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { boiler_id }
    gsi_1_sk    = { boiler_info.fuel_category }
    gsi_2_sk:   = { boiler_info.efficency }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const boiler_id = `Boiler_${i}`;
        const fuel_category = oneOf(fakeValueArrays.fuel_categories);
        const boiler_efficency = `${50+getRandom(50)}%`;

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: boiler_id,
            gsi_1_sk: fuel_category,
            gsi_2_sk: boiler_efficency,
            item_type_debug: "Boiler",
            boiler_id: boiler_id,
            boiler_manufacturer: oneOf(fakeValueArrays.manufacturers),
            boiler_serial_number: `12Z4K212${i}`,   
        
            boiler_info: {
                base_info: {
                    type_designation: "Logano Plus SE625",
                    list_price_net: `\$${100+getRandom(4000)}`,
                    purchase_price_net: `\$${100+getRandom(4000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                fuel_category: fuel_category,
                boiler_type: oneOf(["Niedertemperatur", "Brennwert"]),
                boiler_efficency: boiler_efficency,
                interface_protocol: "proprietary protocol",
                burner_intern: oneOf(["yes","no"]),
                max_capacity: `${400+getRandom(400)} kW`,
                water_volume: `${getRandom(1122)} liter`,
                length: `${500+getRandom(500)} mm`,
                width: `${500+getRandom(500)} mm`,
                heigth: `${500+getRandom(500)} mm`,
                radiation_losses: `${5+getRandom(10)}%`,
                heat_input: `${200+getRandom(200)} kW`,
                stand_by_loss: `${1+getRandom(5)}%`,
                material: oneOf(["Gusseisen", "Stahl", "Edelstahl"]),
                heat_exchanger: oneOf(["yes","no"]),
                technical_design: "no data",
                combustion_efficency:  `${70+getRandom(20)}%`,
                minimum_volume_flow: `${100+getRandom(50)} l/h`,
                minimum_return_flow_value: `${50+getRandom(40)} l/h`,
                internal_pump: oneOf(["yes","no"]),
                cascade: oneOf(["yes","no"]),
                multi_boiler_system: oneOf(["yes","no"]),
                exhaust_gas_loss: `${5+getRandom(10)}%`,
                heat_exchanger_principle: oneOf(["Gleichstrom", "Gegenstrom", "Kreuzstrom", "unbekannt"]),
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}