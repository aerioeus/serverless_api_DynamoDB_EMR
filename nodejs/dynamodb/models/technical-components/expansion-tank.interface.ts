import { TechnicalComponentBase } from "../base";

export interface ExpansionTank extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { expansion_tank_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */
    expansion_tank_id: string,

    expansion_tank_info: {
        volume: string,
        system_pressure: string,
        comment: string,
        type: string
    }
}