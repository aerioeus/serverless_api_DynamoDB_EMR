import { TechnicalComponentBase } from "../base";

export interface FuelTank extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { fuel_tank_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */

    fuel_tank_id: string,

    fuel_tank_info: {
        number_of_segments: string,
        total_volume: string,
        installation_type: string,
        connected: string,
        fuel_category: string,
        comment: string,
        type: string
    }
}