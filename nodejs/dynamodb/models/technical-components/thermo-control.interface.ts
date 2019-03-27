import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface ThermoControl extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { thermo_control_id }
    gsi_1_sk    = { thermo_control_info.thermostatic_temperature_control_type }
    gsi_2_sk:   = { thermo_control_info.response_temperature}
    */
    thermo_control_id: string,
    thermo_control_manufacturer: string,
    thermo_control_serial_number: string,

    thermo_control_info: {
        base_info: TechnicalComponentBase,
        thermostatic_temperature_control_type: string,
        response_temperature: string,
        DN: string,
        comment: string
    }
}