import { getCurrentDateTimeLikeAws, oneOf, getRandom, getNewGuid } from "../factory.utils";
import { fakeValueArrays } from '../fake-value.arrays';
import {Pod } from "../../models";

export function getNewPodItem(index:any): Pod {

    const pod_id = `POD-${index}`;
    const street = oneOf(fakeValueArrays.streets);
    const zipcode = `10${index}`;

    const item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: pod_id,
        sk: "Pod",
        gsi_1_sk: street,
        gsi_2_sk: zipcode,
        item_type_debug: "Pod",
        pod_id: pod_id,
        pod_address: {
            pod_address_street: street,
            pod_address_additional_attribute: `.add #${index}`,
            pod_address_street_number: getRandom(256).toString(),
            pod_address_zip_code: zipcode,
            pod_place: oneOf(fakeValueArrays.cities)
        },
        pod_comment: `POD Comment for pod #${pod_id}`
    };

    return item;
}