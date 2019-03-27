import { oneOf, getCurrentDateTimeLikeAws, getRandom, getRandomDate, getNewGuid } from '../factory.utils';
import { fakeValueArrays } from '../fake-value.arrays';
import { Supplier } from '../../models/supplier/supplier.interface';

export function getNewSupplierItem(index:any): Supplier {
    const supplier_type = "Company";

    const name = oneOf(fakeValueArrays.supplier_names);
    const gender = fakeValueArrays.supplier_genders[fakeValueArrays.names.indexOf(name)];
    const title = fakeValueArrays.titles[fakeValueArrays.names.indexOf(name)];
    const middleName = oneOf(fakeValueArrays.middleNames);
    const lastName = oneOf(fakeValueArrays.supplier_lastNames);
    const orgName = `ABC-${index}`;
    const city = oneOf(fakeValueArrays.cities);
    const industry = oneOf(fakeValueArrays.industry_sectors);
    
    const item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        // will be setup before db insert
        pk_id: "",
        sk: supplier_type,
        gsi_1_sk: supplier_type,
        gsi_2_sk: city,
        item_type_debug: "Supplier",
        supplier_id:	`S-9979${index}`,
        supplier_type: supplier_type,
        supplier_industry_sector: industry,
        supplier_name: orgName,
        supplier_homepage: `www.${orgName.toLowerCase()}.supplier.com`,
        supplier_quality_of_relationship: 1 + getRandom(4),
        supplier_address: {
            supplier_address_street: oneOf(fakeValueArrays.streets),
            supplier_address_street_number: getRandom(256).toString(),
            supplier_address_zip_code: `10${index}`,
            supplier_place: city,
        },
        supplier_contact_person: {
            supplier_contact_person_salutation: title,
            supplier_contact_person_title: title,
            supplier_contact_person_title_add_on: "Md",
            supplier_contact_person_first_name: name,
            supplier_contact_person_middle_name: middleName,
            supplier_contact_person_last_name: lastName,
            supplier_contact_person_function: oneOf(fakeValueArrays.functions),
            supplier_contact_person_email: `${name.toLowerCase()}.${lastName.toLowerCase()}@${orgName.toLowerCase()}.com`,
            supplier_contact_person_telefon: "+4930555111222",
            supplier_contact_person_mobile: "+49172888111222",
            supplier_contact_person_fax: "+49172888111223",
            supplier_contact_person_birthday: getRandomDate(1960, 30),
            supplier_contact_person_gender: gender,
            supplier_contact_person_marital_status: oneOf(fakeValueArrays.marital_statuses),
            supplier_contact_person_political_orientation: oneOf(fakeValueArrays.politicals),
            supplier_contact_person_religion: oneOf(fakeValueArrays.religions),
            supplier_contact_person_hobby: oneOf(fakeValueArrays.hobbies),
            supplier_comment: oneOf(fakeValueArrays.supplier_comments)
        }
    };

    return item;
}