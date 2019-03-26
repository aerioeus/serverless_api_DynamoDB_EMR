import { Supplier } from "../supplier.interface";
import { SupplierContract } from "../supplier-contract.interface";

export interface SupplierContractInternal {
    db_item: SupplierContract,
    supplier_db_item: Supplier
}