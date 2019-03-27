import { TechComponentBase } from "./technical-component-base.interface";

export interface ThermoControlBase {
    thermo_control_id: string,
    thermo_control_manufacturer: string,
    thermo_control_serial_number: string,
    thermo_control_sthermostatic_temperature_control_type: string,

    thermo_control_info: {
        thermo_control_info_base: TechComponentBase,
        
        thermo_control_response_temperature: string,
        thermo_control_DN: string,
        thermo_control_comment: string
    }
}