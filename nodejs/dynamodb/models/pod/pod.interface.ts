import { ItemBase } from "../base";

export interface Pod extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { building_type="Pod" }
    gsi_1_sk    = { pod_street }
    gsi_2_sk:   = { pod_zipcode }
    */
    pod_id: string,
    pod_address: {
        pod_address_street: string,
        pod_address_additional_attribute: string,
        pod_address_street_number: string,
        pod_address_zip_code: string,
        pod_place: string
    },
    pod_comment: string
}