import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface PressureControl extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { pressure_control_id }
    gsi_1_sk    = { pressure_control_info.response_pressure }
    gsi_2_sk:   = { pressure_control_info.physical_pressure_control_type}
    */
    pressure_control_id: string,
    pressure_control_manufacturer: string,
    pressure_control_serial_number: string,
    
    pressure_control_info: {
        base_info: TechnicalComponentBase,
        physical_pressure_control_type: string,
        response_pressure: string,
        DN: string,
        comment: string
    }
}