import { TechnicalComponentBase } from "../base";

export interface ControlUnit extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { control_unit_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */

    control_unit_id: string,

    control_unit_info: {
        operation_mode: string,
        interface_protocol: string,
        analog_digital: string,
        remote_control: string,
        comment: string
    }
}