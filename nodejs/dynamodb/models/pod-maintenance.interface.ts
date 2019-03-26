import { ItemBase, MaintenanceBase} from "./base";

export interface PodMaintenance extends ItemBase, MaintenanceBase {
    /**
     ItemBase overrides

    pk_id       = { pod_id }
    sk          = { maintenance_id }
    gsi_1_sk    = { maintenance_company }
    gsi_2_sk:   = { maintenance_date }
    */
}