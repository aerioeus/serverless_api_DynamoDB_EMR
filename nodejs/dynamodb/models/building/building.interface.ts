import { ItemBase, BuildingBase } from "../base";

export interface Building extends ItemBase, BuildingBase {
    /**
     ItemBase overrides

    pk_id       = { building_id }
    sk          = { building_place }
    gsi_1_sk    = { building_place  }
    gsi_2_sk:   = { building_place  }
    */
}