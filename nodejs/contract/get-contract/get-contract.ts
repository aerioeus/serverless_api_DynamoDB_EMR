import {tableName} from '../../shared/shared.module';
import {dynamoDoc} from '../../shared/shared.module';

export function getContractByNumberFunc(number:string){
    var params = {
        TableName : tableName,
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