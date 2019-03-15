import {tableName} from '../shared/shared.module';
import {dynamoDoc} from '../shared/shared.module';

function getRandom(value: number){
    return Math.round(value * Math.random());
}

function getRandomDate(yearBase: number, yearIncr: number){
    return `${getRandom(28)}.${getRandom(12)}.${yearBase +  getRandom(yearIncr)}`;
}

function oneOf(items: string[]){
    const index = getRandom(items.length - 1);
    return items[index];
}

function getNewItem(index: any){
    const validFrom = getRandomDate(2000, 10);
    let item = {
        ctr_number: `CN-0908-00${index}`,
        ctr_pdt_cat_type: oneOf(['Pacht', 'Errichtung','Abkauf']),
        ctr_valid_from: validFrom,
        ctr_terminated: index % 2 == 0 ? 'no' : 'yes',
        podn_partner_type: oneOf(['Kundenvertrag','Lieferantenvertrag']),
        ctr_service: oneOf(['Lieferung Warme','Gas','Strom', 'Kontakt','Organisation']),   
        ctr_signed_on: getRandomDate(2000, 10),
        ctr_signed_by: 'John Doe, ABC LLP, Berlin',
        ctr_notice_period: getRandom(10),
        ctr_notice_period_unit: oneOf(['Month', 'Year']),
        ctr_termination_point_in_time: 'end of contract',
        ctr_notice_given_on: getRandomDate(2014, 2),
        ctr_notice_given_to: getRandomDate(2016, 2),
        ctr_term_start: validFrom,
        ctr_term: getRandom(10),
        ctr_term_comment: `Comment for this super wonderful contract #${index} term`,
        ctr_commercial_chargeable_demand: getRandom(2000),
        ctr_commercial_chargeable_demand_unit: 'kW',
        ctr_automatic_ctr_extension: getRandom(7),
        ctr_automatic_ctr_extension_unit: oneOf(['Month', 'Year']),
        ctr_comment: `Comment for this super wonderful contract #${index}`,
    };

    if (index % 2 !== 0){
        item = Object.assign(item, {ctr_valid_to:  getRandomDate(2014, 4)});
    }
    return item;
}

function addItemToDb(item:any, tableName: string, docClient:any){
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

let i = 100;

var timerId = setInterval(() => {
    addItemToDb(getNewItem(i++), tableName, dynamoDoc);
    if (i > 200){
        clearInterval(timerId);
    }
  }, 1500);
