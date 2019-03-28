import { ItemBase, TechnicalComponentInfoBase } from '..';

export interface TechnicalComponentBase extends ItemBase {
    component_type: string;
    component_manufacturer: string;
    component_serial_number: string;
    component_base_info: TechnicalComponentInfoBase
}