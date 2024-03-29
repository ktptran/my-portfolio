#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Read input variables
GITHUB_OWNER=$1
GITHUB_REPO=$2
GITHUB_TOKEN=$3
USERNAME=$4
PASSWORD=$5

# Generating secret_env.sh
SECRET_ENV_EXPORT=$SCRIPT_DIR/secret_env.sh
cp $SCRIPT_DIR/secret_env.sh.template $SECRET_ENV_EXPORT
sed -i -e "s/%GITHUB_USERNAME%/$GITHUB_OWNER/g" $SECRET_ENV_EXPORT
sed -i -e "s/%GITHUB_REPO%/$GITHUB_REPO/g" $SECRET_ENV_EXPORT
sed -i -e "s/%GITHUB_TOKEN%/$GITHUB_TOKEN/g" $SECRET_ENV_EXPORT
sed -i -e "s/%USERNAME%/$USERNAME/g" $SECRET_ENV_EXPORT
sed -i -e "s/%PASSWORD%/$PASSWORD/g" $SECRET_ENV_EXPORT

echo "Generated secret environment script"
cat $SECRET_ENV_EXPORT


