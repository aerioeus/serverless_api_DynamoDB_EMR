import { config, DynamoDB } from "aws-sdk";
config.update({
    region: "eu-central-1",
    endpoint: "dynamodb.eu-central-1.amazonaws.com"
}, true);

export const dynamoDoc = new DynamoDB.DocumentClient();
export const tableName = "Enc_CRM_TAM";