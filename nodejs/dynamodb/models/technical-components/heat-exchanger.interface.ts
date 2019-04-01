import { TechnicalComponentBase } from "../base";

export interface HeatExchanger extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { heat_exchanger_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    heat_exchanger_id: string,

    heat_exchanger_info:{
        model: string,
        standard_capacity: string,
        primary_volume_flow_manufacturer_value: string,
        primary_entry_temperature_manufacturer_value: string,
        primary_exit_temperature_manufacturer_value: string,
        secondary_volume_flow_manufacturer_value: string,
        secondary_entry_temperature_manufacturer_value: string,
        secondary_exit_temperature_manufacturer_value: string,
        principle: string,
        comment: string,
    }
}