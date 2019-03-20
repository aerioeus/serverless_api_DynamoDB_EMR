import { awsConfig } from "../../aws-config";
import { dynamoDoc } from "../../dynamodb/dynamodb.module";

export function deleteContractFunc(number:string){
    var params = {
        TableName : awsConfig.dynamoDbTableName,
        Key: {
            "ctr_number": number
        }
    };
    
    const p = dynamoDoc.delete(params).promise()
        .then((data) => {
            if(!data){
                throw new Error('Delete item failed');
            }
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            return data;
        });

    return p;
}