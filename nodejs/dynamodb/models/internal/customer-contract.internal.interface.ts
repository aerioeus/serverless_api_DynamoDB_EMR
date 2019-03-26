import { CustomerContract } from "../customer-contract.interface";
import { Customer } from "../customer.interface";

export interface CustomerContractInternal {
    db_item: CustomerContract,
    customer_db_item: Customer
}