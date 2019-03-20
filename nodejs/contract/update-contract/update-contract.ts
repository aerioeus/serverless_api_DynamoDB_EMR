import { awsConfig } from "../../aws-config";
import { dynamoDoc } from "../../dynamodb/dynamodb.module";

export function updateContractFunc(newItem: any){

    var params = {
        TableName: awsConfig.dynamoDbTableName,
        Key:{
            "ctr_number": newItem.ctr_number
        },
        UpdateExpression: "set ctr_signed_by = :sb, ctr_signed_on=:so, ctr_terminated=:ct, ctr_term_start=:ts, ctr_comment=:cc",
        ExpressionAttributeValues:{
            ":sb":newItem.ctr_signed_by,
            ":so":newItem.ctr_signed_on,
            ":ct":newItem.ctr_terminated,
            ":ts":newItem.ctr_term_start,
            ":cc":`Updated on ${(new Date()).toISOString()}`
        },
        ReturnValues:"UPDATED_NEW"
    };

    const p = dynamoDoc.update(params).promise()
        .then((data) => {
            if(!data){
                throw new Error('Update item failed');
            }
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            return data;
        });

    return p;
}