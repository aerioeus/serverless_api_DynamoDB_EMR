import { TechComponentBase } from "./technical-component-base.interface";

export interface ControlUnitBase {
    control_unit_id: string,
    control_unit_manufacturer: string,
    control_unit_serial_number: string,
    control_unit_operation_mode: string,
    control_unit_interface_protocol: string,
    control_unit_info: {
        control_unit_info_base: TechComponentBase,
        control_unit_analog_digital: string,
        control_unit_remote_control: string,
        control_unit_comment: string
    }
}