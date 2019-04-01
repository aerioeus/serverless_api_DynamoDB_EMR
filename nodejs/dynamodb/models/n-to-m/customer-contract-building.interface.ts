import { ItemBase } from "../base";

export interface CustomerContractBuilding extends ItemBase {
    /**
     ItemBase overrides

    pk_id       = { customer_contract_id }
    sk          = { building_id }
    gsi_1_sk    = { building_place  }

    gsi_2_pk:   = { building_place  }
    gsi_2_sk:   = { building_place  }
    gsi_3_pk:   = { building_place  }
    gsi_3_sk:   = { building_place  }
    */

    building_name:string;
    building_street:string;
    building_street_number: string,
    building_zip_code: string,
    building_place: string,
}