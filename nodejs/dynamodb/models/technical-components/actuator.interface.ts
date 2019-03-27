import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface Actuator extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { actuator_id }
    gsi_1_sk    = { actuator_info.power_supply_voltage }
    gsi_2_sk:   = { actuator_info.operating_principle }
    */

    actuator_id: string,
    actuator_manufacturer: string,
    actuator_serial_number: string,

    actuator_info:{
        base_info: TechnicalComponentBase,
        power_supply_voltage: string
        operating_principle: string,
        comment: string
    }
}