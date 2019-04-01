import { ItemBase } from "../base";

export interface PafBuilding extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { building_id }
    gsi_1_sk    = { building_id  }

    gsi_2_pk:   = { building_id }
    gsi_2_sk:   = { building_id }
    gsi_3_pk:   = { building_id }
    gsi_3_sk:   = { building_id }
    */
}