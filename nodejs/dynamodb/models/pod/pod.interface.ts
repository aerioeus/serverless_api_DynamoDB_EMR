import { ItemBase } from "../base";

export interface Pod extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { pod_id }
    gsi_1_sk    = { pod_street }

    gsi_2_pk:   = { pod_id }
    gsi_2_sk:   = { pod_address_zip_code }
    gsi_3_pk:   = { pod_id }
    gsi_3_sk:   = { pod_id }
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