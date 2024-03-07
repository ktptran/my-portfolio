#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Environment variables
. $SCRIPT_DIR/env.sh
. $SCRIPT_DIR/secret_env.sh

# Destroying CDK
echo "Tearing down CDK application..."
cd $SCRIPT_DIR/../cdk
cdk destroy --all --force

# Deleting CDK Bootstrap
echo "Deleting CDK bootstrap in $AWS_REGION..."
CDK_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name CDKToolkit \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --region $AWS_REGION \
    --output text)
. $SCRIPT_DIR/delete-s3-object-version.sh --bucket $CDK_BUCKET
aws s3 rb s3://$CDK_BUCKET
aws cloudformation delete-stack --stack-name CDKToolkit --region $AWS_REGION

# Delete SSM Parameter
aws ssm delete-parameter --name "$PROJECT_NAME/$ENV/resend-api-key"

# Return to root project directory
echo "Changing back to root project directory"
cd $SCRIPT_DIR/../