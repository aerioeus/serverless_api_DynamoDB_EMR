import { getRandom, getRandomDate, oneOf, getCurrentDateTimeLikeAws, getNewGuid } from "../factory.utils";
import moment from "moment";
import { fakeValueArrays } from '../fake-value.arrays';
import { ContractBase, ContractSigner } from "../../models/base";

export function getNewContractItem(index: any, signer: ContractSigner, isSupplier: boolean): ContractBase {
    const contract_period = oneOf([24, 36, 48, 60]);
    const contract_start_date = getRandomDate(2014, 2);
    const contract_valid_to = moment(contract_start_date).add(contract_period, "months").add(-1, "days").format('MM/DD/YYYY');
    const contract_partner_type = isSupplier ? "Supplier" : "Customer";
    const customer_contract_id = `ENN-000${index}`;

    let item = {
        customer_contract_id: customer_contract_id,
        contract_start_date: contract_start_date,
        contract_valid_to: contract_valid_to,
        contract_partner_type: contract_partner_type,
        contract_product_category_type: oneOf(fakeValueArrays.product_category_types),
        contract_terminated: index % 2 == 0 ? 'no' : 'yes',
        contract_info: {
            signed_on: getRandomDate(2000, 10),
            signed_by: `${signer.first_name} ${signer.last_name}, ${signer.organization_name}, ${signer.address_place}`,
            contract_period: contract_period,
            automatic_contract_renewal: contract_period,
            contract_valid_to: contract_valid_to,
            possible_termination_date: oneOf(fakeValueArrays.terminationDates),
            contract_term_comment: `Comment for this super wonderful contract #${index} term`,
        },
        contract_notice: {
            notice_period: getRandom(12),
            notice_given_on: getRandomDate(2014, 2),
            notice_given_to: getRandomDate(2016, 2),
        },
        contract_consumption: {
            consumption_price: getRandom(100),
            consumption_price_adjustment: oneOf(fakeValueArrays.adjustments),
            consumption_Unit: 'EUR/MWh',
        },
        contract_capacity: {
            capacity_price: getRandom(100),
            capacity_price_Unit: 'EUR/kW',
            capacity_start_Value: getRandom(500),
            capacity_price_adjustment: oneOf(fakeValueArrays.adjustments),
        },
        contract_comment: `Comment for this super wonderful contract #${index}`            
    };

    return item;
}