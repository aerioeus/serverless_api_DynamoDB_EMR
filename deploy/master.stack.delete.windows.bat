@echo "Retrieve the ID of the new user pool" 

@echo off
set command=call aws cloudformation describe-stacks --stack-name cognito-stack --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" --output text

for /f "usebackq" %%A in (`%command%`) do set "UserPoolId=%%A"
@echo UserPoolId=%UserPoolId%

@echo "Retrieve the name of the s3 bucket" 
@echo off
set command=call aws cloudformation describe-stacks --stack-name s3-stack --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text

for /f "usebackq" %%A in (`%command%`) do set "S3BucketName=%%A"
@echo S3BucketName=%S3BucketName%

@echo "Delete user pool domain"
call aws cognito-idp delete-user-pool-domain --domain file://cognito-stack/cognito.stack.domain.json --user-pool-id %UserPoolId% 

@echo "Delete api-stack"
call aws cloudformation delete-stack --stack-name api-stack 

@echo "Delete api-stack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name api-stack
@echo "Delete api-stack. DONE" 

@echo "Delete cognito-stack"
call aws cloudformation delete-stack --stack-name cognito-stack

@echo "Delete cognito-stack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name cognito-stack
@echo "Delete cognito-stack. DONE" 

@echo "Delete lambda-stack" 
call aws cloudformation delete-stack --stack-name lambda-stack

@echo "Delete lambda-stack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name lambda-stack
@echo "Delete lambda-stack. DONE" 

@echo "Delete dynamodb-stack" 
call aws cloudformation delete-stack --stack-name dynamodb-stack

@echo "Delete dynamodb-stack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name dynamodb-stack
@echo "Delete dynamodb-stack. DONE" 

@echo "Delete iam-masterstack." 
call aws cloudformation delete-stack --stack-name iam-masterstack

@echo "Delete iam-masterstack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name iam-masterstack
@echo "Delete iam-masterstack. DONE" 

@echo "Delete s3-stack." 
call aws cloudformation delete-stack --stack-name s3-stack

@echo "Delete s3-stack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name s3-stack
@echo "Delete s3-stack. DONE" 

@echo "Delete iam-s3-policy-stack" 
call aws cloudformation delete-stack --stack-name iam-s3-policy-stack

@echo "Delete iam-s3-policy-stack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name iam-s3-policy-stack
@echo "Delete iam-s3-policy-stack. DONE" 

@echo "Delete iam-role-policy-stack" 
call aws cloudformation delete-stack --stack-name iam-role-policy-stack
 
@echo "Delete iam-role-policy-stack. WAITING ..." 
call aws cloudformation wait stack-delete-complete --stack-name iam-role-policy-stack
@echo "Delete iam-role-policy-stack. DONE" 

@echo "Delete s3 bucket"
call aws s3 rb s3://%S3BucketName% --force 