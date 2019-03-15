## before running the below scripts you should setup add cloudformation:CreateStack, cloudformation:UpdateStack, cloudformation:DescribeStacks role manually to your administrator account
## Add CloudformationCreateStackPolicy and assign CloudformationCreateStackPolicy to your aws admin user#

## before running the below scripts you should setup add  iam:GetUserPolicy, iam:PutUserPolicy, iam:DeleteUserPolicy role manually to your administrator account
## Add IAMOperateUserPolicy and assign IAMGetRolePolicy to your aws admin user#

## can not use master stack approach here because the nested stack templates should be put to S3
## but the s3 does not exist at the moment #

## -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Create iam-role-policy-stack. It grants the IAM Roles permissions to the aws_Admin_User" 
aws cloudformation create-stack --stack-name iam-role-policy-stack --template-body file://iam-stack/templates/iam.role-policy.yaml --capabilities CAPABILITY_IAM --output text --parameters file://iam-stack/iam.stack.parameters.json
 
echo "Create iam-role-policy-stack. WAITING ..." 
aws cloudformation wait stack-create-complete --stack-name iam-role-policy-stack
echo "Create iam-role-policy-stack. DONE" 
 
# -------------------------------------------------------------------------------------------------------------------------------------------------


echo "Create iam-s3-policy-stack. It grants the S3 permissions to the aws_Admin_User" 
aws cloudformation create-stack --stack-name iam-s3-policy-stack --template-body file://iam-stack/templates/iam.s3-policy.yaml --capabilities CAPABILITY_IAM --output text --parameters file://iam-stack/iam.stack.parameters.json

echo "Create iam-s3-policy-stack. WAITING ..." 
aws cloudformation wait stack-create-complete --stack-name iam-s3-policy-stack
echo "Create iam-s3-policy-stack. DONE" 

 
# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Create s3-stack. It creates s3 bucket for the scripts and js code" 
aws cloudformation create-stack --stack-name s3-stack --template-body file://s3-stack/templates/s3.yaml --output text --parameters file://s3-stack/s3.stack.parameters.json

echo "Create s3-stack. WAITING ..." 
aws cloudformation wait stack-create-complete --stack-name s3-stack
echo "Create s3-stack. DONE" 

echo "Retrieve the s3 bucket name"

S3BucketName="$(aws cloudformation describe-stacks --stack-name s3-stack --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text)" 
echo S3BucketName=$S3BucketName

# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Deploy all the template scripts to s3 bucket" 
aws s3 sync . s3://$S3BucketName/yaml  --exclude "*" --include "*.yaml"
echo "Deploy all the template scripts to s3 bucket. DONE" 

 
# -------------------------------------------------------------------------------------------------------------------------------------------------

# create iam-masterstack to grant the DynamoDb/Lambda/Cognito/ApiGateway permissions to the aws_Admin_User 
echo "Create iam-masterstack. It grants the DynamoDb/Lambda/Cognito/ApiGateway permissions to the aws_Admin_User " 
aws cloudformation create-stack --stack-name iam-masterstack --template-body file://iam-stack/templates/iam.masterstack.yaml --capabilities CAPABILITY_IAM --output text --parameters file://iam-stack/iam.stack.parameters.json

echo "Create iam-masterstack. WAITING ..." 
# wait until iam-masterstack is created
aws cloudformation wait stack-create-complete --stack-name iam-masterstack
echo "Create iam-masterstack. DONE" 


# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Go to nodejs folder" 
cd nodejs

echo "Install npm dependencies" 
npm i

echo "Build the .ts files into .js files" 
tsc

echo "Delete .zip archive if it exists" 
rm nodejs.zip

echo "Create the zip archive of nodejs folder(requires programm zip)" 
zip -qr nodejs.zip .

echo Retreive timestamp

ZipPathTimeStamp=node/$(date +%F_%H-%M-%S)

echo PathWithTimeStamp=$ZipPathTimeStamp

echo "Deploy the node zip to s3 bucket. Use timestamp to mark the latest code archive"
 
aws s3 sync . s3://$S3BucketName/$ZipPathTimeStamp  --exclude "*" --include "*.zip"

echo "Delete .zip archive"
rm nodejs.zip

echo "Return to the root folder"
cd ..


# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Create dynamodb-stack. It creates the DynamoDb table " 
aws cloudformation create-stack --stack-name dynamodb-stack --template-body file://dynamodb-stack/templates/dynamodb.yaml --output text --parameters file://dynamodb-stack/dynamodb.stack.parameters.json

echo "Create dynamodb-stack. WAITING ..." 
aws cloudformation wait stack-create-complete --stack-name dynamodb-stack
echo "Create dynamodb-stack. DONE" 


# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Fill table with fake data"
node nodejs/dynamodb-fill-table/dynamodb-fill-table.js


# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Create lambda-stack. It creates the Lambda functions " 
aws cloudformation create-stack --stack-name lambda-stack --template-body file://lambda-stack/templates/lambda.yaml --output text --capabilities CAPABILITY_IAM --parameters ParameterKey=NodeJsZipKey,ParameterValue=$ZipPathTimeStamp/nodejs.zip

echo "Create lambda-stack. WAITING ..." 
aws cloudformation wait stack-create-complete --stack-name lambda-stack
echo "Create lambda-stack. DONE" 


# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Create cognito-stack. It creates Cognito infrastructure"
aws cloudformation create-stack --stack-name cognito-stack --template-body file://cognito-stack/templates/cognito.yaml --output text --parameters file://cognito-stack/cognito.stack.parameters.json

echo "Create cognito-stack. WAITING ..." 
aws cloudformation wait stack-create-complete --stack-name cognito-stack
echo "Create cognito-stack. DONE" 

echo "Retrieve the ID of the new user pool" 

UserPoolId="$(aws cloudformation describe-stacks --stack-name cognito-stack --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" --output text)"
echo UserPoolId=$UserPoolId

echo "Add domain to the user pool since it's not possible through the template"
aws cognito-idp create-user-pool-domain --domain file://cognito-stack/cognito.stack.domain.json --user-pool-id $UserPoolId

echo "Retrieve the ID of the new app client"


AppClientId="$(aws cloudformation describe-stacks --stack-name cognito-stack --query "Stacks[0].Outputs[?OutputKey=='AppClientId'].OutputValue" --output text)"
echo AppClientId=$AppClientId

echo "Set user pool client since it's not possible through the template"
 
# use '["https://www.example.com"]' according to thids issue https://github.com/aws/aws-cli/issues/2894
aws cognito-idp update-user-pool-client --user-pool-id $UserPoolId --client-id $AppClientId --allowed-o-auth-flows-user-pool-client --allowed-o-auth-flows "implicit" --allowed-o-auth-scopes "openid" "phone" "email" "profile" "aws.cognito.signin.user.admin" --supported-identity-providers "COGNITO" --callback-urls file://cognito-stack/cognito.stack.callback-urls.json


echo "Create a user since it's not possible to create a user with the temporary password through the template"
aws cognito-idp admin-create-user --user-pool-id $UserPoolId --username test_user@enc123.com --temporary-password Aa12345@ --user-attributes file://cognito-stack/cognito.stack.cognito-user-attributes.json


echo "Manual user login will be required to change the temporary password"


# -------------------------------------------------------------------------------------------------------------------------------------------------
echo "Create api-stack. It creates ApiGateway infrastructure"
aws cloudformation create-stack --stack-name api-stack --template-body file://api-stack/templates/api.yaml --output text --capabilities CAPABILITY_IAM  CAPABILITY_AUTO_EXPAND --parameters ParameterKey=S3BucketName,ParameterValue=$S3BucketName

echo "Create api-stack. WAITING ..." 
aws cloudformation wait stack-create-complete --stack-name api-stack
echo "Create api-stack. DONE" 


# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Retrieve the API Access Url" 


RootUrl="$(aws cloudformation describe-stacks --stack-name api-stack --query "Stacks[0].Outputs[?OutputKey=='RootUrl'].OutputValue" --output text)"
echo RootUrl=$RootUrl


Staging="$(aws cloudformation describe-stacks --stack-name api-stack --query "Stacks[0].Outputs[?OutputKey=='ApiStageName'].OutputValue" --output text)"
echo Staging=$Staging

echo ApiUrl=$RootUrl/$Staging/contract > api-created.result.txt


# -------------------------------------------------------------------------------------------------------------------------------------------------

echo "Retrieve the Login Url" 

Domain="$(cat cognito-stack/cognito.stack.domain.json)"
echo domain=$Domain

echo "Retrieve the Login Url" 
parsefile="$(cat cognito-stack/cognito.stack.callback-urls.json)"
CallbackUrl="$(expr $parsefile : '..\(.*\)\"]')"
echo CallbackUrl=$CallbackUrl

Region="$(aws configure get region)"

echo Region=$Region

LoginUrl="https://$Domain.auth.$Region.amazoncognito.com/login?response_type=token&client_id=$AppClientId&redirect_uri=$CallbackUrl"
echo LoginUrl=$LoginUrl
echo $LoginUrl >> api-created.result.txt

# -------------------------------------------------------------------------------------------------------------------------------------------------


echo "Retrive APIKEY"

ApiKeyId="$(aws cloudformation describe-stacks --stack-name api-stack --query "Stacks[0].Outputs[?OutputKey=='ApiKeyId'].OutputValue" --output text)"
echo ApiKeyId=$ApiKeyId

parsefile1="$(aws apigateway get-api-key --api-key $ApiKeyId --include-value --query "value")"
ApiKeyValue="$(expr $parsefile1 : '.\(.*\)\"')"
echo ApiKeyValue=$ApiKeyValue

echo ApiKeyValue=$ApiKeyValue >> api-created.result.txt