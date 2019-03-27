import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface CirculationPump extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { circulation_pump_id }
    gsi_1_sk    = { circulation_pump_info.control_type }
    gsi_2_sk:   = { circulation_pump_info.user_case_pump}
    */
    circulation_pump_id: string,
    circulation_pump_manufacturer: string,
    circulation_pump_serial_number: string,

    circulation_pump_info: {
        base_info: TechnicalComponentBase,
        interface_protocol: string,
        analog_digital: string,
        use_case_pump: string,
        control_type: string,
        calculated_heigth: string,
        operating_hours_per_year: string,
        pn: string,
        max_height: string,
        max_flow_rate: string,
        fitting_length: string,
        material: string,
        electrical_power_input: string,
        p1_min: string,
        p1_max: string,
        readable: string,
        comment: string,
    }
}