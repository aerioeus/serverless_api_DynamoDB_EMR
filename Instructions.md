# Cloudformation templates for creating API Gateway with DynamoDb, NodeJs Lambdas and Cognito Authentication

## 1. Repo file structure

The repo contains:

- .yaml templates for Aws Cloudformation allowing to deploy the whole solution to Aws
- .json files with the parameters for aws-cli commands
- .ts files with the nodejs code
- .bat file with the deployment script for Windows

The files are organized into the following structure 

```shell
--api-stack
  |__templates
      |__api.yaml #api stack template file

      # PLEASE UPDATE WITH YOUR VALUES BEFORE DEPLOYMENT
  |__api.stack.parameters.json #api stack parameters file - default values                                        

--cognito-stack
  |__templates
      |__cognito.yaml #cognito stack template file

      # PLEASE UPDATE WITH YOUR VALUES BEFORE DEPLOYMENT
  |__cognito.stack.parameters.json #cognito stack parameters file - default values
  |__cognito.stack.domain.json #cognito stack domain name file - default value
  |__cognito.stack.callback-urls.json #this file contains [callback-urls] parameter for cognito stack creation command
  |__cognito.stack.cognito-user-attributes.json #cognito stack parameters file - default values

--dynamodb-stack
  |__templates
      |__dynamodb.yaml #dynamodb stack template file

      # IF YOU WISH TO UPDATE THE DDB Table Name you need to repeat the change in nodejs/shared/shared.module.ts tableName constant
  |__dynamodb.stack.parameters.json #dynamodb stack parameters file - default values

--iam-stack
  |__templates
      |__iam.role-policy.yaml #iam-role-policy stack file
      |__iam.s3-policy.yaml # iam-s3-policy stack file
      |__iam.masterstack.yaml # iam-masterstack stack file
      |__iam.masterstack.templates #iam-masterstack nested stack templates
        |__iam.apigateway-policy.yaml #iam-apigateway-policy nested stack file
        |__iam.cognito-policy.yaml #iam-cognito-policy nested stack file
        |__iam.dynamodb-policy.yaml #iam-dynamodb-policy nested stack file
        |__iam.lambda-policy.yaml #iam-lambda-policy nested stack file

        # PLEASE UPDATE WITH YOUR VALUES BEFORE DEPLOYMENT
  |__aim.stack.parameters.json #iam stack parameters file - default values
  
--lambda-stack
  |__templates
      |__lambda.yaml #lambda stack template file

--s3-stack
  |__templates
      |__s3.yaml #s3 stack template file

      # PLEASE UPDATE WITH YOUR VALUES BEFORE DEPLOYMENT
  |__s3.stack.parameters.json #s3 stack parameters file - default values

--swaggerapis
  |__contract-swagger-apigateway.yaml # swagger template describing the API

--nodejs
  |__contract
      |__get-contract
        |__get-contract.ts #nodejs function that gets the contract item from the dynamodb table
      |__remove-contract
        |__get-contract.ts #nodejs function that removes the contract item from the dynamodb table
      |__update-contract
        |__get-contract.ts #nodejs function that updates the contract item in the dynamodb table
  |__dynamodb-fill-table
      |__dynamodb-fill-table.ts #nodejs function that fills dynamodb table with the fake data
  |__shared
      |__shared.module.ts #exports dynamodbDoc client and dynamodb table name to use across all nodejs functions
  |__index.ts #lambda functions entry-points
  |__package.json #package-.json for nodejs project
  |__package-lock.json #package-lock.json for nodejs project
  |__tsconfig.json #typescript configuration file for nodejs project

--deploy
  |__master.stack.deploy.windows.bat # the deployment script that creates all AWS infrastructure
```
## 2. Installing NodeJs, NPM, Typescript, Python, PP3, AWS CLI

Actions required to be able to deploy the solution:

  #### 2.1 Install python (pip3 package manager is also required and should be installed automatically with the last version of python).
  You can use this link https://www.python.org/downloads/release/python-372/ to find the needed installer for your OS
  #### 2.2 Add python scripts folder to your PATH environment variable (Instruction for Windows https://geek-university.com/python/add-python-to-the-windows-path/)
  #### 2.3 Restart terminal
  #### 2.4 Check if python and pip3 are present by running the following commands:
  ```shell
    python --version
    pip3 --version
  ```
  #### 2.5 Install aws pip3 package by running the command:
  ```shell
    pip3 install awscli --upgrade --user
  ```
  #### 2.6 Add AWS CLI Executable to your PATH environment variable like you did with python (https://docs.aws.amazon.com/en_us/cli/latest/userguide/cli-chap-troubleshooting.html)
  #### 2.7 Restart terminal
  #### 2.8 Check if aws installed by running the following commands:
  ```shell
    aws --version
  ```
  #### 2.9 Run `aws configure` command to enter your aws configuration settings (access key, secret key, region)
  #### 2.10 Check if you have nodejs (v. 8.11+) and npm installed on your PC. Use the following commands to check:
  ```shell
    node -v
    npm -v
  ```
  Install them if needed (https://nodejs.org/en/download/)
  #### 2.11 Check if you have typescript (v. 3.3+) installed globally on your PC. Use the following commands to check:
  ```shell
    tsc -v
  ```
  Install it if needed using the following command
  ```shell
    npm install -g typescript
  ```
  #### 2.12 For Windows users it is required to install 7zip program because Windows has no inline utilities for creating zip archives. 7z command is used inside the Windows deployment script to create am archive with the .js code. 
  You can install it from here https://www.7-zip.org/download.html (it's free). Then you need to add the folder with the 7z.exe to Path environment variable (example here - https://help.goodsync.com/hc/en-us/articles/360007773451-Automated-Backup-with-Compression-and-Encryption ).

  #### 2.13 For Linux/Mac you need the 'zip' program to be installed. zip command is used inside the Windows deployment script to create am archive with the .js code. 

## 3. Deployment

Before you start the deploy you have to:
- create AWS user (in the IAM service) that will be used for running all the commands
- get that user account name (Can be found here - https://yadi.sk/i/zOTx2TBS-2Dh7A)
- give cloudformation:CreateStack, cloudformation:UpdateStack, cloudformation:DescribeStacks permissions to your administrator account via the AWS Console
    (Add CloudformationCreateStackPolicy and assign CloudformationCreateStackPolicy to your AWS admin user)
- give iam:GetUserPolicy, iam:PutUserPolicy, iam:DeleteUserPolicy permissions manually to your administrator account
    (Add IAMOperateUserPolicy and assign IAMGetRolePolicy to your AWS admin user)
- review all XXX.stack.parameters.json files and change the default values to the ones required for the solution (s3 bucketname, user pool name, etc.) - See #3.1

After that:

#### 3.1 Review all XXX.stack.parameters.json files inside the *-stack folders and change the default values to the real values. 
  - /cognito-stack/cognito.stack.parameters.json
  - /iam-stack/iam.stack.parameters.json
  - /s3-stack/s3.stack.parameters.json
#### 3.2 Open your console terminal
#### 3.3 Change current folder to the root folder of this project
#### 3.4 Run the 'deploy/master.stack.deploy.windows.bat' command in your terminal (for Windows) or 'deploy/master.stack.deploy.linux.sh' command in your terminal (for Linux/Mac)
#### 3.5 Check the resulting API access url in the 'api-created.result.txt' file in the root folder of this project


## 4. Test the API
You can test the API using Postman. However, before accessing the API end-points the user need to get the Jwt token from AWS.
To achieve it, the user that was created for the cognito user pool, needs to login into the user pool.

AWS documentation says that we can use the following end-point to send GET-request and receive the auth-token in the url where the user is later redirected: https://docs.aws.amazon.com/en_us/cognito/latest/developerguide/authorization-endpoint.html. 

But for some unknown reason this request doesn't work as expected when we run it from Postman. Instead of authorizing user it redirects user to login page. 

The authorize request works if only the user was logged in and the HTTP client sends the cookies to the https://docs.aws.amazon.com/en_us/cognito/latest/developerguide/authorization-endpoint.html endpoint.

That's why the testing process is the following

#### 4.1 Open the login page link (you can find it in the 'api-created.result.txt file')
#### 4.2 Login with the test user credentials: test_user@enc123.com/123!Aws8
#### 4.3 If you do it at first time you have to change user's password (you can enter the old password as the new one, for the simplicity)
#### 4.4 You will be redirected to the callback url that is stored in the 'cognito-stack/cognito.stack.callback-urls.json' file
#### 4.5 In the address string you can find a long authorization token (in 'id_token' parameter). Copy this value and then paste into the 'Authorization' header value of the testing urls given below
#### 4.6 In the 'api-created.result.txt' file you can find the ApiKey value. Copy this value and then paste into the 'apikey' header value of the testing urls given below
#### 4.7 In the 'api-created.result.txt file' you can find the Api root path. Copy it and paste instead of YOUR API PATH string in the testing urls given below.
#### 4.8 Try to access the API end-points:
  #### 4.8.1 GET : change the API root path and token in the url below
  
  curl -X GET \
  'YOUR API PATH?number=CN-0908-00108' \
  -H 'Accept: application/json' \
  -H 'apikey: JLbKzFK8pP8YTvK6Fm1el9ncn7DLH6S7MzK9HMh6' \
  -H 'Authorization: eyJraWQiOiI2cjZjWlV2STJUcVdvUDdxWkpxT3U2NWtwRWNMSmsyblYwV0dPRDd2WWRzPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoibFhtRDA5M1IyZ0ppM0d6VU1yUGFqQSIsInN1YiI6IjFkOGZiYTgyLTlmZDItNGU1OC1iZDNkLWM1NWQ2YzRlMDU1NyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9QWEtEUmZmMVgiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiIxZDhmYmE4Mi05ZmQyLTRlNTgtYmQzZC1jNTVkNmM0ZTA1NTciLCJhdWQiOiI2ODRoZ3BycGdpbWtqNDhvOXB1cmprcjJwZCIsImV2ZW50X2lkIjoiZmI1NDg5MDctNDQwNC0xMWU5LWIxY2MtODFiN2Q3ZmVkZTgzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1NTIzMTIzODAsIm5hbWUiOiJlbmNfY29nbml0b19hcGlfdXNlciIsInBob25lX251bWJlciI6Iis3MTExMTExMTExMSIsImV4cCI6MTU1MjMxNTk4MCwiaWF0IjoxNTUyMzEyMzgwLCJlbWFpbCI6Imp1bGlhLnYuZ2VyLnRlc3RAZ21haWwuY29tIn0.fZGn7EIl-omGuKECGgx-RI2UZbuUqfOPBsKoDvvKfjT_xFHVEQTZZr68Qj1s0H4nW4siZxpKA0wXH1T9S9UEk3ZA1u_uHaXxaGYeMjv-mdZHXzsbb6QH4CYdTzZRmKURGucz6bhJy3CMcs2UwOmvz7FJ3Vc35I-Tx1UOPypzKI2jVXkEMNIcFVJuL9GD_00L7GEpq2-82g_zLt45EQACpGBk0a_soEb00a2yR1r3kUCxUY2eVAJbjWOlPBjfvXtN_xlNf_sfPTCIbcIuswXAHENvWJCLSQPsybHjltYAgpgpOBAi7b6cs-UD-rWN-Z4e8p5JR-hOkqv15R9aLblU_Q' \

  #### 4.8.2 DELETE : change the API root path and token in the url below
  curl -X DELETE \
    'YOUR API PATH?number=CN-0908-00107' \
    -H 'Authorization: eyJraWQiOiIwRk5UNXNSaDVwT0xaQzdVcTdyTGFNTHdhOThpMWdhaXlWbDZOVzhkNnlzPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoicTdoTDhWaXlIZ0VYQVpLWmY2dTBYUSIsInN1YiI6IjQ2ZDNhODY4LWYwZTctNDk3ZC1iNDlhLTk2OGMwNjRkNWQ4NSIsImF1ZCI6IjVwbW5mdjZhbzNwZDNtNjJjaDA0MDR0Yjk0IiwiZXZlbnRfaWQiOiJiNmNhZDU2ZC00NWM5LTExZTktODVhMC0yZDdhMWM1OWQ4ZWUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU1MjUwNjgyNywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfWXJGSXdSbFM1IiwibmFtZSI6ImVuY19jb2duaXRvX2FwaV91c2VyXzEiLCJjb2duaXRvOnVzZXJuYW1lIjoiNDZkM2E4NjgtZjBlNy00OTdkLWI0OWEtOTY4YzA2NGQ1ZDg1IiwiZXhwIjoxNTUyNTEwNDI3LCJpYXQiOjE1NTI1MDY4MjcsImVtYWlsIjoidGVzdF91c2VyQGVuYzEyMy5jb20ifQ.LuIA3WW9hAiUWv-vCsMxj1RxxfBmggTdmbsAH7IH3jWzxKEo6Apc-3H7TtbY0Wrj3-moK8UZ9x4N3s5SdbSG8Co48Z3vXBShmTMUGWD-N2ztg2gecuiCsmQsE8OoxatCUSbvj8SJaZ4ol_bHth96HmUyhXrboX2Q9t60agPXPihVqMJ1idPeGwR9YsWZdUUqOiYiys5zIe-lU3QiBBk_5poJDVN1_YS2FC10jf8RZGpObPRXE4pc6-eLAct9j02OL3OtEmBMb2XMarJ2AnEG2Wrt7gJvLMdzWc7ImPXyHNC3JFPP1jSNjfbrMCi_vC-1IV82dXNvFN1R8LG3HqiWPQ' \
    -H 'apikey: PmHnCssBDA6aAzNnordqb84MCPm2PKNw3Bt9SOBH'

  #### 4.8.3 PUT : change the API root path and token in the url below
  curl -X PUT \
  YOUR API PATH \
  -H 'Authorization: eyJraWQiOiIwRk5UNXNSaDVwT0xaQzdVcTdyTGFNTHdhOThpMWdhaXlWbDZOVzhkNnlzPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoicTdoTDhWaXlIZ0VYQVpLWmY2dTBYUSIsInN1YiI6IjQ2ZDNhODY4LWYwZTctNDk3ZC1iNDlhLTk2OGMwNjRkNWQ4NSIsImF1ZCI6IjVwbW5mdjZhbzNwZDNtNjJjaDA0MDR0Yjk0IiwiZXZlbnRfaWQiOiJiNmNhZDU2ZC00NWM5LTExZTktODVhMC0yZDdhMWM1OWQ4ZWUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU1MjUwNjgyNywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfWXJGSXdSbFM1IiwibmFtZSI6ImVuY19jb2duaXRvX2FwaV91c2VyXzEiLCJjb2duaXRvOnVzZXJuYW1lIjoiNDZkM2E4NjgtZjBlNy00OTdkLWI0OWEtOTY4YzA2NGQ1ZDg1IiwiZXhwIjoxNTUyNTEwNDI3LCJpYXQiOjE1NTI1MDY4MjcsImVtYWlsIjoidGVzdF91c2VyQGVuYzEyMy5jb20ifQ.LuIA3WW9hAiUWv-vCsMxj1RxxfBmggTdmbsAH7IH3jWzxKEo6Apc-3H7TtbY0Wrj3-moK8UZ9x4N3s5SdbSG8Co48Z3vXBShmTMUGWD-N2ztg2gecuiCsmQsE8OoxatCUSbvj8SJaZ4ol_bHth96HmUyhXrboX2Q9t60agPXPihVqMJ1idPeGwR9YsWZdUUqOiYiys5zIe-lU3QiBBk_5poJDVN1_YS2FC10jf8RZGpObPRXE4pc6-eLAct9j02OL3OtEmBMb2XMarJ2AnEG2Wrt7gJvLMdzWc7ImPXyHNC3JFPP1jSNjfbrMCi_vC-1IV82dXNvFN1R8LG3HqiWPQ' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'apikey: PmHnCssBDA6aAzNnordqb84MCPm2PKNw3Bt9SOBH'

#### 4.9 If needed you can test Cognito authorizer separately from testing the API:
  #### 4.9.1 Get the apitoken as described in #4.5 
  #### 4.9.2 Open ApiGateway service in AWS Console and click on your API 
  #### 4.9.3 Click on the 'Authorizers' link at the left panel and then click on the name of your Authorizer
  #### 4.9.4 Click on the 'Test' link
  #### 4.9.5 Paste your token into the input and click Test

#### 4.10 If needed you can test Lambda functions separately from testing the API. Open Lambda service in AWS Console. Fulfill the actions below for each Lambda:
  #### 4.10.1 Click on your Lambda name
  #### 4.10.2 Click on the dropdown to the left of the 'Test' button. Click 'Configure test events'
  #### 4.10.3 Type the name for the new test event. Add the json object representing the event (examples below)
  #### 4.10.4 Click 'Create'
  #### 4.10.5 Select just created event in the dropdown to the left of 'Test' button. Click 'Test' button to see the result
  #### 4.10.6 If test result is not successful you can view logs in CloudWatch to check the exact issue. 
  The most usual problem case is the invalidity of the .zip archive with the function code. Yuo can try to update the Lambda with the correct .zip from your PC or from S3 to check if the test results change.

  #### 4.10.7 xamples of event json:
    - GetContractByNumber : {  "queryStringParameters": {    "number": "CN-0908-00108"  }}
    - DeleteContract: {  "queryStringParameters": {    "number": "CN-0908-00105"  }}
    - UpdateContract: 
  {
    "body": {
      "newItem": {"ctr_number": "CN-0908-00106","ctr_signed_by": "John1 Doe2, ABC LLP, Paris","ctr_signed_on": "10.12.2010","ctr_term_start": "24.02.2011","ctr_terminated": "yes"}  }
  }

## 5. Clean up

#### 5.1 Open Cognito service in AWS console > Select user pool > Click the "Domain name" link at the left panel > Click "Delete domain button"
#### 5.2 Open Cloudformation service in AWS console > Delete all stacks in the following order:
  - api-stack
  - cognito-stack (check the User pool object checkbox)
  - lambda-stack
  - dynamodb-stack
  - s3-stack
  - iam-masterstack
  - iam-s3-policy-stack
  - iam-role-policy-stack
#### 5.3 Open S3 service in AWS console and delete the S3 bucket created for the s3-stack


### 6. Current limitations
  - The domain for cognito login is created via the cli instead of the template. That's why manual domain deletion is required before we delete the cognito-stack
  - The command parameters are saved in separated files for each stack
  - The name of DynamoDb table to use is hardcoded inside the nodejs/shared.module for now. When you change name in the parameters file you should also change it in the shared module
  - We don't use special domain name for the generated API
  - We don't use Certificate for API domain
  - We don't have custom names for API end-points