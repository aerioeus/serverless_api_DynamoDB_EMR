import { TechComponentBase } from "./technical-component-base.interface";

export interface ExhaustSystemBase {
    exhaust_system_id: string,
    exhaust_system_manufacturer: string,
    exhaust_system_serial_number: string,
    exhaust_system_material: string,
    exhaust_system_info: {
        exhaust_system_info_base: TechComponentBase,
        exhaust_system_dimension: string,
        exhaust_system_air: string,
        exhaust_system_comment: string
    }
}