import { TechnicalComponentBase } from "../base";

export interface HydraulicSwitch extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { hydraulic_switch_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type}
    */
    hydraulic_switch_id: string, 
     
    hydraulic_switch_info: {
        pipe_cross_section: string, 
        comment: string 
    }
}