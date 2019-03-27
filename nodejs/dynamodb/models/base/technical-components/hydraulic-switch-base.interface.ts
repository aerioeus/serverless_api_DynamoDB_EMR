import { TechComponentBase } from "./technical-component-base.interface";

export interface HydraulicSwitchBase {
    hydraulic_switch_id: string, 
    hydraulic_switch_manufacturer: string, 
    hydraulic_switch_serial_number: string, 
    hydraulic_switch_info: {
        hydraulic_switch_info_base: TechComponentBase,
        hydraulic_switch_pipe_cross_section: string, 
        hydraulic_switch_comment: string 
    }
}