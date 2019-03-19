import { CognitoIdentityServiceProvider } from "aws-sdk";

export async function updateUserPool(event: any, region: string, endpoint: string) {
    console.log('UpdateUserPool. Received event: ', event);

    if(!event.ResourceProperties) {
        return false;
    }

    const prop = event.ResourceProperties;
    return updateUserPoolInstance(prop.UserPoolId, prop.AppClientId, prop.CallbackUrls, region, endpoint);
}

export async function createUserPoolUser(event: any, region: string, endpoint: string) {
    console.log('CreateUserPoolUser. Received event: ', event);

    if(!event.ResourceProperties) {
        return false;
    }

    const prop = event.ResourceProperties;
    return createUser(prop.UserPoolId, prop.TestUserEmail, prop.TestUserName, prop.TestUserTempPassword, region, endpoint);
}

async function updateUserPoolInstance(
    userPoolId: string, 
    appClientId: string, 
    callbackURLs: string[],
    region: string,
    endpoint: string) {
        
    const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
        region: region,
        endpoint: endpoint
        });

    const params = {
        UserPoolId: userPoolId,
        ClientId: appClientId,
        AllowedOAuthFlowsUserPoolClient: true,
        AllowedOAuthFlows: ["implicit"],
        AllowedOAuthScopes: ["openid", "phone", "email", "profile", "aws.cognito.signin.user.admin"],
        SupportedIdentityProviders: ["COGNITO"],
        CallbackURLs: callbackURLs
        };
    
    return cognitoidentityserviceprovider.updateUserPoolClient(params).promise()
        .then((data) => {
            console.log("Update UserPoolClient successfull, data=", data);
            return true;
        })
        .catch((err) => {
            console.error("Update UserPoolClient error, err=", err);
            return false;
        });
}

async function createUser(
    userPoolId: string, 
    email: string,
    userName: string,
    pwd: string,   
    region: string,
    endpoint: string) {
        
    const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
        region: region,
        endpoint: endpoint
        });

    const params = {
        UserPoolId: userPoolId,
        Username: email,            //!Important: Username should be an email
        TemporaryPassword: pwd,
        UserAttributes: [    
            {
            "Name": "email",
            "Value": email
            },
            {
                "Name": "name",
                "Value": userName
            }
        ]};

    return cognitoidentityserviceprovider.adminCreateUser(params).promise()
    .then((data) => {
        console.log("Create UserPoolUser successfull, data=", data);
        return true;
    })
    .catch((err) => {
        console.error("Create UserPoolUser error, err=", err);
        return false;
    });
}