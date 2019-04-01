import { PriceAdjustmentFormula, Building, CustomerContract } from "../../models";
import { getNewGuid, getCurrentDateTimeLikeAws } from "..";
import { PafBuilding } from "../../models/n-to-m/paf-building.interface";


export function getCustomerContractBuildingItem (
    customerContractItem: CustomerContract, 
    buildingItem: Building): PafBuilding {

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

    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: customerContractItem.customer_contract_id,
        sk: buildingItem.building_id,
        gsi_1_sk: buildingItem.building_place,

        gsi_2_pk: buildingItem.building_place,
        gsi_2_sk: buildingItem.building_place,
        gsi_3_pk: buildingItem.building_place,
        gsi_3_sk: buildingItem.building_place,


        item_type_debug:"customer_contract_building",
        building_name: buildingItem.building_name,
        building_street:buildingItem.building_street,
        building_street_number: buildingItem.building_street_number,
        building_zip_code: buildingItem.building_zip_code,
        building_place: buildingItem.building_place,
    };

    return item;
}