import moment from 'moment';

export function getNewCustomerContractItem(index: any, customer: any){
    const contract_period = oneOf([24, 36, 48, 60]);
    const contract_start_date = getRandomDate(2014, 2);
    const contract_valid_to = moment(contract_start_date).add(contract_period, "months").add(-1, "days").format('MM/DD/YYYY');

    let item = {
            db_item: {
                pk_id: `ENN-000${index}`,
                sk: contract_start_date,
                gsi_1_sk: contract_valid_to,
                product_category_type: oneOf(['Pacht', 'Errichtung','Abkauf']),
                contract_terminated: index % 2 == 0 ? 'no' : 'yes',
                contract_info: {
                    signed_on: getRandomDate(2000, 10),
                    signed_by: `${customer.customer_contact_person_first_name} ${customer.customer_contact_person_last_name}, ${customer.customer_organization_name}, ${customer.customer_billing_address_place}`,
                    contract_period: contract_period,
                    automatic_contract_renewal: contract_period,
                    contract_valid_to: contract_valid_to,
                    possible_termination_date: oneOf(['end of year', 'end of month']),
                    contract_term_comment: `Comment for this super wonderful contract #${index} term`,
                },
                notice: {
                    notice_period: getRandom(12),
                    notice_given_on: getRandomDate(2014, 2),
                    notice_given_to: getRandomDate(2016, 2),
                },
                consumption: {
                    consumption_price: getRandom(100),
                    consumption_price_adjustment: oneOf(['quarterly', 'monthly', 'yearly']),
                    consumption_Unit: 'EUR/MWh',
                },
                capacity: {
                    capacity_price: getRandom(100),
                    capacity_price_Unit: 'EUR/kW',
                    capacity_start_Value: getRandom(500),
                    capacity_price_adjustment: oneOf(['quarterly', 'monthly', 'yearly']),
                },
                customer_contract_comment: `Comment for this super wonderful contract #${index}`,            
            },
            customer_db_item: Object.assign({}, customer)
    };

    item.customer_db_item.pk_id = item.db_item.pk_id;

    return item;
}

export function createCustomers(idSeedStart: number, elemCount: number) {
    const arr = [];
    for(let i = idSeedStart; i < idSeedStart + elemCount; i++){
        arr.push(getNewCustomerItem(i));
    }

    return arr;
}

function getNewCustomerItem(index:any){
    const customer_type = "Company";
    const names = ["John", "Winnie", "Mary", "Lucy", "Brigit", "Chuck"];
    const genders = ["male", "male", "female", "female", "female", "male"];
    const titles = ["Mr.", "Mr.", "Mrs.", "Mrs.", "Mrs.", "Mr."];
    const streets = ["Main street", "Single street", "Straight street", "Dummy street", "Elm street"];
    const functions = ["Supervisor", "Sales manager", "Client manager", "Manager"];
    const marital_statuses = ["single", "married", "divorced"];
    const politicals = ["left wing", "right wing", "not sure"];
    const cities = ["Berlin", "Zurich", "Baden-Baden", "Alzenau", "Frankfurt am Main"];
    const lastNames = ["The Pooh", "Pen", "Robin", "Norris", "Kruger", "Lee", "Lang"];
    const middleNames = ["Samuel", "Clark", "Bently", "Maroon", "Bright", "Roxy"];
    const religions = ["catholic", "muslim", "christian", "protestant", "buddhist", "Hare Krishna", "judaite"];
    const hobbies = ["horse riding", "golf", "bicycles", "motorbykes", "swimming", "sailing", "hobby? work-work-work!"];
    const comments = ["super contact", "ok", "forgets to pay in time", "likes to talk", "mediocre relationship"];

    const name = oneOf(names);
    const gender = genders[names.indexOf(name)];
    const title = titles[names.indexOf(name)];
    const middleName = oneOf(middleNames);
    const lastName = oneOf(lastNames);
    const orgName = `XYZ-${index}`;
    const city = oneOf(cities);

    const hasRepresentative = index % 2 == 0;
    
    let item = {
        sk: customer_type,
        gsi_1_sk: customer_type,
        customer_id:	`C-0001-1002-${index}`,
        //customer_type:	customer_type,
        customer_organization_name:	`${orgName} Ltd.`,
        customer_individual_name: "n/a",
        customer_quality_of_relationship: 1 + getRandom(4),
        customer_organization_homepage:	`www.${orgName.toLowerCase()}.com`,
        customer_delivery_address: {
            customer_delivery_address_street: oneOf(streets),
            customer_delivery_address_street_number: getRandom(256),
            customer_delivery_address_zip_code:	10587,
            customer_delivery_address_place: city,
        },
        customer_billing_address: {
            customer_billing_address_street: oneOf(streets),
            customer_billing_address_street_number:	getRandom(256),
            customer_billing_address_zip_code: `10${index}`,
            customer_billing_address_place:	city
        },
        customer_contact_person: {
            customer_contact_person_salutation:	title,
            customer_contact_person_title:	title,
            customer_contact_person_title_add_on: "Md",	
            customer_contact_person_first_name:	name,
            customer_contact_person_middle_name: middleName,
            customer_contact_person_surname: lastName,
            customer_contact_person_function: oneOf(functions),
            customer_contact_person_email: `${name.toLowerCase()}.${lastName.toLowerCase()}@${orgName.toLowerCase()}.com`,
            customer_contact_person_telefon: "+4930555111222",
            customer_contact_person_mobile: "+49172888111222",
            customer_contact_person_fax: "+49172888111223",
            customer_contact_person_birthday: getRandomDate(1960, 30),
            customer_contact_person_gender:	gender,
            customer_contact_person_marital_status:	oneOf(marital_statuses),
            customer_contact_person_political_orientation:	oneOf(politicals),
            customer_contact_person_religion: oneOf(religions),
            customer_contact_person_hobby: oneOf(hobbies),
        },
        customer_comment: oneOf(comments),
        representative_appointed: hasRepresentative ? "yes" : "no",
        representative: {}
    };

    if (hasRepresentative) {

        const representative_name = oneOf(names);
        const representative_gender = genders[names.indexOf(name)];
        const representative_title = titles[names.indexOf(name)];
        const representative_middleName = oneOf(middleNames);
        const representative_lastName = oneOf(lastNames);
        const representative_orgName = `ABCDE-${index}`;
        const representative_city = oneOf(cities);

        const representative = {
            representative_organization_name: `${representative_orgName} Ltd.`,
            representative_type: "Hausverwaltung",
            representative_street: oneOf(streets), 
            representative_street_number: getRandom(256),
            representative_zip_code: `10${index}`,
            representative_place: representative_city,
            representative_quality_of_relationship: 1 + getRandom(4),
            representative_contact_person_title: representative_title,
            representative_contact_person_title_add_on:	"Md",
            representative_contact_person_first_name:	representative_name,
            representative_contact_person_middle_name:	representative_middleName,
            representative_contact_person_surname: 	representative_lastName,
            representative_contact_person_function:	oneOf(functions),
            representative_contact_person_email:	`${representative_name.toLowerCase()}.${representative_lastName.toLowerCase()}@${representative_orgName.toLowerCase()}.com`,
            representative_contact_person_telefon:	"+4930555111222",
            representative_contact_person_mobile:	"+49172888111222",
            representative_contact_person_fax:	"+49172888111223",
            representative_contact_person_birthday:	getRandomDate(1960, 30),
            representative_contact_person_gender:	representative_gender,
            representative_contact_person_marital_status: oneOf(marital_statuses),
            representative_contact_person_political_orientation: oneOf(politicals),
            representative_contact_person_religion:	oneOf(religions),
            representative_contact_person_hobby: oneOf(hobbies),
            representative_comment:	oneOf(comments)
        };

        item.representative = representative;
    }

    return item;
}

// export function getNewTestItem(index: any){
//     const validFrom = getRandomDate(2000, 10);
//     let item = {
//         ctr_number: `CN-0908-00${index}`,
//         ctr_pdt_cat_type: oneOf(['Pacht', 'Errichtung','Abkauf']),
//         ctr_valid_from: validFrom,
//         ctr_terminated: index % 2 == 0 ? 'no' : 'yes',
//         podn_partner_type: oneOf(['Kundenvertrag','Lieferantenvertrag']),
//         ctr_service: oneOf(['Lieferung Warme','Gas','Strom', 'Kontakt','Organisation']),   
//         ctr_signed_on: getRandomDate(2000, 10),
//         ctr_signed_by: 'John Doe, ABC LLP, Berlin',
//         ctr_notice_period: getRandom(10),
//         ctr_notice_period_unit: oneOf(['Month', 'Year']),
//         ctr_termination_point_in_time: 'end of contract',
//         ctr_notice_given_on: getRandomDate(2014, 2),
//         ctr_notice_given_to: getRandomDate(2016, 2),
//         ctr_term_start: validFrom,
//         ctr_term: getRandom(10),
//         ctr_term_comment: `Comment for this super wonderful contract #${index} term`,
//         ctr_commercial_chargeable_demand: getRandom(2000),
//         ctr_commercial_chargeable_demand_unit: 'kW',
//         ctr_automatic_ctr_extension: getRandom(7),
//         ctr_automatic_ctr_extension_unit: oneOf(['Month', 'Year']),
//         ctr_comment: `Comment for this super wonderful contract #${index}`,
//     };

//     if (index % 2 !== 0){
//         item = Object.assign(item, {ctr_valid_to:  getRandomDate(2014, 4)});
//     }
//     return item;
// }

export function addItemToDb(item:any, tableName: string, docClient:any){
    console.log("Adding a new item...");

    var params = {
        TableName: tableName,
        Item: item
    };
    
    docClient.put(params, function(err:any, data:any) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function getRandom(value: number){
    return Math.round(value * Math.random());
}

export function oneOf(items: any[]){
    const index = getRandom(items.length - 1);
    return items[index];
}

function getRandomDate(yearBase: number, yearIncr: number){
    return `${zeroPad(getRandom(12), 2)}/${zeroPad(getRandom(28), 2)}/${yearBase +  getRandom(yearIncr)}`;
}

function zeroPad(value: number, size: number){
    var s = String(value);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}