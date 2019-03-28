export interface ContractBase {
    contract_start_date: string,
    contract_valid_to: string,
    contract_partner_type: string,
    contract_product_category_type: string,
    contract_terminated: string,
    contract_comment: string,
    contract_product: string,
    contract_info: {
        signed_on: string,
        signed_by: string,
        contract_period: number,
        automatic_contract_renewal: number,
        contract_valid_to: string,
        possible_termination_date: string,
        contract_term_comment: string,
    },
    contract_notice: {
        notice_period: number,
        notice_given_on: string,
        notice_given_to: string,
    },
    contract_consumption: {
        consumption_price: number,
        consumption_price_adjustment: string,
        consumption_Unit: string,
    },
    contract_capacity: {
        capacity_price: number,
        capacity_price_Unit: string,
        capacity_start_Value: number,
        capacity_price_adjustment: string,
    }
}