import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface WaterStorage extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { water_storage_id }
    gsi_1_sk    = { water_storage_info.storage_type }
    gsi_2_sk:   = { water_storage_info.circuit_type}
    */

    water_storage_id: string,
    water_storage_manufacturer: string,
    water_storage_serial_number: string,

    water_storage_info: {
        base_info: TechnicalComponentBase,
        
        storage_type: string,
        use_case: string,
        statutory_temperature_specification: string,
        leading_storage: string,
        circuit_type: string,
        storage_volume: string,
        nl_number: string,
        material: string,
        continuous_output: string,
        peak_output: string,
        switch_on_sensor_position: string,
        switch_on_sensor_hysteresis: string,
        switch_off_sensor_position: string,
        switch_off_sensor_hysteresis: string,
        reference_sensor_position: string,
        comment: string
    }
}