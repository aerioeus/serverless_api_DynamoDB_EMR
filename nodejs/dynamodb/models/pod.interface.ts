import { ItemBase, PodBase } from "./base";

export interface Pod extends ItemBase, PodBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { building_type="Pod" }
    gsi_1_sk    = { pod_street }
    gsi_2_sk:   = { pod_zipcode }
    */
}