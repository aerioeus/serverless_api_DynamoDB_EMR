import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface HydraulicSwitch extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { hydraulic_switch_id }
    gsi_1_sk    = { hydraulic_switch_info.pipe_cross_section }
    gsi_2_sk:   = { hydraulic_switch_info.pipe_cross_section}
    */
    hydraulic_switch_id: string, 
    hydraulic_switch_manufacturer: string, 
    hydraulic_switch_serial_number: string,
     
    hydraulic_switch_info: {
        base_info: TechnicalComponentBase,
        pipe_cross_section: string, 
        comment: string 
    }
}