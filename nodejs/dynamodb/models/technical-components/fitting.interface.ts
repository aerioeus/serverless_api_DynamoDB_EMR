import { TechnicalComponentBase } from "../base";

export interface Fitting extends TechnicalComponentBase {
    /**
     ItemBase overrides

    pk_id       = { fitting_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { component_type }
    gsi_2_sk:   = { component_type }
    */
    fitting_id: string,
    
    fitting_info: {
        fitting_type: string,
        type: string,
        nominal_diameter_fitting: string,
        leak_rate: string,
        kvs_value: string,
        comment: string,
    }
}