import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, WaterStorage } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnWaterStorageItems(start_index: number, dn: PodDistributionNetwork, childCount: number): WaterStorage[] {
    const dbItems = [];
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { water_storage_id }
    gsi_1_sk    = { water_storage_info.storage_type }
    gsi_2_sk:   = { water_storage_info.circuit_type}
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const water_storage_id = `WaterStorage_${i}`;
        const storage_type  = oneOf(["Speichersystem", "Speicherladesystem"]);
        const circuit_type = oneOf(["Reihenschaltung", "Parallelschaltung"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: water_storage_id,
            gsi_1_sk: storage_type ,
            gsi_2_sk: circuit_type,
            item_type_debug: "WaterStorage",

            water_storage_id: water_storage_id,
            water_storage_manufacturer: oneOf(fakeValueArrays.manufacturers),
            water_storage_serial_number: `2W${i}JK-2N`,
         
            water_storage_info: {
                base_info: {
                    type_designation: "HPS 300",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                
                storage_type: storage_type,
                use_case: oneOf(["Trinkwasserbereitung", "Heizwasserbereitung"]),
                statutory_temperature_specification: `${20 + getRandom(70)} °C`,
                leading_storage: oneOfYesNo(),
                circuit_type: circuit_type,
                storage_volume: `${100 + getRandom(300)} l`,
                nl_number: getRandom(70).toString(),
                material: oneOf(["Edelstahl", "Kupfer", "Stahl (kunststoffbeschichtet)"]),
                continuous_output: `${1 + getRandom(5)} kW`,
                peak_output: `${1 + getRandom(5)} kW`,
                switch_on_sensor_position: oneOf(["Drittel", "Mitte", "unteres Drittel"]),
                switch_on_sensor_hysteresis: "middle",
                switch_off_sensor_position: oneOf(["Drittel", "Mitte", "unteres Drittel"]),
                switch_off_sensor_hysteresis: "middle",
                reference_sensor_position: oneOf(["Drittel", "Mitte", "unteres Drittel"]),
                comment: "lorem ipsum"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}