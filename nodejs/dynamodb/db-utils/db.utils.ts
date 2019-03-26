import { ItemBase } from "../models/base";
import { DynamoDB } from "aws-sdk";

let counter = 0;

export function addItemToDb <T extends ItemBase> (item:T, tableName: string, docClient: DynamoDB.DocumentClient){

    const currentCounter = counter++;
    
    if(!item) {
        console.log(item);
        return;
    }

    console.log(`Adding item [${currentCounter}] (pk_id=${item.pk_id}, sk=${item.sk})`);

    var params = {
        TableName: tableName,
        Item: item
    };
    
    docClient.put(params, function(err:any, data:any) {
        if (err) {
            console.error(`Unable to add item [${currentCounter}] (pk_id=${item.pk_id}, sk=${item.sk}). Error JSON:`, JSON.stringify(err, null, 2));
        } else {
            console.log(`Added item [${currentCounter}] (pk_id=${item.pk_id}, sk=${item.sk})`, JSON.stringify(data, null, 2));
        }
    });
}