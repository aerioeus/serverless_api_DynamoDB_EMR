import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface FuelTank extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { fuel_tank_id }
    gsi_1_sk    = { fuel_tank_info.type }
    gsi_2_sk:   = { fuel_tank_info.fuel_category}
    */

    fuel_tank_id: string,
    fuel_tank_manufacturer: string,
    fuel_tank_serial_number: string,

    fuel_tank_info: {
        base_info: TechnicalComponentBase,
        type: string,
        number_of_segments: string,
        total_volume: string,
        installation_type: string,
        connected: string,
        fuel_category: string,
        comment: string,
    }
}