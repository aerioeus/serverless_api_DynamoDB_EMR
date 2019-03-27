import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo, getRandomFloat } from "../factory.utils";
import { PodDistributionNetwork, Fitting } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnFittingItems(index: number, dn: PodDistributionNetwork, childCount: number): Fitting[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { fitting_id }
    gsi_1_sk    = { fitting_info.fitting_type }
    gsi_2_sk:   = { fitting_info.type}
    */

    for (let i = index; i < index + childCount; i++){
        const fitting_id = `Fitting_${index}`;
        const fitting_type  = oneOf(["Schieber", "Absperrhahn", "2-Wege Mischer", "3-Wege Mischer", "4-Wege Mischer", "Rückschlagklappe Drosselklappe Schnellschlussklappe", "Schmutzfänger", "Schwerkraftbremse"]);
        const type = oneOf(["Mischer", "Ventil"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: fitting_id,
            gsi_1_sk: fitting_type ,
            gsi_2_sk: type,
            item_type_debug: "Fitting",

            fitting_id: fitting_id,
            fitting_manufacturer: oneOf(fakeValueArrays.manufacturers),
            fitting_serial_number: `2W${index}JK-2L`,
         
            fitting_info: {
                base_info: {
                    type_designation: "DR50FA",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                fitting_type: fitting_type,
                type: type,
                nominal_diameter_fitting: `DN ${getRandom(60)}`,
                leak_rate: getRandomFloat(1).toString(),
                kvs_value: getRandomFloat(50).toString(),
                comment: "lorem ipsum dolor sit amet",
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}