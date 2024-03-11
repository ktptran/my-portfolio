#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Environment variables
. $SCRIPT_DIR/env.sh
. $SCRIPT_DIR/secret_env.sh

# Delete SSM Parameter
AMPLIFY_ID=$(aws cloudformation describe-stacks \
    --region $AWS_REGION \
    --stack-name AmplifyStack \
    --query 'Stacks[0].Outputs[?OutputKey==`AmplifyAppId`].OutputValue' \
    --output text)
aws ssm delete-parameter --name "/amplify/$AMPLIFY_ID/master/RESEND_KEY"
aws ssm delete-parameter --name "/amplify/$AMPLIFY_ID/dev/RESEND_KEY"

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



# Return to root project directory
echo "Changing back to root project directory"
cd $SCRIPT_DIR/../