#!/bin/bash

# Setting environment variables
export ENV="prod"
export PROJECT_NAME="portfolio"
export AWS_REGION="us-east-1"
export AWS_ACCOUNT_ID=`aws sts get-caller-identity --profile kevintptran --query Account --output text`