import { ItemBase, BuildingBase } from "../base";

export interface Building extends ItemBase, BuildingBase {
    /**
     ItemBase overrides

    pk_id       = { building_id }
    sk          = { building_place }
    gsi_1_sk    = { building_place  }
    gsi_2_pk:   = { building_place  }
    gsi_2_sk:   = { building_place  }
    gsi_3_pk:   = { building_place  }
    gsi_3_sk:   = { building_place  }
    */
}