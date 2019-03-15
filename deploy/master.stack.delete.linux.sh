echo "Retrieve the ID of the new user pool" 

UserPoolId="$(aws cloudformation describe-stacks --stack-name cognito-stack --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" --output text)"
echo UserPoolId=$UserPoolId

echo "Retrieve the s3 bucket name"

S3BucketName="$(aws cloudformation describe-stacks --stack-name s3-stack --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text)" 
echo S3BucketName=$S3BucketName

echo "Delete user pool domain"
aws cognito-idp delete-user-pool-domain --domain file://cognito-stack/cognito.stack.domain.json --user-pool-id $UserPoolId

echo "Delete api-stack"
aws cloudformation delete-stack --stack-name api-stack --output text

echo "Delete api-stack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name api-stack
echo "Delete api-stack. DONE" 

echo "Delete cognito-stack"
aws cloudformation delete-stack --stack-name cognito-stack

echo "Delete cognito-stack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name cognito-stack
echo "Delete cognito-stack. DONE" 

echo "Delete lambda-stack" 
aws cloudformation delete-stack --stack-name lambda-stack 

echo "Delete lambda-stack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name lambda-stack
echo "Delete lambda-stack. DONE" 

echo "Delete dynamodb-stack" 
aws cloudformation delete-stack --stack-name dynamodb-stack

echo "Delete dynamodb-stack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name dynamodb-stack
echo "Delete dynamodb-stack. DONE" 

echo "Delete iam-masterstack." 
aws cloudformation delete-stack --stack-name iam-masterstack

echo "Delete iam-masterstack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name iam-masterstack
echo "Delete iam-masterstack. DONE" 

echo "Delete s3-stack." 
aws cloudformation delete-stack --stack-name s3-stack

echo "Delete s3-stack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name s3-stack
echo "Delete s3-stack. DONE" 

echo "Delete iam-s3-policy-stack" 
aws cloudformation delete-stack --stack-name iam-s3-policy-stack

echo "Delete iam-s3-policy-stack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name iam-s3-policy-stack
echo "Delete iam-s3-policy-stack. DONE" 

echo "Delete iam-role-policy-stack" 
aws cloudformation delete-stack --stack-name iam-role-policy-stack
 
echo "Delete iam-role-policy-stack. WAITING ..." 
aws cloudformation wait stack-delete-complete --stack-name iam-role-policy-stack
echo "Delete iam-role-policy-stack. DONE" 

echo "Delete s3 bucket"
aws s3 rb s3://$S3BucketName --force 