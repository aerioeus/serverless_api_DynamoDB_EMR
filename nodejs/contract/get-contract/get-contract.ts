import { awsConfig } from "../../aws-config";
import { dynamoDoc } from "../../dynamodb/dynamodb.module";

export function getContractByNumberFunc(number:string){
    var params = {
        TableName : awsConfig.dynamoDbTableName,
        KeyConditionExpression : 'ctr_number = :contract_number',
        ExpressionAttributeValues : {
            ':contract_number' : number
        }
    };
    
    const p = dynamoDoc.query(params).promise()
        .then((data) => {
            if(!data || !data.Items || !data.Items.length){
                throw new Error('Query failed. Unable to retrieve results:');
            }
            console.log("Query succeeded.");
            console.log(data.Items);

            return data.Items;
        });

    return p;
}