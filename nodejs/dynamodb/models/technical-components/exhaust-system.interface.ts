import { TechnicalComponentBase } from "../base";

export interface ExhaustSystem extends TechnicalComponentBase {
        /**
     ItemBase overrides

    pk_id       = { exhaust_system_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    exhaust_system_id: string,
    
    exhaust_system_info: {
        dimension: string,
        air: string,
        comment: string,
        material: string,
    }
}