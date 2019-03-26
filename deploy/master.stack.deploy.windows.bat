@echo off 

REM before running the below scripts you should setup add cloudformation:CreateStack, cloudformation:UpdateStack, cloudformation:DescribeStacks role manually to your administrator account
REM Add CloudformationCreateStackPolicy and assign CloudformationCreateStackPolicy to your AWS admin user

REM before running the below scripts you should setup add  iam:GetUserPolicy, iam:PutUserPolicy, iam:DeleteUserPolicy role manually to your administrator account
REM Add IAMOperateUserPolicy and assign IAMGetRolePolicy to your AWS admin user

REM can not use master stack approach here because the nested stack templates should be put to S3
REM but the s3 does not exist at the moment 

REM -------------------------------------------------------------------------------------------------------------------------------------------------

@echo "Create iam-role-policy-stack. It grants the IAM Roles permissions to the AWS_Admin_User" 
call aws cloudformation create-stack --stack-name iam-role-policy-stack --template-body file://iam-stack/templates/iam.role-policy.yaml --capabilities CAPABILITY_IAM --output text --parameters file://iam-stack/iam.stack.parameters.json
 
@echo "Create iam-role-policy-stack. WAITING ..." 
call aws cloudformation wait stack-create-complete --stack-name iam-role-policy-stack
@echo "Create iam-role-policy-stack. DONE" 

@echo off 
REM -------------------------------------------------------------------------------------------------------------------------------------------------


@echo "Create iam-s3-policy-stack. It grants the S3 permissions to the AWS_Admin_User" 
call aws cloudformation create-stack --stack-name iam-s3-policy-stack --template-body file://iam-stack/templates/iam.s3-policy.yaml --capabilities CAPABILITY_IAM --output text --parameters file://iam-stack/iam.stack.parameters.json

@echo "Create iam-s3-policy-stack. WAITING ..." 
call aws cloudformation wait stack-create-complete --stack-name iam-s3-policy-stack
@echo "Create iam-s3-policy-stack. DONE" 

@echo off 
REM -------------------------------------------------------------------------------------------------------------------------------------------------

@echo "Create s3-stack. It creates s3 bucket for the scripts and js code" 
call aws cloudformation create-stack --stack-name s3-stack --template-body file://s3-stack/templates/s3.yaml --output text --parameters file://s3-stack/s3.stack.parameters.json

@echo "Create s3-stack. WAITING ..." 
call aws cloudformation wait stack-create-complete --stack-name s3-stack
@echo "Create s3-stack. DONE" 

@echo "Retrieve the s3 bucket name 

@echo off
set command=call aws cloudformation describe-stacks --stack-name s3-stack --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text

for /f "usebackq" %%A in (`%command%`) do set "S3BucketName=%%A"
@echo S3BucketName=%S3BucketName%

@echo off 
REM -------------------------------------------------------------------------------------------------------------------------------------------------

@echo "Deploy all the template scripts to s3 bucket" 
call aws s3 sync . s3://%S3BucketName%/yaml  --exclude "*" --include "*.yaml"
@echo "Deploy all the template scripts to s3 bucket. DONE" 

@echo off 
REM -------------------------------------------------------------------------------------------------------------------------------------------------

REM create iam-masterstack to grant the DynamoDb/Lambda/Cognito/ApiGateway permissions to the AWS_Admin_User 
@echo "Create iam-masterstack. It grants the DynamoDb/Lambda/Cognito/ApiGateway permissions to the AWS_Admin_User " 
call aws cloudformation create-stack --stack-name iam-masterstack --template-body file://iam-stack/templates/iam.masterstack.yaml --capabilities CAPABILITY_IAM --output text --parameters file://iam-stack/iam.stack.parameters.json

@echo "Create iam-masterstack. WAITING ..." 
REM wait until iam-masterstack is created
call aws cloudformation wait stack-create-complete --stack-name iam-masterstack
@echo "Create iam-masterstack. DONE" 

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------

@echo "Go to nodejs folder" 
cd nodejs

@echo "Install npm dependencies" 
call npm i

@echo "Build the .ts files into .js files" 
call tsc

REM @echo "Delete .zip archive if it exists" 
REM del nodejs.zip

REM @echo "Create the zip archive of nodejs folder(requires powershell)" 
REM 7z a -tzip  nodejs.zip .\*

REM @echo off

REM @echo Retreive timestamp

REM for /f "delims=" %%a in ('wmic OS Get localdatetime ^| find "."') do set DateTime=%%a

REM set ZipPathTimeStamp=node/%DateTime:~0,14%

REM @echo PathWithTimeStamp=%ZipPathTimeStamp%

REM @echo "Deploy the node zip to s3 bucket. Use timestamp to mark the latest code archive"
 
REM call aws s3 sync . s3://%S3BucketName%/%ZipPathTimeStamp%  --exclude "*" --include "*.zip"

REM @echo "Delete .zip archive"
REM del nodejs.zip

@echo "Return to the root folder"
cd ..

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------

@echo "Create dynamodb-stack. It creates the DynamoDb table " 
call aws cloudformation create-stack --stack-name dynamodb-stack --template-body file://dynamodb-stack/templates/dynamodb.yaml --output text --parameters file://dynamodb-stack/dynamodb.stack.parameters.json

@echo "Create dynamodb-stack. WAITING ..." 
call aws cloudformation wait stack-create-complete --stack-name dynamodb-stack
@echo "Create dynamodb-stack. DONE" 

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------

@echo "Fill table with fake data"
call node -e 'require(\"./nodejs/dist/dynamodb/dynamodb.module\").fillDynamoDbTable(200, 20)'

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------

REM @echo "Create lambda-stack. It creates the Lambda functions " 
REM call aws cloudformation create-stack --stack-name lambda-stack --template-body file://lambda-stack/templates/lambda.yaml --output text --capabilities CAPABILITY_IAM --parameters ParameterKey=NodeJsZipKey,ParameterValue=%ZipPathTimeStamp%/nodejs.zip

REM @echo "Create lambda-stack. WAITING ..." 
REM call aws cloudformation wait stack-create-complete --stack-name lambda-stack
REM @echo "Create lambda-stack. DONE" 

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------

REM Replace the 'ZipPathTimeStamp' with the value of '%ZipPathTimeStamp%' and write result into the new file
@echo off &setlocal
set "search=ZipPathTimeStamp"
set "replace=%ZipPathTimeStamp%"
set "textfile=cognito-stack/cognito.stack.parameters.json"
set "newfile=cognito-stack/cognito.stack.parameters.tmp.json"
(for /f "delims=" %%i in (%textfile%) do (
    set "line=%%i"
    setlocal enabledelayedexpansion
    set "line=!line:%search%=%replace%!"
    echo(!line!
    endlocal
))>"%newfile%"


@echo "Create cognito-stack. It creates Cognito infrastructure"
call aws cloudformation create-stack --stack-name cognito-stack --template-body file://cognito-stack/templates/cognito.yaml --output text --capabilities CAPABILITY_IAM --parameters file://cognito-stack/cognito.stack.parameters.tmp.json 

@echo "Create cognito-stack. WAITING ..." 
call aws cloudformation wait stack-create-complete --stack-name cognito-stack
@echo "Create cognito-stack. DONE" 

@echo "Retrieve the ID of the new user pool" 

@echo off
set command=call aws cloudformation describe-stacks --stack-name cognito-stack --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" --output text

for /f "usebackq" %%A in (`%command%`) do set "UserPoolId=%%A"
@echo UserPoolId=%UserPoolId%

@echo "Retrieve the ID of the new app client"

@echo off
set command=call aws cloudformation describe-stacks --stack-name cognito-stack --query "Stacks[0].Outputs[?OutputKey=='AppClientId'].OutputValue" --output text

for /f "usebackq" %%A in (`%command%`) do set "AppClientId=%%A"
@echo AppClientId=%AppClientId%

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------
@echo "Create api-stack. It creates ApiGateway infrastructure"
call aws cloudformation create-stack --stack-name api-stack --template-body file://api-stack/templates/api.customer.yaml --output text --capabilities CAPABILITY_IAM  CAPABILITY_AUTO_EXPAND --parameters ParameterKey=S3BucketName,ParameterValue=%S3BucketName%

@echo "Create api-stack. WAITING ..." 
call aws cloudformation wait stack-create-complete --stack-name api-stack
@echo "Create api-stack. DONE" 

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------

@echo "Retrieve the API Access Url" 

@echo off
set command=call aws cloudformation describe-stacks --stack-name api-stack --query "Stacks[0].Outputs[?OutputKey=='RootUrl'].OutputValue" --output text

for /f "usebackq" %%A in (`%command%`) do set "RootUrl=%%A"
@echo ApiRootUrl=%RootUrl%

@echo off
set command=call aws cloudformation describe-stacks --stack-name api-stack --query "Stacks[0].Outputs[?OutputKey=='ApiStageName'].OutputValue" --output text

for /f "usebackq" %%A in (`%command%`) do set "Staging=%%A"
@echo Staging=%Staging%

@echo ApiUrl=%RootUrl%/%Staging%/contract > api-created.result.txt

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------


@echo "Retrieve the Login Url" 

@echo off

for /f %%A in (cognito-stack/cognito.stack.domain.json) do set "Domain=%%A"
@echo domain=%Domain%

for /f delims^=^"^ tokens^=2 %%A in (cognito-stack/cognito.stack.callback-urls.json) do set "CallbackUrl=%%A"
@echo CallbackUrl=%CallbackUrl%

set command=call aws configure get region

for /f usebackq %%A in (`%command%`) do set "Region=%%A"
@echo Region=%Region%

@echo LoginUrl=https://%Domain%.auth.%Region%.amazoncognito.com/login?response_type=token^&client_id=%AppClientId%^&redirect_uri=%CallbackUrl% >> api-created.result.txt

@echo off
REM -------------------------------------------------------------------------------------------------------------------------------------------------


@echo "Retrive APIKEY"

@echo off
set command=call aws cloudformation describe-stacks --stack-name api-stack --query "Stacks[0].Outputs[?OutputKey=='ApiKeyId'].OutputValue" --output text

for /f usebackq %%A in (`%command%`) do set "ApiKeyId=%%A"
@echo ApiKeyId=%ApiKeyId%


set command=call aws apigateway get-api-key --api-key %ApiKeyId% --include-value --query "value"

for /f delims^=^"^ tokens^=1 %%A in ('%command%') do set "ApiKeyValue=%%A"
@echo ApiKeyValue=%ApiKeyValue%

@echo ApiKeyValue=%ApiKeyValue% >> api-created.result.txt