import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface DistributionBlock extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { distribution_block_id }
    gsi_1_sk    = { distribution_block_info.type }
    gsi_2_sk:   = { distribution_block_info.type}
    */

    distribution_block_id: string,
    distribution_block_manufacturer: string,
    distribution_block_serial_number: string,

    distribution_block_info: {
        base_info: TechnicalComponentBase,
        type: string,
        comment: string
    }
}