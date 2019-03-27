import { TechComponentBase } from "./technical-component-base.interface";

export interface DistrictHeatingStationBase {
    district_heating_station_id: string,
    district_heating_station_manufacturer: string,
    district_heating_station_serial_number: string,
    district_heating_station_principle: string,

    district_heating_station_info: {
        district_heating_station_base: TechComponentBase,
        district_heating_station_flow_temperature: string,
        district_heating_station_return_temperature: string,
        district_heating_station_temperature_difference: string,
        district_heating_station_capacity: string,
        district_heating_station_max_capacity: string,
        district_heating_station_flow_rate: string,
        district_heating_station_static_pressure: string,
        district_heating_station_house_connection_station_comment: string
    }
}