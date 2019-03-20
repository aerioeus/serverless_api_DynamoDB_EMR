import AWS, { DynamoDB } from "aws-sdk";
import { awsConfig } from "../aws-config";
import { addItemToDb, getNewCustomerContractItem, createCustomers, getRandom, oneOf } from "./dynamodb-fill-table/dynamodb-fill-table";

export const dynamoDoc = new DynamoDB.DocumentClient({
    region: awsConfig.region,
    endpoint: awsConfig.dynamoDbEndpoint
});

export const fillDynamoDbTable = function (idSeedStart: number = 100, elemCount: number = 10) {
    fillTable(awsConfig.dynamoDbTableName, idSeedStart, elemCount);
}

const fillTable = function (dynamoDbTableName: string, idSeedStart: number, elemCount: number) {
    const customerIdSeedStart = idSeedStart * getRandom(idSeedStart);
    const customerCount = +(elemCount / 3).toFixed();

    console.log('customerIdSeedStart =', customerIdSeedStart);
    console.log('customerCount =', customerCount);
    const customers = createCustomers(customerIdSeedStart, customerCount);
    
    let i = idSeedStart;
    let stop = i + elemCount;

    const timerId = setInterval(() => {
        const item = getNewCustomerContractItem(i++, oneOf(customers));

        addItemToDb(item.db_item, dynamoDbTableName, dynamoDoc);
        addItemToDb(item.customer_db_item, dynamoDbTableName, dynamoDoc);
        if (i > stop){
            clearInterval(timerId);
        }
      }, 200);
}

