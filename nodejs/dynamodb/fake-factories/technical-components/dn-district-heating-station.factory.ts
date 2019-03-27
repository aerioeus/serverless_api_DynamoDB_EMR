import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, DistributionBlock, DistrictHeatingStation } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnDistrictHeatingStationItems(start_index: number, dn: PodDistributionNetwork, childCount: number): DistrictHeatingStation[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { district_heating_station_id }
    gsi_1_sk    = { district_heating_station_info.principle }
    gsi_2_sk:   = { district_heating_station_info.capacity}
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const district_heating_station_id = `DistrictHeatingStation_${i}`;
        const principle = oneOf(["druckbehaftet", "drucklos", "ohne Hauptpumpe (Saugverteiler)", "mit Hauptpumpe (Druckverteiler)", 
        "mit Hauptpumpe und drucklosen", "Verteiler hydraulische Weiche"]);
        const capacity = `${200 + getRandom(300)} kW`;

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: district_heating_station_id,
            gsi_1_sk: principle,
            gsi_2_sk: capacity,
            item_type_debug: "DistrictHeatingStation",

            district_heating_station_id: district_heating_station_id,
            district_heating_station_manufacturer: oneOf(fakeValueArrays.manufacturers),
            district_heating_station_serial_number: `2W${i}JK-2C`,
        
            district_heating_station_info: {
                base_info: {
                    type_designation: "None",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                principle: principle,
                flow_temperature: `${getRandom(120)}°C`,
                return_temperature: `${getRandom(60)}°C`,
                temperature_difference: `${getRandom(60)}°C`,
                capacity: capacity,
                max_capacity: `${200 + getRandom(300)} kW`,
                flow_rate: `${getRandom(10)} m³/h`,
                static_pressure: `${getRandom(10)} bar`,
                house_connection_station_comment: "lorem ipsum dolor sit amet",
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}