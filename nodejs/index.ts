import { getContractByNumberFunc } from './contract/get-contract/get-contract';
import { deleteContractFunc } from './contract/remove-contract/remove-contract';
import { updateContractFunc } from './contract/update-contract/update-contract';
import {operateCognitoCustomDomain } from './cognito/cognitoCustomDomain';
import AWS from 'aws-sdk';
import { awsConfig } from './aws-config';
import { updateUserPool, createUserPoolUser } from './cognito/cognitoUserPool';
import { fillDynamoDbTable } from './dynamodb/dynamodb.module';

AWS.config.update({region:awsConfig.region}, true);

AWS.config.apiVersions = {
    cognitoidentityserviceprovider: awsConfig.apiVersion,
    // other service API versions
};

export const getContractByNumber = async (event: any) => {
    console.log('Received event: ', event);
    if(!event.queryStringParameters || !event.queryStringParameters.number){
        throw new Error("Contract number should not be empty"); 
    }

    try {
        const results = await getContractByNumberFunc(event.queryStringParameters.number);

        const response = {
            statusCode: 200,
            body: JSON.stringify(results, null, 2)
          };
    
        return response;
    }
    catch (e)
    {
        returnError(e);
    }
}

export const deleteContract = async (event: any) => {
    console.log('Received event: ', event);
    if(!event.queryStringParameters || !event.queryStringParameters.number){
        throw new Error("Contract number should not be empty"); 
    }

    try {
        const results = await deleteContractFunc(event.queryStringParameters.number);

        const response = {
            statusCode: 200,
            body: JSON.stringify(results, null, 2)
          };
    
        return response;
    }
    catch (e)
    {
        returnError(e);
    }
}

export const updateContract = async (event: any) => {
    console.log('Received event: ', event);
    if(!event.body){
        throw new Error("Contract update info is missing"); 
    }

    try {
        const body = JSON.parse(event.body);

        if(!body.newItem){
            throw new Error("Contract item update info is missing"); 
        }

        const newItem = body.newItem;

        const results = await updateContractFunc(newItem);

        const response = {
            statusCode: 200,
            body: JSON.stringify(results, null, 2)
          };
    
        return response;
    }
    catch (e) {
        returnError(e);
    }
}

export const setupCognitoStack = async (event: any) => {
    await setupCognitoStack(event);
}

function returnError(e:Error) {
    console.error('Lambda function execution internal error');
    console.error(e);

    const responseErr = {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Error" })
      };

    return responseErr;
}

async function operateCustomDomain(event: any) {
    let arr: any[] = [];
    
    //don't wait for any operation separately to save lambda time-costs
    if(event.RequestType === 'Create') {
        arr = [updateUserPool(event, awsConfig.region, awsConfig.cognitoEndpoint), createUserPoolUser(event, awsConfig.region, awsConfig.cognitoEndpoint)];
    }

    const p = operateCognitoCustomDomain(event, awsConfig.region, awsConfig.cognitoEndpoint);

    arr.push(p);

    await Promise.all(arr);
}

fillDynamoDbTable();