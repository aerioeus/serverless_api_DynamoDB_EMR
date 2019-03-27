import { TechComponentBase } from "./technical-component-base.interface";

export interface BurnerBase {
    burner_id: string,
    burner_manufacturer: string,
    burner_serial_number: string,
    burner_operation_mode: string,
    burner_capacity: string,
    burner_adjusted_capacity: string,

    burner_info: {
        burner_info_base: TechComponentBase,
        burner_interface_protocol: string,
        burner_oil_jet_size: string,
        burner_oil_jet_pressure: string,
        burner_combustion_type: string,
        burner_combustion_air_supply: string,
        burner_lower_modulation_limit: string,
        burner_comment: string
    }
}