import { TechnicalComponentBase } from "./technical-component-base.interface";
import { ItemBase } from "../base";

export interface Fitting extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { fitting_id }
    gsi_1_sk    = { fitting_info.fitting_type }
    gsi_2_sk:   = { fitting_info.type}
    */
    fitting_id: string,
    fitting_manufacturer: string,
    fitting_serial_number: string,

    fitting_info: {
        base_info: TechnicalComponentBase,
        fitting_type: string,
        type: string,
        nominal_diameter_fitting: string,
        leak_rate: string,
        kvs_value: string,
        comment: string,
    }
}