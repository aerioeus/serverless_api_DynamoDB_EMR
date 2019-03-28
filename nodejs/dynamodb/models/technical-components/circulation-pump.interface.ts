import { TechnicalComponentBase } from "../base";

export interface CirculationPump extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { circulation_pump_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */
    circulation_pump_id: string,

    circulation_pump_info: {
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