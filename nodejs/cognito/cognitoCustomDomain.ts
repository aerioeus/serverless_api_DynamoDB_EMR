import { CognitoIdentityServiceProvider, Endpoint } from "aws-sdk";
import uuid from 'uuid';
import request from 'request-promise';
import { DomainCreatorResponceBase } from './model/domainCreatorResponse.interface';

export async function operateCognitoCustomDomain(event: any, region: string, endpoint: string) {
    console.log('OperateCognitoCustomDomain. Received event: ', event);
    let responseObj = createDomainBaseResponse(event.StackId, event.RequestId, event.LogicalResourceId, event.PhysicalResourceId);
    let eventErrors = false;

    if(!event.RequestType){
        console.log("Can not detect request type");
        responseObj = returnDomainCreateError("Can not detect request type", responseObj);
        eventErrors = true;
    }

    if(!eventErrors && (!event.ResourceProperties || !event.ResourceProperties.UserPoolId)) {
        console.log("Can not detect UserPoolId");
        responseObj = returnDomainCreateError("Can not detect UserPoolId", responseObj);
        eventErrors = true;
    }
    const userPoolId = event.ResourceProperties.UserPoolId;

    if(!eventErrors && (!event.ResourceProperties || !event.ResourceProperties.DomainName)){
        console.log("Can not detect DomainName");
        responseObj = returnDomainCreateError("Can not detect DomainName", responseObj);
        eventErrors = true;
    }

    if(!eventErrors) {
        const domain = event.ResourceProperties.DomainName;
        console.log(`Request Type: ${event.RequestType}`);

        switch(event.RequestType){
            case "Create": {
                try {
                    return await createCognitoDomain(userPoolId, domain, event.RequestType, responseObj, event, region, endpoint);
                }
                catch (e) {
                    responseObj = returnDomainCreateError(e, responseObj);
                }
            }
            case "Delete": {
                try {
                    return await deleteCognitoDomain(userPoolId, domain, event.RequestType, responseObj, event, region, endpoint);
                }
                catch (e) {
                    responseObj = returnDomainCreateError(e, responseObj);
                }
            }
            case "Update": {
                console.log(`Update domain operation - do nothing: ${event.RequestType}`);
                responseObj = returnDomainCreateSuccess(responseObj, domain);
                break;
            }
            default: {
                console.log(`Incorrect request type: ${event.RequestType}`);
                responseObj = returnDomainCreateError("Incorrect request type", responseObj);
            }
        }
    }

    //comes here only if has errors or catch handles
    return putDomainResponse(responseObj, event.ResponseURL);
}

async function createCognitoDomain(
    userPoolId: string, 
    domainName: string, 
    requestType:string, 
    responseObj: DomainCreatorResponceBase, 
    event: any,
    region: string,
    endpoint: string) {

    var cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
        region: region,
        endpoint: endpoint
      });

    var params = {
        Domain: domainName,
        UserPoolId: userPoolId 
        // CustomDomainConfig: {
        //   CertificateArn: ''
        // }
      };

    await cognitoidentityserviceprovider.createUserPoolDomain(params).promise()
    .then((data) => {
        return handleCreateDomainSuccess(responseObj, event, data);
    })
    .catch((err) => {
        return handleOperateDomainError(requestType, responseObj, event, err);
    });
}

async function deleteCognitoDomain(
    userPoolId: string, 
    domainName: string, 
    requestType:string, 
    responseObj: DomainCreatorResponceBase, 
    event: any,
    region: string,
    endpoint: string) {

    var cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
        region: region,
        endpoint: endpoint
      });

    var params = {
        Domain: domainName,
        UserPoolId: userPoolId
      };

    await cognitoidentityserviceprovider.deleteUserPoolDomain(params).promise()
    .then((data) => {
        return handleDeleteDomainSuccess(responseObj, event, data);
    })
    .catch((err) => {
        return handleOperateDomainError(requestType, responseObj, event, err);
    });
}

async function putDomainResponse(responseObj: DomainCreatorResponceBase, responseUrl: string) {
    console.log('PutDomainResponse, responseObj=', responseObj, 'responseUrl=', responseUrl);
    const resultJson = JSON.stringify(responseObj);

    const reqOptions = {
        method: 'PUT',
        uri: responseUrl,
        body: resultJson,
        headers: {
            'content-length': resultJson.length,
            'content-type': 'application/json'
        },
    };

    const p = request(reqOptions)
        .then((body)=> {
            console.log("PutDomainResponse successfull. body=", body);
        })
        .catch((err)=>{
            console.error("PutDomainResponse error. error=", err);
        });

    return p;
}

function handleOperateDomainError(requestType:string, responseObj: DomainCreatorResponceBase, event: any, err:any) {
    console.error(`${requestType} custom domain: error`);
    console.error(err, err.stack);
    responseObj = returnDomainCreateError(err, responseObj);
  
    return putDomainResponse(responseObj, event.ResponseURL);
}

function handleDeleteDomainSuccess(responseObj: DomainCreatorResponceBase, event: any, data:any) {
    console.log(`Delete custom domain: successful`);
    console.log(data);
    responseObj = returnDomainCreateSuccess(responseObj);
   
    return putDomainResponse(responseObj, event.ResponseURL);
}

function handleCreateDomainSuccess(responseObj: DomainCreatorResponceBase, event: any, data:any) {
    console.log(`Create custom domain: successful`);
    console.log(data);
    responseObj = returnDomainCreateSuccess(responseObj, data.CloudFrontDomain || '');
   
    return putDomainResponse(responseObj, event.ResponseURL);
}

function createDomainBaseResponse(stackId: string, requestId: string, logicalResourceId: string, physicalResourceId: string): DomainCreatorResponceBase {
    const response = {
        "Status": '',
        "StackId": stackId,
        "RequestId": requestId,
        "LogicalResourceId": logicalResourceId,
        "PhysicalResourceId": physicalResourceId || uuid.v4().toString(),
        "Data": {}
    }

    console.log(`event.PhysicalResourceId=`, physicalResourceId);
    console.log(`response.PhysicalResourceId=`, response.PhysicalResourceId);

    return response;
}

function returnDomainCreateError(e:Error | string, responseObj: DomainCreatorResponceBase): DomainCreatorResponceBase {
    console.error('Lambda function execution internal error');
    console.log(e);

    responseObj.Status = 'FAILED';
    return responseObj;
}

function returnDomainCreateSuccess(responseObj: DomainCreatorResponceBase, domain:string=""): DomainCreatorResponceBase {
    const data = !!domain ? { "CFDomainValue": domain} : {};
    responseObj.Status = 'SUCCESS';
    responseObj.Data = data;

    return responseObj;
}