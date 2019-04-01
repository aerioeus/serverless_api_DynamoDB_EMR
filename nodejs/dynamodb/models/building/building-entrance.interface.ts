import { ItemBase, BuildingEntranceBase } from "../base";

export interface BuildingEntrance extends ItemBase, BuildingEntranceBase {
    /**
     ItemBase overrides

    pk_id       = { building_id }
    sk          = { entrance_id }
    gsi_1_sk    = { entrance_id }
    gsi_2_pk:   = { building_id  }
    gsi_2_sk:   = { entrance_street }
    gsi_3_pk:   = { building_place }
    gsi_3_sk:   = { building_place }
    */
}