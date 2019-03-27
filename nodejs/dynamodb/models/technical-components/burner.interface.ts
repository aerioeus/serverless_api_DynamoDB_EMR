import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface Burner extends ItemBase
{
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { burner_id }
    gsi_1_sk    = { burner_info.operation_mode }
    gsi_2_sk:   = { burner_info.capacity}
    */

    burner_id: string,
    burner_manufacturer: string,
    burner_serial_number: string,

    burner_info: {
        base_info: TechnicalComponentBase,
        operation_mode: string,
        capacity: string,
        adjusted_capacity: string,
        interface_protocol: string,
        oil_jet_size: string,
        oil_jet_pressure: string,
        combustion_type: string,
        combustion_air_supply: string,
        lower_modulation_limit: string,
        comment: string
    }
}