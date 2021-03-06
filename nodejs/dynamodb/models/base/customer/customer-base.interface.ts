export interface CustomerBase {
    customer_id: string,
    customer_name:	string,
    customer_individual_name: string,
    customer_quality_of_relationship:number,
    customer_organization_homepage:	string,
    customer_comment: string,
    customer_representative_appointed: string,
    customer_delivery_address: {
        customer_delivery_address_street: string,
        customer_delivery_address_street_number: string,
        customer_delivery_address_zip_code:	string,
        customer_delivery_address_place: string,
    },
    customer_billing_address: {
        customer_billing_address_street: string,
        customer_billing_address_street_number:	string,
        customer_billing_address_zip_code: string,
        customer_billing_address_place:	string
    },
    customer_contact_person: {
        customer_contact_person_salutation:	string,
        customer_contact_person_title:	string,
        customer_contact_person_title_add_on: string,	
        customer_contact_person_first_name:	string,
        customer_contact_person_middle_name: string,
        customer_contact_person_last_name: string,
        customer_contact_person_function: string,
        customer_contact_person_email: string,
        customer_contact_person_telefon: string,
        customer_contact_person_mobile: string,
        customer_contact_person_fax: string,
        customer_contact_person_birthday: string,
        customer_contact_person_gender:	string,
        customer_contact_person_marital_status:	string,
        customer_contact_person_political_orientation:	string,
        customer_contact_person_religion: string,
        customer_contact_person_hobby: string,
    },
    customer_representative?: {
        representative_organization_name: string,
        representative_type: string,
        representative_street: string, 
        representative_street_number: string,
        representative_zip_code: string,
        representative_place: string,
        representative_quality_of_relationship: number,
        representative_contact_person_title: string,
        representative_contact_person_title_add_on:	string,
        representative_contact_person_first_name:	string,
        representative_contact_person_middle_name:	string,
        representative_contact_person_surname: 	string,
        representative_contact_person_function:	string,
        representative_contact_person_email:	string,
        representative_contact_person_telefon:	string,
        representative_contact_person_mobile:	string,
        representative_contact_person_fax:	string
        representative_contact_person_birthday:	string,
        representative_contact_person_gender:	string,
        representative_contact_person_marital_status: string,
        representative_contact_person_political_orientation: string,
        representative_contact_person_religion:	string,
        representative_contact_person_hobby: string,
        representative_comment:	string
    }
}