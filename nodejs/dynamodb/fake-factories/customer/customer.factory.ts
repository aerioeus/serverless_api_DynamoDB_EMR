import { Customer } from '../../models/customer/customer.interface';
import { oneOf, getCurrentDateTimeLikeAws, getRandom, getRandomDate, getNewGuid, oneOfYesNo } from '../factory.utils';
import { fakeValueArrays } from '../fake-value.arrays';

    /**
     ItemBase overrides

    pk_id       = { customer_name }
    sk          = { customer_id }
    gsi_1_sk    = { customer_id }
    gsi_2_sk:   = { customer_id}
    */

export function getNewCustomerItem(index:any): Customer {
    const name = oneOf(fakeValueArrays.names);
    const gender = fakeValueArrays.genders[fakeValueArrays.names.indexOf(name)];
    const title = fakeValueArrays.titles[fakeValueArrays.names.indexOf(name)];
    const middleName = oneOf(fakeValueArrays.middleNames);
    const lastName = oneOf(fakeValueArrays.lastNames);
    const orgName = `XYZ-${index}`;
    const city = oneOf(fakeValueArrays.cities);
    const customerId = `C-0001-1002-${index}`;
    const customer_name = `${orgName} Ltd.`;

    const hasRepresentative = oneOfYesNo();
    
    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        // will be setup before db insert
        pk_id: customer_name,
        sk: customerId,
        gsi_1_sk: customerId,
        gsi_2_sk: customerId,
        item_type_debug: "customer",
        customer_id:	customerId,
        customer_name:	customer_name,
        customer_individual_name: "n/a",
        customer_quality_of_relationship: 1 + getRandom(4),
        customer_organization_homepage:	`www.${orgName.toLowerCase()}.com`,
        customer_delivery_address: {
            customer_delivery_address_street: oneOf(fakeValueArrays.streets),
            customer_delivery_address_street_number: getRandom(256).toString(),
            customer_delivery_address_zip_code:	"10587",
            customer_delivery_address_place: city,
        },
        customer_billing_address: {
            customer_billing_address_street: oneOf(fakeValueArrays.streets),
            customer_billing_address_street_number:	getRandom(256).toString(),
            customer_billing_address_zip_code: `10${index}`,
            customer_billing_address_place:	city
        },
        customer_contact_person: {
            customer_contact_person_salutation:	title,
            customer_contact_person_title:	title,
            customer_contact_person_title_add_on: "Md",	
            customer_contact_person_first_name:	name,
            customer_contact_person_middle_name: middleName,
            customer_contact_person_last_name: lastName,
            customer_contact_person_function: oneOf(fakeValueArrays.functions),
            customer_contact_person_email: `${name.toLowerCase()}.${lastName.toLowerCase()}@${orgName.toLowerCase()}.com`,
            customer_contact_person_telefon: "+4930555111222",
            customer_contact_person_mobile: "+49172888111222",
            customer_contact_person_fax: "+49172888111223",
            customer_contact_person_birthday: getRandomDate(1960, 30),
            customer_contact_person_gender:	gender,
            customer_contact_person_marital_status:	oneOf(fakeValueArrays.marital_statuses),
            customer_contact_person_political_orientation:	oneOf(fakeValueArrays.politicals),
            customer_contact_person_religion: oneOf(fakeValueArrays.religions),
            customer_contact_person_hobby: oneOf(fakeValueArrays.hobbies),
        },
        customer_comment: oneOf(fakeValueArrays.contact_comments),
        customer_representative_appointed: hasRepresentative ? "yes" : "no"
    };

    if (hasRepresentative) {

        const representative_name = oneOf(fakeValueArrays.names);
        const representative_gender = fakeValueArrays.genders[fakeValueArrays.names.indexOf(name)];
        const representative_title = fakeValueArrays.titles[fakeValueArrays.names.indexOf(name)];
        const representative_middleName = oneOf(fakeValueArrays.middleNames);
        const representative_lastName = oneOf(fakeValueArrays.lastNames);
        const representative_orgName = `ABCDE-${index}`;
        const representative_city = oneOf(fakeValueArrays.cities);

        const representative = {
            representative_organization_name: `${representative_orgName} Ltd.`,
            representative_type: "Hausverwaltung",
            representative_street: oneOf(fakeValueArrays.streets), 
            representative_street_number: getRandom(256).toString(),
            representative_zip_code: `10${index}`,
            representative_place: representative_city,
            representative_quality_of_relationship: 1 + getRandom(4),
            representative_contact_person_title: representative_title,
            representative_contact_person_title_add_on:	"Md",
            representative_contact_person_first_name:	representative_name,
            representative_contact_person_middle_name:	representative_middleName,
            representative_contact_person_surname: 	representative_lastName,
            representative_contact_person_function:	oneOf(fakeValueArrays.functions),
            representative_contact_person_email:	`${representative_name.toLowerCase()}.${representative_lastName.toLowerCase()}@${representative_orgName.toLowerCase()}.com`,
            representative_contact_person_telefon:	"+4930555111222",
            representative_contact_person_mobile:	"+49172888111222",
            representative_contact_person_fax:	"+49172888111223",
            representative_contact_person_birthday:	getRandomDate(1960, 30),
            representative_contact_person_gender:	representative_gender,
            representative_contact_person_marital_status: oneOf(fakeValueArrays.marital_statuses),
            representative_contact_person_political_orientation: oneOf(fakeValueArrays.politicals),
            representative_contact_person_religion:	oneOf(fakeValueArrays.religions),
            representative_contact_person_hobby: oneOf(fakeValueArrays.hobbies),
            representative_comment:	oneOf(fakeValueArrays.contact_comments)
        };

        item = Object.assign(item, {customer_representative: representative});
    }

    return item;
}