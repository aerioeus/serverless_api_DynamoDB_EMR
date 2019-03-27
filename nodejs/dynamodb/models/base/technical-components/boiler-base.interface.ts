import { TechComponentBase } from "./technical-component-base.interface";

export interface BoilerBase {
    boiler_id: string,
    boiler_manufacturer: string,
    boiler_fuel_category: string,
    boiler_boiler_type: string,
    boiler_efficency: string,
    boiler_serial_number: string,

    boiler_info: {
        boiler_info_base: TechComponentBase,
        boiler_interface_protocol: string,
        boiler_burner_intern: string,
        boiler_max_capacity: string,
        boiler_water_volume: string,
        boiler_length: string,
        boiler_width: string,
        boiler_heigth: string,
        boiler_radiation_losses: string,
        boiler_heat_input: string,
        boiler_stand_by_loss: string,
        boiler_material: string,
        boiler_heat_exchanger: string,
        boiler_technical_design: string,
        boiler_combustion_efficency: string,
        boiler_minimum_volume_flow: string,
        boiler_minimum_return_flow_value: string,
        boiler_internal_pump: string,
        boiler_cascade: string,
        boiler_multi_system: string,
        boiler_exhaust_gas_loss: string,
        boiler_heat_exchanger_principle: string,
        boiler_comment: string
    }
}