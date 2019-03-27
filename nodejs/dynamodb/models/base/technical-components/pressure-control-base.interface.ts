import { TechComponentBase } from "./technical-component-base.interface";

export interface PressureControlBase {
    pressure_control_id: string,
    pressure_control_manufacturer: string,
    pressure_control_serial_number: string,
    pressure_control_physical_type: string,
    pressure_control_info: {
        pressure_control_info_base: TechComponentBase,
        pressure_control_response_pressure: string,
        pressure_control_DN: string,
        pressure_control_comment: string
    }
}