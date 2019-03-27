import { TechComponentBase } from "./technical-component-base.interface";

export interface DistributionBlockBase {
    distribution_block_id: string,
    distribution_block_manufacturer: string,
    distribution_block_serial_number: string,
    distribution_block_type: string,

    distribution_block_info: {
        distribution_block_info_base: TechComponentBase,
        distribution_block_comment: string
    }
}