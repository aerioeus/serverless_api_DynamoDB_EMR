import { TechnicalComponentBase } from "../base";

export interface ThermoControl extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { thermo_control_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */
   
    thermo_control_id: string,

    thermo_control_info: {
        thermostatic_temperature_control_type: string,
        response_temperature: string,
        DN: string,
        comment: string
    }
}