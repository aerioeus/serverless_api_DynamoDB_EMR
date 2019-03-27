export interface PodBase {
    pod_id: string,
    pod_address: {
        pod_address_street: string,
        pod_address_additional_attribute: string,
        pod_address_street_number: string,
        pod_address_zip_code: string,
        pod_place: string
    },
    pod_comment: string
}