import { TechnicalComponentBase } from "../base";

export interface Actuator extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { actuator_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { operating_principle }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { power_supply_voltage }

    */

    actuator_id: string,

    actuator_info:{
        power_supply_voltage: string
        operating_principle: string,
        comment: string
    }
}