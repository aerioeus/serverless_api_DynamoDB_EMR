import { PriceAdjustmentFormula } from "../../models";
import { getCurrentDateTimeLikeAws, oneOf, getRandomFloat, getRandom, getNewGuid } from "../factory.utils";
import { fakeValueArrays } from '../fake-value.arrays';

    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { paf_id }
    gsi_1_sk    = { paf_id }

    gsi_2_pk:   = { paf_id }
    gsi_2_sk:   = { paf_id }
    gsi_3_pk:   = { paf_id }
    gsi_3_sk:   = { paf_id }
    */

export function getNewPafItem(index:any): PriceAdjustmentFormula {

    const paf_id = `PAF-${index}`;

    const item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: paf_id,
        sk: paf_id,
        gsi_1_sk: paf_id,

        gsi_2_pk: paf_id,
        gsi_2_sk: paf_id,
        gsi_3_pk: paf_id,
        gsi_3_sk: paf_id,

        paf_id: paf_id,
        item_type_debug: "paf",
        paf_name: `Formula ${index}`,
        paf_text: "AP = APo*(0,2 + 0,8*HEL/HELo)",
        paf_description: "AP: working price energicos",
        paf_comment: "AP-Formel T0002066",
        paf_index_1: {
            name: "HEL",
            description: "fuel oil price",
            index_adjustment: oneOf(fakeValueArrays.adjustments),
            index_base_value: getRandomFloat(100),
            index_unit: "EUR/MWh"
        },
        paf_index_2: {
            name: "capital goods",
            description: "capital goods index",
            index_adjustment: oneOf(fakeValueArrays.adjustments),
            index_base_value: getRandomFloat(200),
            index_unit: "Points"
        },
        paf_index_3: {
            name: "Wages",
            description: "Wages and salaries",
            index_adjustment: oneOf(fakeValueArrays.adjustments),
            index_base_value: getRandomFloat(100),
            index_unit: "EUR per Hour"
        },
        paf_index_4: {
            name: "Fuel",
            description: "Fuel price purchase",
            index_adjustment: oneOf(fakeValueArrays.adjustments),
            index_base_value: getRandomFloat(1),
            index_unit: "cent per Kilowatthour"
        },
        paf_index_5: {
            name: "Electricity",
            description: "Electricity",
            index_adjustment: oneOf(fakeValueArrays.adjustments),
            index_base_value: getRandom(100),
            index_unit: "cent per Kilowatthour"
        }
    };

    return item;
}