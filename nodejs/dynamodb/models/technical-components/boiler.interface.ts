import { TechnicalComponentBase } from "../base";

export interface Boiler extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { boiler_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { boiler_efficiency }
    gsi_3_pk:   = { distribution_network_id | component_type }
    gsi_3_sk:   = { fuel_type }
    */

    boiler_id: string, 

    boiler_info: {
        boiler_type: string,
        fuel_category: string,
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