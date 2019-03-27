import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface ControlUnit extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { control_unit_id }
    gsi_1_sk    = { control_unit_info.operation_mode }
    gsi_2_sk:   = { control_unit_info.analog_digital}
    */

    control_unit_id: string,
    control_unit_manufacturer: string,
    control_unit_serial_number: string,

    control_unit_info: {
        base_info: TechnicalComponentBase,
        operation_mode: string,
        interface_protocol: string,
        analog_digital: string,
        remote_control: string,
        comment: string
    }
}