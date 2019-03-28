import { TechnicalComponentBase } from "../base";

export interface Actuator extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { actuator_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */

    actuator_id: string,

    actuator_info:{
        power_supply_voltage: string
        operating_principle: string,
        comment: string
    }
}