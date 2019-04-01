import { TechnicalComponentBase } from "../base";

export interface Burner extends TechnicalComponentBase
{
    /**
     ItemBase overrides

    pk_id       = { burner_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_sk:   = { component_type }
    gsi_2_sk:   = { operation_mode }
    gsi_2_sk:   = { component_type }
    gsi_2_sk:   = { capacity }

    */

    burner_id: string,

    burner_info: {
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