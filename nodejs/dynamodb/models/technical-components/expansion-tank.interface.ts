import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface ExpansionTank extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { expansion_tank_id }
    gsi_1_sk    = { expansion_tank_info.volume }
    gsi_2_sk:   = { expansion_tank_info.type}
    */
    expansion_tank_id: string,
    expansion_tank_manufacturer: string,
    expansion_tank_serial_number: string,

    expansion_tank_info: {
        base_info: TechnicalComponentBase,
        volume: string,
        system_pressure: string,
        type: string,
        comment: string
    }
}