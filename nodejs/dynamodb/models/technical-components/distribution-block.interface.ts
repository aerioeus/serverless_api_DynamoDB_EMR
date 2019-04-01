import { TechnicalComponentBase } from "../base";

export interface DistributionBlock extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_block_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    distribution_block_id: string,

    distribution_block_info: {
        comment: string,
        type: string,
    }
}