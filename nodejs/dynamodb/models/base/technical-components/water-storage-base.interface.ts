import { TechComponentBase } from "./technical-component-base.interface";

export interface WaterStorage {
    water_storage_id: string,
    water_storage_manufacturer: string,
    water_storage_serial_number: string,

    water_storage_info: {
        water_storage_info_base: TechComponentBase,
        
        water_storage_storage_type: string,
        water_storage_use_case: string,
        water_storage_statutory_temperature_specification: string,
        water_storage_leading_storage: string,
        water_storage_circuit_type: string,
        water_storage_storage_volume: string,
        water_storage_nl_number: string,
        water_storage_material: string,
        water_storage_continuous_output: string,
        water_storage_peak_output: string,
        water_storage_switch_on_sensor_position: string,
        water_storage_switch_on_sensor_hysteresis: string,
        water_storage_switch_off_sensor_position: string,
        water_storage_switch_off_sensor_hysteresis: string,
        water_storage_reference_sensor_position: string,
        water_storage_comment: string
    }
}