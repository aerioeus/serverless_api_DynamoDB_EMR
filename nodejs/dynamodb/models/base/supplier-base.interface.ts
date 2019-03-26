export interface SupplierBase {
    supplier_id: string,
    supplier_type: string,
    supplier_industry_sector: string,
    supplier_name: string,
    supplier_homepage: string,
    supplier_quality_of_relationship: number,
    supplier_address: {
        supplier_address_street: string,
        supplier_address_street_number: string,
        supplier_address_zip_code: string,
        supplier_place: string,
    },
    supplier_contact_person: {
        supplier_contact_person_salutation: string,
        supplier_contact_person_title: string,
        supplier_contact_person_title_add_on: string,
        supplier_contact_person_first_name: string,
        supplier_contact_person_middle_name: string,
        supplier_contact_person_last_name: string,
        supplier_contact_person_function: string,
        supplier_contact_person_email: string,
        supplier_contact_person_telefon: string,
        supplier_contact_person_mobile: string,
        supplier_contact_person_fax: string,
        supplier_contact_person_birthday: string,
        supplier_contact_person_gender: string,
        supplier_contact_person_marital_status: string,
        supplier_contact_person_political_orientation: string,
        supplier_contact_person_religion: string,
        supplier_contact_person_hobby: string,
        supplier_comment: string
    }
}