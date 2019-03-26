import { ItemBase, DistributionNetworkBase} from "./base";

export interface PodDistributionNetwork extends ItemBase, DistributionNetworkBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { distribution_network_id }
    gsi_1_sk    = { distribution_network_hydraulic_circuite_type }
    gsi_2_sk:   = { distribution_network_type }
    */
}