import { ItemBase } from "../models/base";
import { DynamoDB } from "aws-sdk";

//let counter = 0;
const itemsMap = new Map<string, number>();

export function addItemToDb <T extends ItemBase> (item:T, tableName: string, docClient: DynamoDB.DocumentClient){
    if(!item) {
        console.log(item);
        return;
    }

    const currentCounter = (itemsMap.get(item.item_type_debug) || 0) + 1;

    itemsMap.set(item.item_type_debug, currentCounter);

    console.log(`Adding item [${item.item_type_debug}_${currentCounter}] (pk_id=${item.pk_id}, sk=${item.sk})`);

    var params = {
        TableName: tableName,
        Item: item
    };
    
    docClient.put(params, function(err:any, data:any) {
        if (err) {
            console.error(`Unable to add item [${item.item_type_debug}_${currentCounter}] (pk_id=${item.pk_id}, sk=${item.sk}). Error JSON:`, JSON.stringify(err, null, 2));
        } else {
            console.log(`Added item [${item.item_type_debug}_${currentCounter}] (pk_id=${item.pk_id}, sk=${item.sk})`, JSON.stringify(data, null, 2));
        }
    });
}