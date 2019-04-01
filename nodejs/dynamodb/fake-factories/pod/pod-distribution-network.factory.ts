import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom} from "../factory.utils";
import { Pod, PodDistributionNetwork } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewPodDistributionNetworkItems(start_index: any, pod: Pod, childCount: number): PodDistributionNetwork[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { pod_id }
    gsi_1_sk    = { distribution_network_id }

    gsi_2_pk:   = { distribution_network_id }
    gsi_2_sk:   = { distribution_network_id }
    gsi_3_pk:   = { distribution_network_id }
    gsi_3_sk:   = { distribution_network_id }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const distribution_network_id = `DN_${i}`;
        const hydraulic_circuite_type = oneOf(fakeValueArrays.hydraulic_circuite_types);
        const distribution_network_type = oneOf(fakeValueArrays.distribution_network_types);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: distribution_network_id,
            sk: pod.pod_id,
            gsi_1_sk: distribution_network_id,

            gsi_2_pk: distribution_network_id,
            gsi_2_sk: distribution_network_id,
            gsi_3_pk: distribution_network_id,
            gsi_3_sk: distribution_network_id,

            item_type_debug: "distribution_network",

            distribution_network_id: distribution_network_id,
            distribution_network_type: distribution_network_type,
            distribution_network_name: `Network #${distribution_network_id}`,
            distribution_network_hydraulic_circuite_type: hydraulic_circuite_type,
            distribution_classification: oneOf(fakeValueArrays.distribution_classifications),
            distribution_assignment: oneOf(["intern", "extern"]),
            distribution_network_length: getRandom(500),
            distribution_network_material: oneOf(fakeValueArrays.materials),
            distribution_network_flow_rate_type: oneOf(["konstant", "variabel"]),
            distribution_network_comment: `Comment about distribution network #${distribution_network_id}`
        };

        dbItems.push(dbItem);
    }
    
    return dbItems;
}