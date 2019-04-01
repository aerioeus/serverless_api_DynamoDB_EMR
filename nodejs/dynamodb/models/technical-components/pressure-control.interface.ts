import { TechnicalComponentBase } from "../base";


export interface PressureControl extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { pressure_control_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */
    pressure_control_id: string,
    
    pressure_control_info: {
        physical_pressure_control_type: string,
        response_pressure: string,
        DN: string,
        comment: string
    }
}