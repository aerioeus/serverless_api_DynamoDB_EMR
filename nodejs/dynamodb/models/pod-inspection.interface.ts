import { ItemBase, InspectionBase} from "./base";

export interface PodInspection extends ItemBase, InspectionBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { inspection_id }
    gsi_1_sk    = { inspection_company }
    gsi_2_sk:   = { inspection_date }
    */
}