import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom} from "../factory.utils";
import { Pod, PodDistributionNetwork } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewPodDistributionNetworkItems(index: any, pod: Pod, childCount: number): PodDistributionNetwork[] {
    const dbItems = [];

    for (let i = index; i < index + childCount; i++){
        const distribution_network_id = `DN_${index}`;
        const hydraulic_circuite_type = oneOf(fakeValueArrays.hydraulic_circuite_types);
        const distribution_network_type = oneOf(fakeValueArrays.distribution_network_types);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: pod.pod_id,
            sk: distribution_network_id,
            gsi_1_sk: hydraulic_circuite_type,
            gsi_2_sk: distribution_network_type,
            item_type_debug: "PodDistributionNetwork",

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