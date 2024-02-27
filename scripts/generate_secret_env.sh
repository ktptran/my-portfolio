#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Read input variables
EMAIL=$1 
GITHUB_OWNER=$2 
GITHUB_REPO=$3
GITHUB_TOKEN=$4

# Generating secret_env.sh
SECRET_ENV_EXPORT=$SCRIPT_DIR/secret_env.sh
cp $SCRIPT_DIR/secret_env.sh $SECRET_ENV_EXPORT
sed -i -e "s/%EMAIL%/$EMAIL/g" $SECRET_ENV_EXPORT
sed -i -e "s/%GITHUB_USERNAME%/$GITHUB_OWNER/g" $SECRET_ENV_EXPORT
sed -i -e "s/%GITHUB_REPO%/$GITHUB_REPO/g" $SECRET_ENV_EXPORT
sed -i -e "s/%GITHUB_TOKEN%/$GITHUB_TOKEN/g" $SECRET_ENV_EXPORT


echo "Generated secret environment script"
cat $SECRET_ENV_EXPORT


