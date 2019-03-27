import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface ExhaustSystem extends ItemBase {
        /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { exhaust_system_id }
    gsi_1_sk    = { exhaust_system_info.dimension }
    gsi_2_sk:   = { exhaust_system_info.air}
    */

    exhaust_system_id: string,
    exhaust_system_manufacturer: string,
    exhaust_system_serial_number: string,
    exhaust_system_material: string,
    
    exhaust_system_info: {
        base_info: TechnicalComponentBase,
        dimension: string,
        air: string,
        comment: string
    }
}