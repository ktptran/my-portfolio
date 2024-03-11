#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Set environment variables
. $SCRIPT_DIR/env.sh
. $SCRIPT_DIR/secret_env.sh

# Check for CDK Toolkit
echo "Checking for CDK Bootstrap in current $AWS_REGION..."
cfn=$(aws cloudformation describe-stacks \
    --query "Stacks[?StackName=='CDKToolkit'].StackName" \
    --region $AWS_REGION \
    --output text)
if [[ -z "$cfn" ]]; then
    cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION
fi

# Deploy CDK
echo "Launching CDK application..."
cd $SCRIPT_DIR/../cdk
cdk synth
cdk deploy --all --require-approval never

# Create SSM Parameter
AMPLIFY_ID=$(aws cloudformation describe-stacks \
    --region $AWS_REGION \
    --stack-name AmplifyStack \
    --query 'Stacks[0].Outputs[?OutputKey==`AmplifyAppId`].OutputValue' \
    --output text)
aws ssm put-parameter \
    --name "/amplify/$AMPLIFY_ID/master/RESEND_KEY" \
    --value "$RESEND_API_KEY" \
    --type String \
    --tags "Key=Project,Value=$PROJECT_NAME"
aws ssm put-parameter \
    --name "/amplify/$AMPLIFY_ID/dev/RESEND_KEY" \
    --value "$RESEND_API_KEY" \
    --type String \
    --tags "Key=Project,Value=$PROJECT_NAME"

# Return to root project directory
echo "Changing back to root project directory"
cd $SCRIPT_DIR/../
echo "Your application is ready at: $DOMAIN_NAME"