import { ItemBase} from "../base";

export interface PodDistributionNetwork extends ItemBase {
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
   
   distribution_network_id: string,
   distribution_network_type: string,
   distribution_network_name: string,
   distribution_network_hydraulic_circuite_type: string,
   distribution_classification: string,
   distribution_assignment: string,
   distribution_network_length: number,
   distribution_network_material: string,
   distribution_network_flow_rate_type: string,
   distribution_network_comment: string
}