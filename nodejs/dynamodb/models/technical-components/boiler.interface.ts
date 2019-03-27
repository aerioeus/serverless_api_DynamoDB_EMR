import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface Boiler extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { boiler_id }
    gsi_1_sk    = { boiler_info.fuel_category }
    gsi_2_sk:   = { boiler_info.efficency }
    */

    boiler_id: string,
    boiler_manufacturer: string,
    boiler_serial_number: string,   

    boiler_info: {
        base_info: TechnicalComponentBase,
        fuel_category: string,
        boiler_type: string,
        boiler_efficency: string,
        interface_protocol: string,
        burner_intern: string,
        max_capacity: string,
        water_volume: string,
        length: string,
        width: string,
        heigth: string,
        radiation_losses: string,
        heat_input: string,
        stand_by_loss: string,
        material: string,
        heat_exchanger: string,
        technical_design: string,
        combustion_efficency: string,
        minimum_volume_flow: string,
        minimum_return_flow_value: string,
        internal_pump: string,
        cascade: string,
        multi_boiler_system: string,
        exhaust_gas_loss: string,
        heat_exchanger_principle: string,
        comment: string
    }
}