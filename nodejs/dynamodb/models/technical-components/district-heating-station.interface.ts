import { TechnicalComponentBase } from "../base";

export interface DistrictHeatingStation extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { district_heating_station_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    
    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    district_heating_station_id: string,

    district_heating_station_info: {
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