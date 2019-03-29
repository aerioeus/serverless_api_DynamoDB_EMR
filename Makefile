# always latest with no arguments
VERSION=latest

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ''
	@echo 'make build # will use $(VERSION) as tag'
	@echo 'make build VERSION=$$(jq -rM '.version' package.json) # will use :latest as tag'

.DEFAULT_GOAL := help
REGION=us-east-1
TEMPLATES_BUCKET=618326157558-dynamodbtest-bucket

create_stack:
	aws cloudformation validate-template \
	--template-body file://./$(file_name)-stack/templates/$(file_name).yaml

	aws cloudformation create-stack \
	--stack-name $(stack_name) \
	--template-body file://./$(file_name)-stack/templates/$(file_name).yaml \
	--parameters file://./$(file_name)-stack/$(file_name).stack.parameters.json \
	--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND

	aws cloudformation wait stack-create-complete --stack-name $(stack_name)

create_masterstack:
	aws s3 sync ./$(file_name)-stack/ s3://$(TEMPLATES_BUCKET)/yaml/$(file_name)-stack/

	aws cloudformation validate-template \
	--template-body file://./$(file_name)-stack/templates/$(file_name).masterstack.yaml

	aws cloudformation create-stack \
	--stack-name $(stack_name) \
	--template-body file://./$(file_name)-stack/templates/$(file_name).masterstack.yaml \
	--parameters file://./$(file_name)-stack/$(file_name).stack.parameters.json \
	--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND

	aws cloudformation wait stack-create-complete --stack-name $(stack_name)

create_s3_stack:
	aws cloudformation create-stack --stack-name iam-role-policy-stack \
	--template-body file://iam-stack/templates/iam.role-policy.yaml \
	--capabilities CAPABILITY_IAM \
	--output text \
	--parameters file://iam-stack/iam.stack.parameters.json

	aws cloudformation wait stack-create-complete --stack-name iam-role-policy-stack

	aws cloudformation create-stack --stack-name iam-s3-policy-stack \
	--template-body file://iam-stack/templates/iam.s3-policy.yaml \
	--capabilities CAPABILITY_IAM \
	--output text \
	--parameters file://iam-stack/iam.stack.parameters.json

	aws cloudformation wait stack-create-complete --stack-name iam-s3-policy-stack

	make create_stack stack_name=s3-stack file_name=s3

create_iam_stack:
	make create_masterstack stack_name=iam-stack file_name=iam

create_dynamodb_stack:
	make create_masterstack stack_name=dynamodb-stack file_name=dynamodb

create_dynamodb_stack:
	make create_stack stack_name=dynamodb-stack file_name=dynamodb

create_populate_tables:
	echo "Fill table with fake data"
	node -e 'require("./nodejs/dist/dynamodb/dynamodb.module").fillDynamoDbTable(200, 20)'

build_lambda_code:
	echo "Build the .ts files into .js files"
	cd ./nodejs && npm i && tsc

create_cognitoidp_stack:
	cd ./nodejs && npm install --production
	cp -R  ./nodejs/node_modules/ ./nodejs/dist/node_modules/

	cd ./nodejs && zip -qr ./nodejs.zip ./dist/
	cp ./nodejs/nodejs.zip .

	echo "Deploy the node zip to s3 bucket. Use timestamp to mark the latest code archive"
	aws s3 cp ./nodejs.zip s3://$(TEMPLATES_BUCKET)/node/nodejs.zip

	make create_stack stack_name=cognito-stack file_name=cognito

create_stacks:
	make create_s3_stack
	make create_iam_stack
	make create_dynamodb_stack
	make create_populate_tables
	make build_lambda_code
	make create_cognitoidp_stack