import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface HeatExchanger extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { heat_exchanger_id }
    gsi_1_sk    = { heat_exchanger_info.standard_capacity }
    gsi_2_sk:   = { heat_exchanger_info.principle}
    */

    heat_exchanger_id: string,
    heat_exchanger_manufacturer: string,
    heat_exchanger_serial_number: string,

    heat_exchanger_info:{
        base_info: TechnicalComponentBase,
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