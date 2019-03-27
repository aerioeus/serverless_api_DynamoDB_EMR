import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface DistrictHeatingStation extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { district_heating_station_id }
    gsi_1_sk    = { district_heating_station_info.principle }
    gsi_2_sk:   = { district_heating_station_info.capacity}
    */

    district_heating_station_id: string,
    district_heating_station_manufacturer: string,
    district_heating_station_serial_number: string,

    district_heating_station_info: {
        base_info: TechnicalComponentBase,
        principle: string,
        flow_temperature: string,
        return_temperature: string,
        temperature_difference: string,
        capacity: string,
        max_capacity: string,
        flow_rate: string,
        static_pressure: string,
        house_connection_station_comment: string
    }
}