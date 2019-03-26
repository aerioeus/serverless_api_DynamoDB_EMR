import { ItemBase, BuildingBase } from "./base";

export interface Building extends ItemBase, BuildingBase {
    /**
     ItemBase overrides

    pk_id       = { building_id }
    sk          = { building_type="Building" }
    gsi_1_sk    = { number_of_apartments }
    gsi_2_sk:   = { building_heating_area_total }
    */
}